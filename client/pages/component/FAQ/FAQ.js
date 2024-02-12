import { useEffect, useState } from "react";
import { useGetHeroDataQuery } from "../../../redux/layout/layoutApi";
import { HiMinus, HiPlus } from "react-icons/hi";
import Loader from "../Loader";

export default function FAQ() {
  const { data, isLoading } = useGetHeroDataQuery("FAQ", {});
  const [activeQuestion, setActiveQuestion] = useState(null);
  const [questions, setQuestions] = useState([]);

  useEffect(() => {
    if (data) {
      setQuestions(data.layout.faq);
    }
  }, [data]);

  const toggleQuestion = (id) => {
    setActiveQuestion(activeQuestion === id ? null : id);
  };

  return (
    <>
      {isLoading ? (
        <Loader />
      ) : (
        <div className="bg-gray-100 dark:bg-gray-900">
          <div className="w-[90%] m-auto mt-[40px] md:w-[80%] min-h-screen">
            <h1 className="text-[25px] text-black dark:text-white font-[500] font-Poppins text-center py-2 md:text-[40px]">
              Frequently Asked Questions
            </h1>
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
                        <span className=" font-medium text-black dark:text-white">
                          {q.question}
                        </span>
                        <span className="ml-6 flex-shrink-0 text-gray-900 dark:text-white">
                          {activeQuestion === q._id ? (
                            <HiMinus className=" h-6 w-6" />
                          ) : (
                            <HiPlus className=" h-6 w-6" />
                          )}
                        </span>
                      </button>
                    </dt>
                    {activeQuestion === q._id && (
                      <dd className="mt-2 pr-12">
                        <p className="text-base font-Poppins text-black dark:text-white">
                          {q.answer}
                        </p>
                      </dd>
                    )}
                  </div>
                ))}
              </dl>
              <br />
              <br />
            </div>
          </div>
        </div>
      )}
    </>
  );
}
