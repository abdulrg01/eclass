import { useEffect, useState } from "react";
import { useGetUsersCourseQuery } from "../../../redux/courses/coursesApi";
import CourseCard from "../../component/course/CourseCard";
import Loader from "../Loader";

export default function Courses() {
  const { data, isLoading } = useGetUsersCourseQuery();
  const [courses, setCourses] = useState([]);

  useEffect(() => {
    if (data) {
      setCourses(data?.course);
    }
  }, [data]);

  return (
    <>
      {isLoading ? (
        <Loader />
      ) : (
        <div className="bg-gray-100 dark:bg-gray-900">
          <div className={`w-[90%] md:w-[80%] m-auto p-8`}>
            <h1 className=" text-center text-[25px] leading-[25px] sm:text-3xl lg:text-4xl mb-4 font-extrabold tracking-tight xl:text-4xl dark:text-white text-gray-600">
              Expand Your Career{" "}
              <span className=" text-gradient">Opportunity</span>
              <br />
              Opportunity With Our Courses
            </h1>
            <div className="grid grid-cols-1 gap-6 md:grid-cols-2 md:gap-[25px] lg:grid-cols-3 lg:gap-[25px] 1500px:gap-[35px] mb-12 border-0 mt-14">
              {courses &&
                courses.map((item, index) => (
                  <>
                    <CourseCard item={item} key={index} isProfile={true} />
                  </>
                ))}
            </div>
          </div>
        </div>
      )}
    </>
  );
}
