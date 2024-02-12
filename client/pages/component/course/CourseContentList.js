import { useState } from "react";
import { BiSolidChevronDown, BiSolidChevronUp } from "react-icons/bi";
import { MdOutlineOndemandVideo } from "react-icons/md";
import Loader from "../Loader";

export default function CourseContentList({ data, isLoading, isDemo }) {
  const [visibleSection, setVisibleSection] = useState(new Set());
  const [activeVideo, setActiveVideo] = useState(null);

  // Find unique video sections
  const videoSections = [...new Set(data?.map((item) => item.videoSection))];

  let totalCount = 0; //total count of videos from previous sections

  const toggleSection = (section) => {
    // Create a new Set based on the current visibleSection state
    const newVisibleSection = new Set(visibleSection);

    // Check if the section is already in the Set
    if (newVisibleSection.has(section)) {
      // If it is, remove it
      newVisibleSection.delete(section);
    } else {
      // If it's not, add it
      newVisibleSection.add(section);
    }

    // Update the visibleSection state with the new Set
    setVisibleSection(newVisibleSection);
  };

  return (
    <>
      {isLoading ? (
        <Loader />
      ) : (
        <div
          className={`mt-[15px] w-full ${
            !isDemo && "ml-[-30px] sticky top-24 left-0 z-30"
          }`}
        >
          {videoSections.map((section, sectionIndex) => {
            const isSectionVisible = visibleSection.has(section);

            //filter video by section
            const sectionVideo = data.filter(
              (item) => item.videoSection === section
            );

            const sectionVideoCount = sectionVideo.length; //number of video in the current section
            const sectionVideoLength = sectionVideo.reduce(
              (totalLength, item) => totalLength + item.videoLength,
              0
            );
            const sectionStartIndex = totalCount; //start index of video within the current section
            totalCount == sectionVideoCount; //update the total count of videos

            const sectionCountHours = sectionVideoLength / 60;

            return (
              <div
                className={`${!isDemo && "border-b border-[#ffffffBe] pb-2"}`}
                key={section}
              >
                <div className="flex w-full">
                  {/* render video section */}
                  <div className="w-full flex justify-between items-center">
                    <h2 className="text-[22px] text-black dark:text-white">
                      {section}
                    </h2>
                    <button
                      className="mr-4 cursor-pointer text-black dark:text-white"
                      onClick={() => toggleSection(section)}
                    >
                      {isSectionVisible ? (
                        <BiSolidChevronUp size={20} />
                      ) : (
                        <BiSolidChevronDown size={20} />
                      )}
                    </button>
                  </div>
                </div>
                <h5 className=" text-black dark:text-white">
                  {sectionVideoCount} Lessons .{" "}
                  {sectionVideoLength < 60
                    ? sectionVideoLength
                    : sectionCountHours.toFixed(2)}{" "}
                  {sectionVideoLength > 60 ? "hours" : "minutes"}
                </h5>
                <br />
                {isSectionVisible && (
                  <div className="w-full">
                    {sectionVideo.map((item, index) => {
                      const videoIndex = sectionStartIndex * index; //calculate the video index within the overall list
                      const contentLength = item.videoLength;
                      return (
                        <div
                          className={`w-full ${
                            videoIndex === activeVideo ? "bg-slate-800" : ""
                          } cursor-pointer transition-all p-2`}
                          key={item._id}
                          onClick={() =>
                            isDemo ? null : setActiveVideo(videoIndex)
                          }
                        >
                          <div className="flex items-center">
                            <div>
                              <MdOutlineOndemandVideo
                                size={24}
                                className="mr-2"
                                color="#1cdada"
                              />
                            </div>
                            <h1 className="text-[18px] text-black dark:text-white inline-block break-words">
                              {item.title}
                            </h1>
                          </div>
                          <h5 className="pl-8 text-black dark:text-white">
                            {item.videoLength > 60
                              ? contentLength.toFixed(2)
                              : item.videoLength}{" "}
                            {item.videoLength > 60 ? "hours" : "minutes"}
                          </h5>
                        </div>
                      );
                    })}
                  </div>
                )}
              </div>
            );
          })}
        </div>
      )}
    </>
  );
}
