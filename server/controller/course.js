const cloudinary = require("cloudinary");
const Course = require("../models/course");
const Notification = require("../models/notification");
const User = require("../models/user");
const { default: mongoose } = require("mongoose");
const ejs = require("ejs");
const path = require("path");
const sendMails = require("../config/sendMails");
const axios = require("axios");

const uploadCourse = async (req, res) => {
  const data = req.body;

  if (!data) return res.status(400).json({ message: "All fields are require" });

  const thumbnail = data.thumbnail;

  if (!thumbnail) return res.status(400).json({ message: "Thumbnail require" });

  const name = data.name;

  //Check for duplicate name
  const duplicate = await Course.findOne({ name })
    .collation({ locale: "en", strength: 2 })
    .lean()
    .exec();

  if (duplicate) {
    return res.status(409).json({ message: "Duplicate Course name" });
  }

  const cloud = await cloudinary.v2.uploader.upload(thumbnail, {
    folder: "courses",
  });

  data.thumbnail = {
    public_Id: cloud.public_id,
    url: cloud.secure_url,
  };

  const course = await Course.create(data);

  if (course) {
    res.status(201).json({ message: "Course created successfully", course });
  } else {
    res.status(401).json({ message: "Invalid Credential" });
  }
};

const edithCourse = async (req, res) => {
  const data = req.body;
  if (!data) return res.status(400).json({ message: "All fields are require" });

  const id = req.params.id;
  if (!id)
    return res.status(400).json({ message: "No Course ID are found" });

  const courseData = await Course.findById(id);

  const image = data.thumbnail

  const imageData = image.startsWith("https")
  ? courseData
  : await cloudinary.v2.uploader.upload(image, {
      folder: "layout",
    });

    image = {
      publicId: image.startsWith("https")
      ? image.publicId
      : imageData?.public_id,
      url: image.startsWith("https")
      ? image.url
      : imageData?.secure_url,
    };

  const course = await Course.findByIdAndUpdate(id, {
    $set: data,
    new: true,
  });

  res.status(200).json({
    success: true,
    course,
  });
};

//getSingleCourse without purchasing
const getSingleCourse = async (req, res) => {
  const course = await Course.findById(req.params.id).select(
    "-courseData.videoUrl -courseData.questions -courseData.links -courseData.suggestion"
  );

  if (!course) return res.status(400).json({ message: "No course found" });

  res.status(200).json({
    success: true,
    course,
  });
};

//getAllCourses without purchasing
const getAllCourses = async (req, res) => {
  const course = await Course.find()
    .sort({ createdAt: -1 })
    .select(
      "-courseData.videoUrl -courseData.questions -courseData.links -courseData.suggestion"
    );

  if (!course) return res.status(400).json({ message: "No course found" });

  res.status(200).json({
    success: true,
    course,
  });
};

//getAllCourses without purchasing
const getAdminCourses = async (req, res) => {
  const course = await Course.find().sort({ createdAt: -1 });

  if (!course) return res.status(400).json({ message: "No course found" });

  res.status(200).json({
    success: true,
    course,
  });
};

//getCourse content only for valid users
const getCourseByUser = async (req, res) => {
  const userId = req.user;
  const user = await User.findById(userId).exec();
  if (!user) return res.status(400).json({ message: "No User found, 404" });

  const userCourseList = user?.courses;
  if (!userCourseList)
    return res.status(400).json({ message: "No CourseList found, 404" });

  const id = req.params.id;
  if (!id)
    return res.status(400).json({ message: "Course ID required, 404" });

  const courseExist = userCourseList.some(
    (course) => course._id.toString() === id
  );

  if (!courseExist) {
    // If the course doesn't exist, send a 400 response
    return res.status(400).json({ error: "Course not found, 404" });
  }

  const course = await Course.findById(id);
  if (!course) return res.status(400).json({ message: "No course found, 404" });

  res.status(200).json({
    success: true,
    course,
  });
};

const addQuestion = async (req, res) => {
  const user = await User.findById(req.user).exec();

  const { question, id, contentId } = req.body;
  if (!question || !id || !contentId) {
    return res.status(400).json({ message: "All fields are require" });
  }

  const course = await Course.findById(id);
  if (!course) {
    return res.status(400).json({ message: "No Course found" });
  }

  const isValid = mongoose.Types.ObjectId.isValid(contentId);
  if (!isValid) {
    return res.status(400).json({ error: "Course ID is not valid, 404" });
  }

  const courseContent = course?.courseData?.find((item) =>
    item._id.equals(contentId)
  );
  if (!courseContent) {
    return res.status(400).json({ error: "Course not found, 404" });
  }

  //CREATE NEW QUESTION OBJECT
  const newQuestion = {
    user,
    question,
    questionReplies: [],
  };

  courseContent.questions.push(newQuestion);

  await Notification.create({
    user: user._id,
    title: "New Question",
    message: `You have a new Question in ${courseContent.title}`,
  });

  course.save();

  res.status(200).json({
    success: true,
    course,
  });
};

const addAnswer = async (req, res) => {
  const user = await User.findById(req.user).exec();

  const { answer, id, contentId, questionId } = req.body;
  if (!answer || !id || !contentId || !questionId) {
    return res.status(400).json({ message: "All fields are require" });
  }

  const course = await Course.findById(id);
  if (!course) {
    return res.status(400).json({ message: "No Course found" });
  }

  const isValid = mongoose.Types.ObjectId.isValid(contentId);
  if (!isValid) {
    return res.status(400).json({ error: "Course ID is not valid, 404" });
  }

  const courseContent = course?.courseData?.find((item) =>
    item._id.equals(contentId)
  );
  if (!courseContent) {
    return res.status(400).json({ error: "Course not found, 404" });
  }

  const question = courseContent?.questions?.find((item) =>
    item._id.equals(questionId)
  );
  if (!question) {
    return res.status(400).json({ error: "Question not found, 404" });
  }

  //Create new Answer Object
  const newAnswer = {
    user,
    answer,
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
  };

  question?.questionReplies.push(newAnswer);

  await course.save();

  const username = await User.findById(question.user._id).exec();

  if (user?._id === question.user._id) {
    //create a notification
    await Notification.create({
      user: user._id,
      title: "New Question Replay Received",
      message: `You have a new question replay in ${courseContent.title}`,
    });
  } else {
    const data = {
      name: username.name,
      title: course.courseData.some((item) => item.title),
    };

    const html = await ejs.renderFile(
      path.join(__dirname, "../mails/question-replay.ejs"),
      data
    );

    await sendMails({
      email: username.email,
      subject: "Question Replay",
      template: "question-replay.ejs",
      data,
    });
  }

  res.status(200).json({
    success: true,
    course,
  });
};

//add review to course
const addReview = async (req, res) => {
  const user = await User.findById(req.user).exec();

  const userCourseList = user.courses;
  if (!userCourseList)
    return res.status(400).json({ message: "No Course List found" });

  const id = req.params.id;
  if (!id) return res.status(400).json({ message: "No id found" });

  // check if id exist in userCourseList base on _id
  const courseExist = userCourseList.some(
    (course) => course._id.toString() === id
  );
  if (!courseExist)
    return res
      .status(400)
      .json({ message: "You are not eligible to access this course" });

  const course = await Course.findById(id).exec();

  const { ratings, reviews } = req.body;

  const reviewData = {
    user,
    reviews,
    ratings,
  };

  course?.reviews?.push(reviewData);

  let avg = 0;

  course?.reviews?.forEach((rev) => {
    avg += rev.ratings;
  });  

  if (course && course.reviews) {
    course.ratings = avg / course.reviews.length;
  }
  
  await course.save();  

  //create notification
  await Notification.create({
    user: user._id,
    title: "New Review Received",
    message: `${user.name} has given a review in ${course?.name}`,
  });

  res.status(200).json({
    success: true,
    course,
  });
};

// add replay in review
const addReplayToReview = async (req, res) => {
  const user = await User.findById(req.user).exec();

  const { comment, id, reviewId, } = req.body;
  if (!comment || !id || !reviewId)
    return res.status(400).json({ message: "All fields are required" });

  const course = await Course.findById(id).exec();
  if (!course) return res.status(400).json({ message: "No Course found" });

  const review = course?.reviews?.find((rev) => rev._id.toString() === reviewId);
  if (!review) return res.status(400).json({ message: "No Review found" });

  const replayData = {
    user,
    comment,
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
  };

  if (!review.commentReplies) {
    review.commentReplies = [];
  }

  review.commentReplies.push(replayData);

  await course.save();

  res.status(200).json({
    success: true,
    course,
  });
};

const deleteCourse = async (req, res) => {
  const id = req.params.id;

  // Confirm data
  if (!id) {
    return res.status(400).json({ message: "User ID Required" });
  }

  // Does the Course exist to delete?
  const course = await Course.findById(id).exec();

  if (!course) {
    return res.status(400).json({ message: "course not found" });
  }

  const result = await course.deleteOne();

  const reply = `coursename ${result.name} with ID ${result._id} deleted`;

  res.json(reply);
};

// generate video url
const generateVideoUrl = async (req, res) => {
  const { videoId } = req.body;
  if (!videoId) {
    return res.status(400).json({ message: "Video ID is required" });
  }

  const response = await axios.post(
    `https://dev.vdocipher.com/api/videos/${videoId}/otp`,
    { ttl: 300 },
    {
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
        Authorization: `Apisecret ${process.env.video_api_cipher_secret}`,
      },
    }
  );
  if (!response) {
    return res.status(401).json({ message: "Unauthorized" });
  }

  res.json(response.data);
};

module.exports = {
  uploadCourse,
  edithCourse,
  getSingleCourse,
  getAllCourses,
  getAdminCourses,
  getCourseByUser,
  addQuestion,
  addAnswer,
  addReview,
  addReplayToReview,
  generateVideoUrl,
  deleteCourse,
};
