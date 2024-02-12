import { useEffect, useState } from "react";
import {
  useEditLayoutMutation,
  useGetHeroDataQuery,
} from "../../../../redux/layout/layoutApi";
import { AiOutlineDelete } from "react-icons/ai";
import { IoMdAddCircleOutline } from "react-icons/io";
import Loader from "../../Loader";
import { HiMinus, HiPlus } from "react-icons/hi";
import toast from "react-hot-toast";

export default function EditFaq() {
  const { data, refetch, isLoading } = useGetHeroDataQuery("FAQ", {
    refetchOnMountOrArgChange: true,
  });

  const [editLayout, { isSuccess, error }] = useEditLayoutMutation();

  const [questions, setQuestions] = useState([]);

  useEffect(() => {
    if (data) {
      setQuestions(data.layout.faq);
    }
    if (isSuccess) {
      refetch();
      toast.success("FAQ Updated Successfully");
    }
    if (error) {
      if ("data" in error) {
        const errorMessage = error;

        toast.error(errorMessage.data.message);
      }
    }
  }, [data, isSuccess, error, refetch]);

  const toggleQuestion = (id) => {
    setQuestions((prevQuestion) =>
      prevQuestion.map((q) => (q._id === id ? { ...q, active: !q.active } : q))
    );
  };

  const handleQuestionChange = (id, value) => {
    setQuestions((prevQuestion) =>
      prevQuestion.map((q) => (q._id === id ? { ...q, question: value } : q))
    );
  };

  const handleAnswerChange = (id, value) => {
    setQuestions((prevQuestion) =>
      prevQuestion.map((q) => (q._id === id ? { ...q, answer: value } : q))
    );
  };

  const newFaqHandler = () => {
    setQuestions([
      ...questions,
      {
        question: "",
        answer: "",
      },
    ]);
  };

  // function to check if the FAQ arrays are changed
  const areQuestionsUnChanged = (originalQuestions, newQuestions) => {
    return JSON.stringify(originalQuestions) === JSON.stringify(newQuestions);
  };

  const isAnyQuestionEmpty = (questions) => {
    return questions.some((q) => q.questions === "" || q.questions === "");
  };

  const handleEdit = async () => {
    if (
      !areQuestionsUnChanged(data.layout.faq, questions) &&
      !isAnyQuestionEmpty(questions)
    ) {
      await editLayout({
        type: "FAQ",
        faq: questions,
      });
    }
  };

  return (
    <>
      {isLoading ? (
        <Loader />
      ) : (
        <div className="w-[90%] m-auto mt-[80px] md:w-[80%] min-h-screen">
          <div className="mt-12">
            <dl className="space-y-6">
              {questions.map((q) => (
                <div
                  className={`${
                    q._id !== questions[0]?._id && "border-t"
                  } pt-6 border-gray-200`}
                  key={q._id}
                >
                  <dt className="text-lg">
                    <button
                      className="flex items-start dark:text-white text-black justify-between w-full text-left focus:outline-none"
                      onClick={() => toggleQuestion(q._id)}
                    >
                      <input
                        className={`bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-transparent dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 border-none`}
                        value={q.question}
                        onChange={(e) =>
                          handleQuestionChange(q._id, e.target.value)
                        }
                        placeholder={"Add your question..."}
                      />
                      <span class="ml-6 flex-shrink-0 text-gray-900 dark:text-white">
                        {q.active ? (
                          <HiMinus className=" h-6 w-6" />
                        ) : (
                          <HiPlus className=" h-6 w-6" />
                        )}
                      </span>
                    </button>
                  </dt>
                  {q.active && (
                    <dd className="mt-2 pr-12">
                      <input
                        className={`border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-transparent dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 border-none`}
                        value={q.answer}
                        onChange={(e) =>
                          handleAnswerChange(q._id, e.target.value)
                        }
                        placeholder="Add your answer..."
                      />
                      <span className="ml-6 flex-shrink-0">
                        <AiOutlineDelete
                          className="text-[10px] cursor-pointer text-black dark:text-white"
                          onClick={() =>
                            setQuestions((prevQuestion) =>
                              prevQuestion.filter((item) => item._id !== q._id)
                            )
                          }
                        />
                      </span>
                    </dd>
                  )}
                </div>
              ))}
            </dl>
            <br />
            <IoMdAddCircleOutline
              className=" dark:text-white text-black text-[25px] cursor-pointer"
              onClick={newFaqHandler}
            />
          </div>

          <div
            // className="rounded-2xl hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800 flex flex-row justify-center items-center py-3 px-6 cursor-pointer text-black dark:text-white text-[16px] font-Poppins font-semibold w-[100px] min-h-[40px] h-[40px] bg-[#cccccc34] absolute right-12 !bg-[#42d383]"
            className={`rounded-2xl hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800 flex flex-row justify-center items-center py-3 px-6 cursor-pointer text-black dark:text-white text-[16px] font-Poppins font-semibold w-[100px] min-h-[40px] h-[40px] bg-[#cccccc34]  ${
              areQuestionsUnChanged(data?.layout?.faq, questions) ||
              isAnyQuestionEmpty(questions)
                ? "!cursor-not-allowed"
                : " !cursor-pointer !bg-[#42d383]"
            } rounded absolute right-12`}
            // onClick={handleEdit}
            onClick={
              areQuestionsUnChanged(data?.layout?.faq, questions) ||
              isAnyQuestionEmpty(questions)
                ? () => null
                : handleEdit
            }
          >
            Save
          </div>
        </div>
      )}
    </>
  );
}
