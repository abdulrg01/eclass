import { useGetCourseContentQuery } from "../../../redux/courses/coursesApi";
import Heading from "../../utils/Heading";
import Header from "../Header";
import CourseContentMedia from "./CourseContentMedia";
import CourseContentList from "./CourseContentList";
import { useState } from "react";
import Loader from "../Loader";

export default function CourseContents({ id, user }) {
  const { data, isLoading, refetch } = useGetCourseContentQuery(id, {
    refetchOnMountOrArgChange: true,
  });
  const [activeVideo, setActiveVideo] = useState(0);
  const [open, setOpen] = useState(false);
  const [route, setRoute] = useState("Login");

  return (
    <>
      {isLoading ? (
        <Loader />
      ) : (
        <>
          <Header
            activeItem={1}
            open={open}
            setOpen={setOpen}
            route={route}
            setRoute={setRoute}
          />
          <div className="w-full grid md:grid-cols-10 text-white dark:text-black">
            <Heading
              title={data?.course.courseData[activeVideo]?.title}
              description="ELearning"
              keywords={data?.course?.tags}
            />
            <div className="col-span-7">
              <CourseContentMedia
                data={data}
                Loading={isLoading}
                id={id}
                user={user}
                refetch={refetch}
                activeVideo={activeVideo}
                setActiveVideo={setActiveVideo}
              />
            </div>
            <div className="hidden md:block md:col-span-3">
              <CourseContentList
                isLoading={isLoading}
                setActiveVideo={setActiveVideo}
                data={data?.course.courseData}
                activeVideo={activeVideo}
              />
            </div>
          </div>
        </>
      )}
    </>
  );
}
