import { styles } from "../../../../style";
import { useEffect, useState } from "react";
import { useGetHeroDataQuery } from "../../../../redux/layout/layoutApi";
import Loader from "../../Loader";

export default function CourseInformation({
  active,
  setActive,
  courseInfo,
  setCourseInfo,
}) {
  const { data, isLoading } = useGetHeroDataQuery("Categories", {});

  const [dragging, setDragging] = useState(false);
  const [categories, setCategories] = useState([]);

  useEffect(() => {
    if (data) {
      setCategories(data.layout.categories);
    }
  }, [data]);

  const handleSubmit = (e) => {
    e.preventDefault();
    setActive(active + 1);
  };

  const handleFileChange = (e) => {
    const file = e.target.files[0];

    const reader = new FileReader();

    reader.readAsDataURL(file);

    reader.onload = () => {
      if (reader.readyState === 2) {
        setCourseInfo({ ...courseInfo, thumbnail: reader.result });
      }
    };
  };

  const handleDragOver = (e) => {
    e.preventDefault();
    setDragging(true);
  };

  const handleDragLeave = (e) => {
    e.preventDefault();
    setDragging(false);
  };

  const handleDrop = (e) => {
    e.preventDefault();
    setDragging(false);

    const file = e.dataTransfer.files[0];
    if (file) {
      const reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onload = (e) => {
        setCourseInfo({ ...courseInfo, thumbnail: reader.result });
      };
    }
  };

  return (
    <>
      {isLoading ? (
        <Loader />
      ) : (
        <div className="w-[600px] m-auto mt-[50px]">
          <form onSubmit={handleSubmit} className={`${styles.label}`}>
            <div>
              <label>Course Name</label>
              <input
                type="name"
                name=""
                onChange={(e) =>
                  setCourseInfo({ ...courseInfo, name: e.target.value })
                }
                id="name"
                placeholder="MERN stack LMS platform with next 13"
                required
                value={courseInfo.name}
                className={`${styles.input} p-2`}
              />
            </div>
            <br />
            <div className="mb-5">
              <label className={`${styles.label}`}>Course Description</label>
              <textarea
                name=""
                placeholder="Write something amazing..."
                className={`${styles.input} h-min py-2`}
                id=""
                cols="30"
                rows="8"
                value={courseInfo.description}
                onChange={(e) =>
                  setCourseInfo({ ...courseInfo, description: e.target.value })
                }
              ></textarea>
            </div>
            <br />
            <div className=" w-full flex justify-between">
              <div className="w-[45%]">
                <label className={`${styles.label}`}>Course Price</label>
                <input
                  type="number"
                  name=""
                  onChange={(e) =>
                    setCourseInfo({ ...courseInfo, price: e.target.value })
                  }
                  id="price"
                  placeholder="29"
                  required
                  value={courseInfo.price}
                  className={`${styles.input}`}
                />
              </div>
              <div className="w-[45%]">
                <label className={`${styles.label}`}>
                  Estimated Price [optional]
                </label>
                <input
                  type="number"
                  name=""
                  onChange={(e) =>
                    setCourseInfo({
                      ...courseInfo,
                      estimatedPrice: e.target.value,
                    })
                  }
                  id="price"
                  placeholder="29"
                  required
                  value={courseInfo.estimatedPrice}
                  className={`${styles.input}`}
                />
              </div>
            </div>
            <br />
            <div className=" w-full flex justify-between">
              <div className="w-[45%]">
                <label className={`${styles.label}`} htmlFor="tags">
                  Course Tags
                </label>
                <input
                  type="text"
                  name=""
                  onChange={(e) =>
                    setCourseInfo({ ...courseInfo, tags: e.target.value })
                  }
                  id="tags"
                  placeholder="MERN, Next 13, socket io, tailwind css, LMS"
                  required
                  value={courseInfo.tags}
                  className={`${styles.input} p-2`}
                />
              </div>
              <div className="w-[45%]">
                <label className={`${styles.label} w-[45%]`}>
                  Course Categories
                </label>
                <select
                  name=""
                  id=""
                  className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                  value={courseInfo.category}
                  onChange={(e) =>
                    setCourseInfo({ ...courseInfo, category: e.target.value })
                  }
                >
                  <option value="">Select Category</option>
                  {categories.map((item) => (
                    <option
                      value={item.title}
                      key={item._id}
                      className="text-black dark:text-white bg-transparent dark:bg-transparent"
                    >
                      {item.title}
                    </option>
                  ))}
                </select>
              </div>
            </div>
            <br />
            <div className=" w-full flex justify-between">
              <div className="w-[45%]">
                <label className={`${styles.label}`}>Course Level</label>
                <input
                  type="text"
                  name=""
                  onChange={(e) =>
                    setCourseInfo({ ...courseInfo, level: e.target.value })
                  }
                  id="level"
                  placeholder="Beginner/Intermediate/Expert"
                  required
                  value={courseInfo.level}
                  className={`${styles.input}`}
                />
              </div>
              <div className="w-[45%]">
                <label className={`${styles.label} w-[45%]`}>demo Url</label>
                <input
                  type="text"
                  name=""
                  onChange={(e) =>
                    setCourseInfo({ ...courseInfo, demoUrl: e.target.value })
                  }
                  id="price"
                  placeholder="errf76532"
                  required
                  value={courseInfo.demoUrl}
                  className={`${styles.input}`}
                />
              </div>
            </div>
            <br />
            <div className="w-full">
              <input
                type="file"
                accept="image/*"
                id="file"
                className="hidden"
                onChange={handleFileChange}
              />
              <label
                htmlFor="file"
                className={`w-full min-h-[10vh] dark:border-white border-[#00000026] p-3 border flex items-center justify-center ${
                  dragging ? "bg-blue-500" : "bg-transparent"
                }`}
                onDragOver={handleDragOver}
                onDragLeave={handleDragLeave}
                onDrop={handleDrop}
              >
                {courseInfo.thumbnail ? (
                  <img
                    src={courseInfo.thumbnail}
                    alt="thumbnail"
                    className=" max-h-full w-full object-cover"
                  />
                ) : (
                  <span className=" text-black dark:text-white">
                    Drag and drop your thumbnail here or click to leave
                  </span>
                )}
              </label>
            </div>
            <br />
            <div className="w-full flex items-center justify-end">
              <input
                type="submit"
                value="Next"
                className="w-full md:w-[180px] h-[40px] bg-[#37a39a] text-center text-[#fff] rounded mt-8 cursor-pointer"
              />
            </div>
            <br />
          </form>
        </div>
      )}
    </>
  );
}
