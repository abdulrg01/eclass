import { useEffect, useState } from "react";
import CoursePlayer from "../../utils/CoursePlayer";
import {
  AiFillStar,
  AiOutlineArrowLeft,
  AiOutlineArrowRight,
  AiOutlineStar,
} from "react-icons/ai";
import { RxAvatar } from "react-icons/rx";
import toast from "react-hot-toast";
import {
  useAddNewQuestionMutation,
  useAddReplayMutation,
  useAddReviewMutation,
  useGetCourseDetailsQuery,
} from "../../../redux/courses/coursesApi";
import CommentReplay from "../comment/CommentReplay";
import { format } from "timeago.js";
import Ratings from "../../utils/Ratings";
import { VscVerifiedFilled } from "react-icons/vsc";
import socketIO from "socket.io-client";
import Loader from "../Loader";
const ENDPOINT = process.env.PUBLIC_SOCKET_SERVER_URL || "";
const socketId = socketIO(ENDPOINT, { transports: ["websocket"] });

export default function CourseContentMedia({
  data,
  id,
  user,
  loading,
  activeVideo,
  setActiveVideo,
  refetch,
}) {
  const [activeBar, setActiveBar] = useState(0);
  const [question, setQuestion] = useState("");
  const [ratings, setRatings] = useState(1);
  const [reviews, setReviews] = useState("");
  const [isReviewReplay, setIsReviewReplay] = useState(false);
  const [replay, setReplay] = useState("");
  const [reviewId, setReviewId] = useState("");
  const [addNewQuestion, { isSuccess, error, isLoading }] =
    useAddNewQuestionMutation();

  const {
    data: courseData,
    refetch: refetchCourse,
    isLoading: courseDataLoading,
  } = useGetCourseDetailsQuery(id, { refetchOnMountOrArgChange: true });

  const [
    addReplay,
    { isSuccess: replaySuccess, error: replayError, isLoading: replayLoading },
  ] = useAddReplayMutation();

  const [
    addReview,
    {
      isSuccess: isReviewsSuccess,
      isLoading: isReviewsLoading,
      error: isReviewsError,
    },
  ] = useAddReviewMutation();

  const course = courseData?.course;

  const isReviewsExists = data?.course?.reviews?.find(
    (item) => item?.user._id === user?._id
  );

  const handleQuestions = () => {
    if (question?.length === 0) {
      toast.error("Question can't be empty");
    } else {
      addNewQuestion({
        question,
        id,
        contentId: data.course.courseData[activeVideo]?._id,
      });
    }
  };

  const handleReviewsSubmit = () => {
    if (reviews?.length === 0) {
      toast.error("Reviews can't be empty");
    } else {
      addReview({ id, ratings, reviews });
    }
  };

  const handleReplaySubmit = () => {
    if (!replayLoading) {
      if (replay === "") {
        toast.error("Replay can't be empty");
      } else {
        addReplay({ comment: replay, id, reviewId });
      }
    }
  };

  useEffect(() => {
    if (isSuccess) {
      setQuestion("");
      refetch();
      toast.success("Question added successfully");
      socketId.emit("notification", {
        title: "New Question Received",
        message: `You have a new question in ${data?.course?.courseData[activeVideo]?.title}`,
        userId: user?._id,
      });
    }
    if (isReviewsSuccess) {
      setReviews("");
      setRatings(1);
      refetchCourse();
      toast.success("Reviews added successfully");
      socketId.emit("notification", {
        title: "New Question Received",
        message: `You have a new question in ${data?.course?.courseData[activeVideo]?.title}`,
        userId: user?._id,
      });
    }
    if (replaySuccess) {
      setReplay("");
      refetch();
      toast.success("Replay added successfully");
    }
    if (replayError) {
      if (error) {
        const errorMessage = error.data;
        toast.error(errorMessage.data.message);
      }
    }
    if (isReviewsError) {
      if (error) {
        const errorMessage = error.data;
        toast.error(errorMessage.data.message);
      }
    }
    if (error) {
      if (error) {
        const errorMessage = error.data;
        toast.error(errorMessage.data.message);
      }
    }
  }, [
    isSuccess,
    error,
    isReviewsError,
    isReviewsSuccess,
    replayError,
    replaySuccess,
  ]);

  return (
    <>
      {loading && courseDataLoading ? (
        <Loader />
      ) : (
        <div className="w-[95%] md:w-[80%] m-auto">
          <CoursePlayer videoUrl={data?.course?.demoUrl} />
          <div className="w-full flex items-center justify-between my-3">
            <div
              className={`text-white mt-5 rounded-2xl hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800 flex flex-row justify-center items-center py-[unset] px-6 cursor-pointer bg-[#2190ff] min-h-[45px] w-[unset] text-[16px] font-Poppins font-semibold h-[35px] ${
                activeVideo === 0 && "!cursor-no-drop"
              }`}
              onClick={() =>
                setActiveVideo(activeVideo === 0 ? 0 : activeVideo - 1)
              }
            >
              <AiOutlineArrowLeft className="mr-2" />
              Prev Lesion
            </div>
            <div
              className={`text-white mt-5 rounded-2xl hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800 flex flex-row justify-center items-center py-[unset] px-6 cursor-pointer bg-[#2190ff] min-h-[45px] w-[unset] text-[16px] font-Poppins font-semibold h-[35px]`}
              onClick={() =>
                setActiveVideo(
                  data && data?.length - 1 === activeVideo
                    ? activeVideo
                    : activeVideo - 1
                )
              }
            >
              <AiOutlineArrowRight className="mr-2" />
              Next Lesion
            </div>
          </div>
          <h1 className="pt-2 text-[25px] font-[600] text-white">
            {data?.course?.courseData[activeVideo]?.title}
          </h1>
          <br />
          <div className="w-full p-4 flex items-center justify-between bg-slate-500 bg-opacity-20 backdrop-blur shadow-[bg-slate-700] rounded shadow-inner text-white">
            {["Overview", "Resources", "Q&A", "Reviews"].map((text, index) => (
              <h5
                className={`md:text-[20px] cursor-pointer ${
                  activeBar === index && "text-red-500"
                }`}
                key={index}
                onClick={() => setActiveBar(index)}
              >
                {text}
              </h5>
            ))}
          </div>
          {activeBar === 0 && (
            <p className="text-[20px] whitespace-pre-line mb-3 text-white">
              {data?.course?.courseData[activeVideo]?.description}
            </p>
          )}
          {activeBar === 1 && (
            <div>
              {data?.course.courseData[activeVideo]?.links.map(
                (item, index) => (
                  <div className="mb-5" key={index}>
                    <h2 className="md:text-[20px] md:inline-block text-white">
                      {item?.title && item.title + ": "}
                    </h2>
                    <a
                      href={item?.url}
                      className=" inline-block text-[#4395c4] md:text-[20px] md:pl-2"
                    >
                      {item?.url}
                    </a>
                  </div>
                )
              )}
            </div>
          )}
          {activeBar === 2 && (
            <>
              <div className="flex w-full mt-5">
                <img
                  src={user?.avatar ? user.avatar.url : <RxAvatar />}
                  alt="avatar"
                  className=" rounded-full w-[40px] h-[40px]"
                />
                <textarea
                  id=""
                  rows="4"
                  className="block p-2.5 w-full text-sm text-gray-900 bg-transparent rounded-lg border border-gray-300 focus:ring-blue-500 focus:border-blue-500 dark:border-gray-600 dark:bg-transparent dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 ml-3"
                  value={question}
                  onChange={(e) => setQuestion(e.target.value)}
                  placeholder="Write your thoughts here..."
                ></textarea>
              </div>
              <div className="w-full flex justify-end">
                <div
                  className={`text-white rounded-2xl hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800 flex flex-row justify-center items-center py-3 px-6 cursor-pointer bg-[#2190ff] min-h-[45px] w-[120px] text-[16px] font-Poppins font-semibold h-[40px] mt-5 ${
                    isLoading && "cursor-not-allowed"
                  }`}
                  onClick={isLoading ? () => {} : handleQuestions}
                >
                  Submit
                </div>
              </div>
              <br />
              <div className=" w-full h-[1px] bg-[#ffffff3b]"></div>
              <div>
                <CommentReplay
                  user={user}
                  data={data}
                  activeVideo={activeVideo}
                  id={id}
                  refetch={refetch}
                />
              </div>
            </>
          )}

          {activeBar === 3 && (
            <div className="w-full mt-5">
              <>
                {!isReviewsExists && (
                  <>
                    <div className="flex w-full">
                      <img
                        src={user?.avatar ? user.avatar.url : <RxAvatar />}
                        alt="avatar"
                        className=" rounded-full w-[40px] h-[40px]"
                      />
                      <div className="w-full">
                        <h5 className="pl-3 text-[15px] font-[500] dark:text-white text-black">
                          Give a Ratings <span className="text-red-500">*</span>
                        </h5>
                        <div className="w-full flex ml-2 pb-3">
                          {[1, 2, 3, 4, 5].map((i) =>
                            ratings >= i ? (
                              <AiFillStar
                                key={i}
                                className="mr-1 cursor-pointer"
                                color="rgb(246, 186, 0)"
                                size={20}
                                onClick={() => setRatings(i)}
                              />
                            ) : (
                              <AiOutlineStar
                                key={i}
                                className="mr-1 cursor-pointer"
                                color="rgb(246, 186, 0)"
                                size={20}
                                onClick={() => setRatings(i)}
                              />
                            )
                          )}
                        </div>
                        <textarea
                          id=""
                          rows="4"
                          className="block p-2.5 w-full text-sm text-gray-900 bg-transparent rounded-lg border border-gray-300 focus:ring-blue-500 focus:border-blue-500 dark:border-gray-600 dark:bg-transparent dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 ml-3"
                          value={reviews}
                          onChange={(e) => setReviews(e.target.value)}
                          placeholder="Write your comment..."
                        ></textarea>
                      </div>
                    </div>
                    <div className="w-full flex justify-end">
                      <div
                        className={`w-[120px] text-white rounded-2xl hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800 flex flex-row justify-center items-center py-3 px-6 cursor-pointer bg-[#2190ff] min-h-[45px] md:mr-2 mr-2 text-[16px] font-Poppins font-semibold h-[40px] mt-5 ${
                          isReviewsLoading && "cursor-no-drop"
                        }`}
                        onClick={
                          isReviewsLoading ? () => {} : handleReviewsSubmit
                        }
                      >
                        Submit
                      </div>
                    </div>
                  </>
                )}
                <br />
                <div className=" w-full h-[1px] bg-[#ffffff3b]"></div>
                <div className="w-full">
                  {(course?.reviews && [...course?.reviews].reverse()).map(
                    (item, index) => (
                      <div
                        className="w-full my-5 text-white dark:text-black"
                        key={index}
                      >
                        <div className="flex w-full">
                          <div>
                            <img
                              src={
                                item?.user.avatar ? (
                                  item?.user.avatar.url
                                ) : (
                                  <RxAvatar />
                                )
                              }
                              alt="avatar"
                              className=" rounded-full w-[40px] h-[40px]"
                            />
                          </div>
                          <div className="ml-2">
                            <h5 className="text-[16px] text-white">
                              {item?.user.name}
                            </h5>
                            <Ratings rating={item?.ratings} />
                            <p className="text-white">{item?.reviews}</p>
                            <small className="text-[#ffffff83]">
                              {format(item.createdAt)}
                            </small>
                          </div>
                        </div>

                        {user?.role === "Admin" &&
                          item?.commentReplies.length === 0 && (
                            <span
                              className="bg-transparent block text-sm font-medium text-gray-900 dark:text-white ml-12 cursor-pointer"
                              onClick={() => {
                                setIsReviewReplay((prev) => !prev);
                                setReviewId(item._id);
                              }}
                            >
                              Add Reply
                            </span>
                          )}

                        {isReviewReplay && reviewId === item._id && (
                          <>
                            <div className="w-full flex relative dark:text-white text-black my-5">
                              <input
                                type="text"
                                placeholder="Enter your replay..."
                                value={replay}
                                onChange={(e) => setReplay(e.target.value)}
                                className={`bg-transparent border-b border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500`}
                              />
                              <button
                                type="submit"
                                className="absolute right-0 bottom-1 p-2 text-sm tracking-tighter font-semibold rounded-lg bg-[#2190ff] hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
                                onClick={handleReplaySubmit}
                              >
                                Submit
                              </button>
                            </div>
                          </>
                        )}

                        {item.commentReplies.map((item, index) => (
                          <div
                            className="w-full flex md:ml-14 my-5 dark:text-[#ffffff83] text-[#dc9c9cb8]"
                            key={index}
                          >
                            <div>
                              <img
                                src={
                                  item?.user.avatar ? (
                                    item?.user.avatar.url
                                  ) : (
                                    <RxAvatar />
                                  )
                                }
                                alt="avatar"
                                className=" rounded-full w-[40px] h-[40px]"
                              />
                            </div>
                            <div className="pl-3">
                              <div className="flex items-center">
                                <h5 className="text-[20px] text-white">
                                  {item?.user.name}
                                </h5>{" "}
                                {item.user.role === "Admin" && (
                                  <VscVerifiedFilled className="text-[green] ml-2 text-[20px]" />
                                )}
                              </div>
                              <p className="text-white">{item?.comment}</p>
                              <small className="text-[#ffffff83]">
                                {item.createdAt ? format(item.createdAt) : ""}
                              </small>
                            </div>
                          </div>
                        ))}
                      </div>
                    )
                  )}
                </div>
              </>
            </div>
          )}
        </div>
      )}
    </>
  );
}
