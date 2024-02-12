import { useEffect, useState } from "react";
import { BiMessage } from "react-icons/bi";
import { format } from "timeago.js";
import { useAddAnswerMutation } from "../../../redux/courses/coursesApi";
import toast from "react-hot-toast";
import { VscVerifiedFilled } from "react-icons/vsc";
import { RxAvatar } from "react-icons/rx";

export default function CommentItem({
  data,
  user,
  item,
  id,
  activeVideo,
  refetch,
}) {
  const [addAnswer, { isSuccess, error }] = useAddAnswerMutation();
  const [replayActive, setReplayActive] = useState(false);
  const [answer, setAnswer] = useState("");
  const [questionId, setQuestionId] = useState("");

  const handleAnswerSubmit = () => {
    addAnswer({
      answer,
      id,
      contentId: data.course.courseData[activeVideo]._id,
      questionId: questionId,
    });
  };

  useEffect(() => {
    if (isSuccess) {
      setAnswer("");
      refetch();
      toast.success("Answer added successfully");
      if (user.role !== "Admin") {
        socketId.emit("notification", {
          title: "New Replay Received",
          message: `You have a new question replay in ${data.course.courseData[activeVideo].title}`,
          userId: item?.user._id,
        });
      }
    }
    if (error) {
      if (error) {
        const errorMessage = error.data;
        toast.error(errorMessage.data.message);
      }
    }
  }, [isSuccess, error]);

  return (
    <>
      <div className="my-4">
        <div className="flex mb-2 items-center">
          <img
            src={item?.user?.avatar ? item?.user?.avatar?.url : <RxAvatar />}
            alt="avatar"
            className=" w-8 h-8 rounded-full"
          />
          <div className="pl-3">
            <h5 className="text-[16px] text-white">{item?.user?.name}</h5>
            <p className="text-white">{item?.question}</p>
            <small className="text-[#ffffff83]">
              {item?.createdAt ? format(item?.createdAt) : ""}
            </small>
          </div>
        </div>

        <div className="w-full flex">
          <span
            className="md:pl-14 dark:text-[#ffffff83] text-[#000000b8] cursor-pointer mr-2"
            onClick={() => {
              setReplayActive(!replayActive);
              setQuestionId(item?._id);
            }}
          >
            {!replayActive
              ? item?.questionReplies?.length !== 0
                ? "All Replies"
                : "Add Replay"
              : "Hide Replies"}
          </span>
          <BiMessage
            size={20}
            className=" cursor-pointer dark:text-[#ffffff83] text-[#000000b8]"
          />
          <span className="pl-1 mt-[-4px] cursor-pointer dark:text-[#ffffff83] text-[#c2b3b3b8]">
            {item?.questionReplies.length}
          </span>
        </div>
        {replayActive && questionId == item?._id && (
          <>
            {item?.questionReplies.map((item) => (
              <div className="w-full flex md:ml-14 my-5 dark:text-[#ffffff83] text-[#000000b8]">
                <div className="w-8 h-8">
                  <img
                    src={
                      item?.user?.avatar ? item?.user?.avatar?.url : <RxAvatar />
                    }
                    alt="avatar"
                    className="w-8 h-8 rounded-full"
                  />
                </div>
                <div className="pl-3">
                  <div className="flex items-center">
                    <h5 className="text-[20px] text-white">
                      {item?.user?.name}
                    </h5>{" "}
                    {item?.user?.role === "Admin" && (
                      <VscVerifiedFilled className="text-[green] ml-2 text-[20px]" />
                    )}
                  </div>
                  <p className="text-white">{item?.answer}</p>
                  <small className="text-[#ffffff83]">
                    {item?.createdAt ? format(item?.createdAt) : ""}
                  </small>
                </div>
              </div>
            ))}
            <>
              <div className="w-full flex relative dark:text-white text-black">
                <input
                  type="text"
                  placeholder="Enter your answer..."
                  value={answer}
                  onChange={(e) => setAnswer(e.target.value)}
                  className={`block md:ml-12 mt-2 outline-none bg-transparent border-b border-[#00000027] dark:text-[#ffffff83] text-[#c2b3b3b8] dark:border-[#fff] p-[15px] w-[95%] $`}
                />
                <button
                  type="submit"
                  className="absolute right-0 bottom-1 p-2 text-sm tracking-tighter font-semibold rounded-2xl bg-[#2190ff] hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
                  onClick={handleAnswerSubmit}
                  disabled={answer === ""}
                >
                  Submit
                </button>
              </div>
            </>
          </>
        )}
      </div>
    </>
  );
}
