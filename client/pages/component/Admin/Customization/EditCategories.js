import { AiOutlineDelete } from "react-icons/ai";
import {
  useEditLayoutMutation,
  useGetHeroDataQuery,
} from "../../../../redux/layout/layoutApi";
import Loader from "../../Loader";
import { useEffect, useState } from "react";
import toast from "react-hot-toast";
import { IoMdAddCircleOutline } from "react-icons/io";

export default function EditCategories() {
  const { data, refetch, isLoading } = useGetHeroDataQuery("Categories", {
    refetchOnMountOrArgChange: true,
  });

  const [editLayout, { isSuccess, error }] = useEditLayoutMutation();
  const [categories, setCategories] = useState([]);

  useEffect(() => {
    if (data) {
      setCategories(data.layout.categories);
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

  const handleCategoriesAdd = (id, value) => {
    setCategories((prevCategory) =>
      prevCategory.map((i) => (i._id === id ? { ...i, title: value } : i))
    );
  };

  const newCategoriesHandler = () => {
    if (categories[categories.length - 1].title === "") {
      toast.error("Category title cannot be empty");
    } else {
      setCategories((prev) => [...prev, { title: "" }]);
    }
  };

  // function to check if the FAQ arrays are changed
  const areCategoriesUnChanged = (originalCategories, newCategories) => {
    return JSON.stringify(originalCategories) === JSON.stringify(newCategories);
  };

  const isAnyCategoryTitleEmpty = (categories) => {
    return categories.some((q) => q.title === "");
  };

  const EditCategoriesHandler = async () => {
    if (
      !areCategoriesUnChanged(data.layout.categories, categories) &&
      !isAnyCategoryTitleEmpty(categories)
    ) {
      await editLayout({
        type: "Categories",
        categories,
      });
    }
  };

  return (
    <>
      {isLoading ? (
        <Loader />
      ) : (
        <div className="mt-[70px] text-center">
          <h1
            className={`text-[25px] text-black dark:text-white font-[500] font-Poppins text-center py-2`}
          >
            All Categories
          </h1>
          {categories.map((item, index) => {
            return (
              <div className="p-3">
                <div className="flex items-center w-full justify-center">
                  <input
                    className={`bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block text-[20px] p-2.5 dark:bg-transparent dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 border-none !w-[unset]`}
                    value={item.title}
                    onChange={(e) =>
                      handleCategoriesAdd(item._id, e.target.value)
                    }
                    placeholder="Enter Category title..."
                  />
                  <AiOutlineDelete
                    className=" dark:text-white text-black text-[25px] cursor-pointer"
                    onClick={(e) =>
                      setCategories((prevCategory) =>
                        prevCategory.filter((i) => i._id !== item._id)
                      )
                    }
                  />
                </div>
              </div>
            );
          })}
          <br />
          <div className=" w-full flex justify-center">
            <IoMdAddCircleOutline
              className=" dark:text-white text-black text-[25px] cursor-pointer"
              onClick={newCategoriesHandler}
            />
          </div>
          <div
            // className="rounded-2xl hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800 flex flex-row justify-center items-center py-3 px-6 cursor-pointer text-black dark:text-white text-[16px] font-Poppins font-semibold w-[100px] min-h-[40px] h-[40px] bg-[#cccccc34] absolute right-12 !bg-[#42d383]"
            className={`rounded-2xl hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800 flex flex-row justify-center items-center py-3 px-6 cursor-pointer text-black dark:text-white text-[16px] font-Poppins font-semibold w-[100px] min-h-[40px] h-[40px] bg-[#cccccc34]  ${
              areCategoriesUnChanged(data?.layout?.categories, categories) ||
              isAnyCategoryTitleEmpty(categories)
                ? "!cursor-not-allowed"
                : " !cursor-pointer !bg-[#42d383]"
            } rounded absolute right-12`}
            // onClick={handleEdit}
            onClick={
              areCategoriesUnChanged(data?.layout?.categories, categories) ||
              isAnyCategoryTitleEmpty(categories)
                ? () => null
                : EditCategoriesHandler
            }
          >
            Save
          </div>
        </div>
      )}
    </>
  );
}
