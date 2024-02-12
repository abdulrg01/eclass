const Order = require("../models/order");
const User = require("../models/user");
const Course = require("../models/course");
const Notification = require("../models/notification");
const sendNotification = require("../config/sendNotification");
const path = require("path");
const ejs = require("ejs");
const stripe = require("stripe")(process.env.STRIPE_SECRET_KEY);

//create an order
const newOrder = async (req, res) => {
  const { courseId, payment_info } = req.body;
  if (!courseId) {
    return res.status(400).json({ message: "CourseId is required" });
  }

  if (payment_info) {
    if ("id" in payment_info) {
      const paymentIntentId = payment_info.id;
      const paymentIntent = await stripe.paymentIntents.retrieve(
        paymentIntentId
      );

      if (!paymentIntent.status === "succeeded") {
        return res.status(400).json({ message: "Payment not authorized" });
      }
    }
  }

  const user = await User.findById(req.user).exec();
  if (!user) return res.status(400).json({ message: "No user found" });

  const courseExist = user.courses.some(
    (course) => course._id.toString() === courseId
  );
  if (courseExist)
    return res
      .status(400)
      .json({ message: "You have already purchase this course, 404" });

  const course = await Course.findById(courseId).exec();
  if (!course) return res.status(400).json({ message: "No course found" });

  const data = {
    courseId: course._id,
    userId: user._id,
    payment_info
  };

  const order = await Order.create(data);

  const mailData = {
    order: {
      _id: course._id.toString().slice(0, 6),
      name: course.name,
      price: course.price,
      date: new Date().toLocaleDateString("en-US", {
        year: "numeric",
        month: "long",
        day: "numeric",
      }),
    },
  };

  const html = await ejs.renderFile(
    path.join(__dirname, "../mails/order-confirmation.ejs"),
    { order: mailData }
  );

  await sendNotification({
    email: user.email,
    subject: "Order Confirmation",
    template: "order-confirmation.ejs",
    data: mailData,
  });

  user.courses.push(course._id);

  await user.save();

  const notification = await Notification.create({
    user: user._id,
    title: "New Order",
    message: `You have a new order from ${course.name}`,
  });

  course.purchase += 1;

  await course.save();

  res.status(201).json({
    success: true,
    order,
  });
};

//___ONLY ADMIN
const all = async (req, res) => {
  // Get all order from MongoDB
  const order = await Order.find().sort({ createdAt: -1 }).lean();

  // If no order
  if (!order) {
    return res.status(400).json({ message: "No order found" });
  }

  res.json(order);
};

// send stripe publishable key
const sendStripePublishableKey = async (req, res) => {
  res.status(200).json({
    publishableKey: process.env.STRIPE_PUBLISHABLE_KEY,
  });
};

const newPayment = async (req, res) => {
  const myPayment = await stripe.paymentIntents.create({
    amount: req.body.amount,
    currency: "USD",
    metadata: {
      company: "ELearning",
    },
    payment_method_types: ["card"],
  });

  res.status(201).json({
    success: true,
    client_secret: myPayment.client_secret,
  });
};

module.exports = {
  newOrder,
  all,
  newPayment,
  sendStripePublishableKey,
};
