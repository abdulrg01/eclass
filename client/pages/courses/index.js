import { useSearchParams } from "next/navigation";
import { useGetUsersCourseQuery } from "../../redux/courses/coursesApi";
import { useGetHeroDataQuery } from "../../redux/layout/layoutApi";
import { useEffect, useState } from "react";
import Loader from "../component/Loader";
import Header from "../component/Header";
import Heading from "../utils/Heading";
import CourseCard from "../component/course/CourseCard";
import Footer from "../component/Footer";

export default function index() {
  const searchParams = useSearchParams();
  const search = searchParams?.get("title");
  const { data, isLoading } = useGetUsersCourseQuery(undefined, {});
  const { data: categoriesData, isLoading: categoriesDataLoading } = useGetHeroDataQuery("Categories", {});
  const [route, setRoute] = useState("Login");
  const [open, setOpen] = useState(false);
  const [courses, setCourses] = useState([]);
  const [category, setCategory] = useState("All");

  useEffect(() => {
    if (category === "All") {
      setCourses(data?.course);
    }
    if (category !== "All") {
      setCourses(data?.course.filter((item) => item.categories === category));
    }
    if (search) {
      setCourses(
        data?.course.filter((item) =>
          item.name.toLowerCase().includes(search.toLowerCase())
        )
      );
    }
  }, [data, category, search]);

  const categories = categoriesData?.layout.categories;

  return (
    <div>
      {isLoading && categoriesDataLoading ? (
        <Loader />
      ) : (
        <>
          <Header
            route={route}
            setRoute={setRoute}
            open={open}
            setOpen={setOpen}
            activeItem={1}
          />
          <div className="w-[95%] md:w-[85%] min-h-[70vh] m-auto">
            <Heading
              title={"All courses - Elearning"}
              description="ELearning is a platform for students to learn and help from teachers"
              keywords="Programing, Mearn, Redux, maching Learning"
            />
            <br />
            <div className="w-full flex items-center flex-wrap">
              <div
                className={`h-[35px] ${
                  category === "All" ? "bg-[crimson]" : "bg-[#5050cb]"
                } m-3 px-3 rounded-[30px] flex items-center justify-center font-Poppins cursor-pointer`}
                onClick={() => setCategory("All")}
              >
                All
              </div>
              {categories &&
                categories.map((item, index) => (
                  <div key={index}>
                    <div
                      className={`h-[35px] ${
                        category === item.title
                          ? "bg-[crimson]"
                          : "bg-[#5050cb]"
                      } m-3 px-3 rounded-[30px] flex items-center justify-center font-Poppins cursor-pointer`}
                      onClick={() => setCategory(item.title)}
                    >
                      {item.title}
                    </div>
                  </div>
                ))}
            </div>
            {courses && courses.length === 0 && (
              <p className="bg-transparent mb-2 text-sm font-medium text-gray-900 dark:text-white justify-center min-h-[50%] flex items-center">
                {search
                  ? "No courses found!"
                  : "No courses found in this category. Please try anther one!"}
              </p>
            )}
            <br />
            <div className="grid grid-cols-1 gap-6 md:grid-cols-2 md:gap-[25px] lg:grid-cols-3 lg:gap-[25px] 1500px:gap-[35px] mb-12 border-0 mt-14">
              {courses &&
                courses.map((item, index) => (
                  <>
                    <CourseCard item={item} key={item?._id} />
                  </>
                ))}
            </div>
          </div>
          <Footer />
        </>
      )}
    </div>
  );
}
