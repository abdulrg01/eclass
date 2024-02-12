import { styles } from "../../../../style";
import { useState } from "react";
import toast from "react-hot-toast";
import { AiOutlineDelete, AiOutlinePlusCircle } from "react-icons/ai";
import { BiLink, BiSolidPencil } from "react-icons/bi";
import { MdOutlineKeyboardArrowDown } from "react-icons/md";

export default function CourseContent({
  active,
  setActive,
  courseContentData,
  setCourseContentData,
  handleSubmit: handleCourseSubmit,
}) {
  const [isCollapsed, setIsCollapsed] = useState(
    Array(courseContentData?.length).fill(false)
  );

  const [activeSection, setActiveSection] = useState(1);

  const handleSubmit = (e) => {
    e.preventDefault();
  };

  const handleCollapseToggle = (index) => {
    const updatedCollapsed = [...isCollapsed];
    updatedCollapsed[index] = !updatedCollapsed[index];
    setIsCollapsed(updatedCollapsed);
  };

  const handleRemoveLink = (index, linkIndex) => {
    const updatedData = [...courseContentData];
    updatedData[index]?.links?.splice(linkIndex, 1);
    setCourseContentData(updatedData);
  };

  const handleAddLink = (index) => {
    const updatedData = [...courseContentData];
    updatedData[index]?.links?.push({ title: "", url: "" });
    setCourseContentData(updatedData);
  };

  const newContentHandler = (item) => {
    if (
      item?.title === "" ||
      item?.description === "" ||
      item?.videoSection === "" ||
      item?.links[0].title === "" ||
      item?.links[0].url === ""
    ) {
      toast.error("Please fill all the fields first");
    } else {
      let newVideoSection = "";

      if (courseContentData?.length > 0) {
        const lastVideoSection =
          courseContentData[courseContentData?.length - 1].videoSection;

        // use the last VideoSection if available, else use user input
        if (lastVideoSection) {
          newVideoSection = lastVideoSection;
        }
      }
      const newContent = {
        videoUrl: "",
        title: "",
        description: "",
        videoSection: newVideoSection,
        links: [{ title: "", url: "" }],
      };
      setCourseContentData([...courseContentData, newContent]);
    }
  };

  const addNewSection = () => {
    if (
      courseContentData[courseContentData?.length - 1].title === "" ||
      courseContentData[courseContentData?.length - 1].description === "" ||
      courseContentData[courseContentData?.length - 1].videoUrl === "" ||
      courseContentData[courseContentData?.length - 1].links[0].title === "" ||
      courseContentData[courseContentData?.length - 1].links[0].url === ""
    ) {
      toast.error("Please fill all the fields first");
    } else {
      setActive(activeSection + 1);
      const newContent = {
        videoUrl: "",
        title: "",
        description: "",
        videoSection: `Untitled Section ${activeSection}`,
        links: [{ title: "", url: "" }],
      };
      setCourseContentData([...courseContentData, newContent]);
    }
  };

  const prevButton = () => {
    setActive(active - 1);
  };

  const handleOptions = () => {
    if (
      courseContentData[courseContentData?.length - 1].title === "" ||
      courseContentData[courseContentData?.length - 1].description === "" ||
      courseContentData[courseContentData?.length - 1].videoUrl === "" ||
      courseContentData[courseContentData?.length - 1].links[0].title === "" ||
      courseContentData[courseContentData?.length - 1].links[0].url === ""
    ) {
      toast.error("Please fill all the fields first");
    } else {
      setActive(active + 1);
      handleCourseSubmit();
    }
  };

  return (
    <div className=" w-[75%] m-auto mt-14 p-3">
      <form onSubmit={handleSubmit}>
        {courseContentData?.map((item, index) => {
          const showSectionInput =
            index === 0 ||
            item?.videoSection !== courseContentData[index - 1].videoSection;
          return (
            <div key={index}>
              <div
                className={`w-full bg-[#c6c8c817] p-4 ${
                  showSectionInput ? "mt-5" : "mb-0"
                }`}
                key={index}
              >
                {showSectionInput && (
                  <>
                    <div className="flex w-full items-center">
                      <input
                        type="text"
                        className={`text-[20px] ${
                          item?.videoSection === "Untitled Section"
                            ? "w-[170px]"
                            : "w-min"
                        } font-Poppins cursor-pointer text-black dark:text-white bg-transparent outline-none`}
                        value={item?.videoSection}
                        onChange={(e) => {
                          const updatedData = [...courseContentData];
                          updatedData[index].videoSection = e.target.value;
                          setCourseContentData(updatedData);
                        }}
                      />
                      <BiSolidPencil className=" cursor-pointer dark:text-white text-black" />
                    </div>
                  </>
                )}
                <div className="flex w-full items-center justify-between my-0">
                  {isCollapsed[index] ? (
                    <>
                      {item?.title ? (
                        <p className="font-Poppins dark:text-white text-black">
                          {index + 1}, {item?.title}
                        </p>
                      ) : (
                        <></>
                      )}
                    </>
                  ) : (
                    <div></div>
                  )}

                  {/* Arrow button for collapse video content */}
                  <div className="flex items-center">
                    <AiOutlineDelete
                      className={`dark:text-white text-[20px] mr-2 text-black ${
                        index > 0 ? "cursor-pointer" : "cursor-no-drop"
                      }`}
                      onClick={() => {
                        if (index > 0) {
                          const updatedData = [...courseContentData];
                          updatedData.splice(index, 1);
                          setCourseContentData(updatedData);
                        }
                      }}
                    />
                    <MdOutlineKeyboardArrowDown
                      fontSize="large"
                      className="dark:text-white text-black"
                      style={{
                        transform: isCollapsed[index]
                          ? "rotate(180deg)"
                          : "rotate(0deg)",
                      }}
                      onClick={() => handleCollapseToggle(index)}
                    />
                  </div>
                </div>
                {!isCollapsed[index] && (
                  <>
                    <div className="my-3">
                      <label htmlFor="" className={styles.label}>
                        Video Title
                      </label>
                      <input
                        type="text"
                        className={`${styles.input}`}
                        value={item?.title}
                        placeholder="Project plan"
                        onChange={(e) => {
                          const updatedData = [...courseContentData];
                          updatedData[index].title = e.target.value;
                          setCourseContentData(updatedData);
                        }}
                      />
                    </div>
                    <div className="my-3">
                      <label htmlFor="" className={styles.label}>
                        Video Url
                      </label>
                      <input
                        type="text"
                        className={`${styles.input}`}
                        value={item?.videoUrl}
                        placeholder="sddff"
                        onChange={(e) => {
                          const updatedData = [...courseContentData];
                          updatedData[index].videoUrl = e.target.value;
                          setCourseContentData(updatedData);
                        }}
                      />
                    </div>
                    <div className="my-3">
                      <label htmlFor="" className={styles.label}>
                        Video Length [in minutes]
                      </label>
                      <input
                        type="text"
                        className={`${styles.input}`}
                        value={item?.videoLength}
                        placeholder="20"
                        onChange={(e) => {
                          const updatedData = [...courseContentData];
                          updatedData[index].videoLength = e.target.value;
                          setCourseContentData(updatedData);
                        }}
                      />
                    </div>

                    <div className="my-3">
                      <label htmlFor="" className={styles.label}>
                        Video Description
                      </label>
                      <textarea
                        rows={8}
                        cols={30}
                        className={`${styles.input} !h-min py-2`}
                        value={item?.description}
                        placeholder="sddff"
                        onChange={(e) => {
                          const updatedData = [...courseContentData];
                          updatedData[index].description = e.target.value;
                          setCourseContentData(updatedData);
                        }}
                      />
                      <br />
                    </div>
                    {item?.links?.map((link, linkIndex) => (
                      <div className="mb-3 block">
                        <div className="w-full flex items-center justify-between">
                          <label htmlFor="" className={styles.label}>
                            Link {linkIndex + 1}
                          </label>
                          <AiOutlineDelete
                            className={`${
                              linkIndex === 0
                                ? "cursor-no-drop"
                                : " cursor-pointer"
                            } dark:text-white text-[20px] mr-2 text-black`}
                            onClick={() =>
                              linkIndex === 0
                                ? null
                                : handleRemoveLink(index, linkIndex)
                            }
                          />
                        </div>
                        <input
                          type="text"
                          placeholder="Source Code... (link title)"
                          className={`${styles.input}`}
                          value={link.title}
                          onChange={(e) => {
                            const updatedData = [...courseContentData];
                            updatedData[index].links[linkIndex].title =
                              e.target.value;
                            setCourseContentData(updatedData);
                          }}
                        />
                        <input
                          type="url"
                          placeholder="Source Code Url... (Link URL)"
                          className={`${styles.input} mt-6`}
                          value={link.url}
                          onChange={(e) => {
                            const updatedData = [...courseContentData];
                            updatedData[index].links[linkIndex].url =
                              e.target.value;
                            setCourseContentData(updatedData);
                          }}
                        />
                      </div>
                    ))}
                    <br />
                    {/* add link button */}
                    <div className=" inline-block mb-4">
                      <p
                        className=" flex items-center text-[11px] dark:text-white text-black cursor-pointer"
                        onClick={() => handleAddLink(index)}
                      >
                        <BiLink className="mr-2 " /> Add Link
                      </p>
                    </div>
                  </>
                )}
                <br />
                {/* add new content */}
                {index === courseContentData?.length - 1 && (
                  <div>
                    <p
                      className="flex items-center text-[10px] dark:text-white text-black cursor-pointer"
                      onClick={() => newContentHandler(item)}
                    >
                      <AiOutlinePlusCircle className="mr-2" /> Add New Content
                    </p>
                  </div>
                )}
              </div>
            </div>
          );
        })}
        <br />
        <div
          className="flex items-center text-[20px] dark:text-white text-black cursor-pointer"
          onClick={() => addNewSection()}
        >
          <AiOutlinePlusCircle className="mr-2" /> Add New Section
        </div>
      </form>
      <br />
      <div className=" w-full flex items-center justify-between">
        <div
          className="w-full md:w-[100px] flex items-center justify-center h-[40px] bg-[#37a39a] text-center text-[#fff] rounded mt-4 cursor-pointer"
          onClick={() => prevButton()}
        >
          Prev
        </div>
        <div
          className="w-full md:w-[100px] flex items-center justify-center h-[40px] bg-[#37a39a] text-center text-[#fff] rounded mt-4 cursor-pointer"
          onClick={() => handleOptions()}
        >
          Next
        </div>
      </div>
    </div>
  );
}
