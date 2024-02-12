import { useState } from "react";
import CourseInformation from "./CourseInformation";
import CourseOption from "./CourseOption";
import CourseContent from "./CourseContent";
import CoursePreview from "./CoursePreview";
import {
  useEditCourseMutation,
  useGetCoursesQuery,
} from "../../../../redux/courses/coursesApi";
import { useEffect } from "react";
import toast from "react-hot-toast";
import { useRouter } from "next/router";
import CourseData from "../../course/CourseData";
import Loader from "../../Loader";

export default function EdithCourse({ id }) {
  const { data, isLoading, error } = useGetCoursesQuery(
    {},
    { refetchOnMountOrArgChange: true }
  );
  const [editCourse, { isSuccess, error: editError }] = useEditCourseMutation();

  const [active, setActive] = useState(0);
  const router = useRouter();

  const edithCourseData = data && data.course.find((i) => i.id === id);

  useEffect(() => {
    if (isSuccess) {
      router.push("/admin/courses");
      toast.success("Course Updated successfully");
    }
    if (error || editError) {
      if ("data" in error) {
        const errorMessage = error;

        toast.error(errorMessage.data.message);
      }
    }
  }, [isSuccess, error, router, isLoading]);

  useEffect(() => {
    if (edithCourseData) {
      setCourseInfo({
        name: edithCourseData.name,
        description: edithCourseData.description,
        price: edithCourseData.price,
        estimatedPrice: edithCourseData?.estimatedPrice,
        tags: edithCourseData.tags,
        level: edithCourseData.level,
        demoUrl: edithCourseData.demoUrl,
        thumbnail: edithCourseData.thumbnail.url,
      });
      setBenefits(edithCourseData.benefits);
      setPrerequisites(edithCourseData.prerequisites);
      setCourseContentData(edithCourseData.courseData);
    }
  }, [edithCourseData]);

  const [courseInfo, setCourseInfo] = useState({
    name: "",
    description: "",
    price: "",
    estimatedPrice: "",
    tags: "",
    level: "",
    demoUrl: "",
    thumbnail: "",
  });
  const [benefits, setBenefits] = useState([{ title: "" }]);
  const [prerequisites, setPrerequisites] = useState([{ title: "" }]);
  const [courseContentData, setCourseContentData] = useState([
    {
      videoUrl: "",
      title: "",
      description: "",
      VideoSection: "Untitled Section",
      links: [
        {
          title: "",
          url: "",
        },
      ],
      suggestion: "",
    },
  ]);

  const [courseData, setCourseData] = useState({});

  const handleSubmit = async () => {
    // format benefits array
    const formattedBenefits = benefits.map((benefit) => ({
      title: benefit.title,
    }));
    // format prerequisites array
    const formattedPrerequisites = prerequisites.map((prerequisite) => ({
      title: prerequisite.title,
    }));

    // format prerequisites array
    const formattedCourseContentData = courseContentData.map(
      (courseContent) => ({
        videoUrl: courseContent.videoUrl,
        title: courseContent.title,
        description: courseContent.description,
        VideoSection: courseContent.VideoSection,
        links: courseContent.links.map((link) => ({
          title: link.title,
          url: link.url,
        })),
        suggestion: courseContent.suggestion,
      })
    );

    //prepare for data object
    const data = {
      name: courseInfo.name,
      description: courseInfo.description,
      price: courseInfo.price,
      estimatedPrice: courseInfo.estimatedPrice,
      tags: courseInfo.tags,
      thumbnail: courseInfo.thumbnail,
      level: courseInfo.level,
      demoUrl: courseInfo.demoUrl,
      totalVideos: courseInfo.length,
      benefits: formattedBenefits,
      prerequisites: formattedPrerequisites,
      courseData: formattedCourseContentData,
    };

    setCourseData(data);
  };

  const handleCourseCreate = async (e) => {
    const data = courseData;
    await editCourse({ id: edithCourseData?._id, data });
  };

  return (
    <>
      {isLoading ? (
        <Loader />
      ) : (
        <div className=" w-full flex min-h-screen">
          {id}
          <div className="w-[85%]">
            {active === 0 && (
              <CourseInformation
                courseInfo={courseInfo}
                setCourseInfo={setCourseInfo}
                active={active}
                setActive={setActive}
              />
            )}
            {active === 1 && (
              <CourseData
                benefits={benefits}
                setBenefits={setBenefits}
                setPrerequisites={setPrerequisites}
                prerequisites={prerequisites}
                active={active}
                setActive={setActive}
              />
            )}
            {active === 2 && (
              <CourseContent
                active={active}
                setActive={setActive}
                courseContentData={courseContentData}
                setCourseContentData={setCourseContentData}
                handleSubmit={handleSubmit}
              />
            )}
            {active === 3 && (
              <CoursePreview
                active={active}
                setActive={setActive}
                courseData={courseData}
                handleCourseCreate={handleCourseCreate}
                isEdit={true}
              />
            )}
          </div>
          <div className="w-[20%] mt-[20px] h-screen fixed z-1 top-10 right-0">
            <CourseOption active={active} setActive={setActive} />
          </div>
        </div>
      )}
    </>
  );
}
