import React, { useEffect, useState } from "react";
import SideBarProfile from "../SideBarProfile";
import ProfileInfo from "../ProfileInfo";
import CourseCard from "../course/CourseCard";
import ChangePassword from "../Route/ChangePassword";
import { useGetUsersCourseQuery } from "../../../redux/courses/coursesApi";
import Loader from "../Loader";

export default function Profile({ user }) {
  const [scroll, setScroll] = useState(false);
  const [avatar, setAvatar] = useState(null);
  const [active, setActive] = useState(1);
  const [courses, setCourses] = useState([]);
  const { data, isLoading } = useGetUsersCourseQuery(undefined, {});

  if (typeof window !== "undefined") {
    window.addEventListener(scroll, () => {
      if (window.scrollY > 85) {
        setScroll(true);
      } else {
        setScroll(false);
      }
    });
  }

  useEffect(() => {
    if (data && user) {
      const filteredCourses = user?.courses
        .map((userCourse) =>
          data?.course.find((course) => course._id === userCourse)
        )
        .filter((course) => course !== undefined);

      setCourses(filteredCourses);
      setAvatar(user?.avatar?.url);
    }
  }, [data, user]);

  return (
    <>
      {isLoading ? (
        <Loader />
      ) : (
        <div className="w-[85%] flex mx-auto">
          <div
            className={`${
              scroll ? "top-[120px]" : "top-[30px]"
            } w-[60px] md:w-[310px] h-[450px] dark:bg-slate-900 bg-opacity-90 bg-gray-50 border dark:border-[#ffffff1d] border-[#ffffff0d] rounded-[5px] dark:shadow-sm shadow-xl mt-[60px] mb-[30px] sticky left-[30px]`}
          >
            <SideBarProfile
              active={active}
              avatar={avatar}
              setActive={setActive}
            />
          </div>
          {active === 1 && (
            <div className="w-full h-full bg-transparent mt-[60px]">
              <ProfileInfo avatar={avatar} user={user} />
            </div>
          )}
          {active === 2 && (
            <div className="w-full h-full bg-transparent mt-[60px]">
              <ChangePassword avatar={avatar} user={user} />
            </div>
          )}
          {active === 3 && (
            <div className="w-full pl-7 px-2 md:px-10 md:pl-8 h-full bg-transparent mt-[60px]">
              <div className="grid grid-cols-1 gap-6 md:grid-cols-1 md:gap-[25px] lg:grid-cols-2 lg:gap-[25px] mb-12 border-0 mt-14">
                {courses &&
                  courses.map((item, index) => (
                    <>
                      <CourseCard item={item} key={index} />
                    </>
                  ))}
              </div>
              {courses && courses.length === 0 && (
                <p className="bg-transparent mb-2 text-sm font-medium text-gray-900 dark:text-white justify-center min-h-[50%] flex items-center">
                  You don't have any purchased course
                </p>
              )}
            </div>
          )}
        </div>
      )}
    </>
  );
}
