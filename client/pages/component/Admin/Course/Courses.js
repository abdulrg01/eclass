import { AiFillEdit, AiOutlineDelete } from "react-icons/ai";
import Loader from "../../Loader";
import { format } from "timeago.js";
import { useEffect, useState } from "react";
import {
  useDeleteCourseMutation,
  useGetCoursesQuery,
} from "../../../../redux/courses/coursesApi";
import toast from "react-hot-toast";
import Link from "next/link";

export default function Courses() {
  const [userId, setUserId] = useState("");
  const [confirm, setConfirm] = useState(false);

  const { data, isLoading, isError, error, refetch } = useGetCoursesQuery(
    {},
    { refetchOnMountOrArgChange: true }
  );

  const [deleteCourse, { isSuccess: isDeleteSuccess, error: isDeleteError }] =
    useDeleteCourseMutation();

  useEffect(() => {
    if (isDeleteSuccess) {
      setConfirm(false);
      refetch();
      toast.success("User deleted Successfully");
    }
  }, [isDeleteSuccess, isDeleteError, refetch]);

  if (isError) return <p className="errmsg">{error?.data?.message}</p>;

  const handleDelete = async () => {
    const id = userId;
    await deleteCourse(id);
  };

  return (
    <>
      {isLoading ? (
        <Loader />
      ) : (
        <div className="relative overflow-x-scroll overscroll-x-contain shadow-md sm:rounded-lg w-[94%] ml-[60px] mt-14 p-3">
          <table className="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400">
            <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
              <tr>
                <th scope="col" className="p-4">
                  <div className="flex items-center">
                    <input
                      id="checkbox-all-search"
                      type="checkbox"
                      className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 dark:focus:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600"
                    />
                    <label htmlFor="" className="sr-only">
                      checkbox
                    </label>
                  </div>
                </th>
                <th scope="col" className="px-6 py-3">
                  ID
                </th>
                <th scope="col" className="px-6 py-3">
                  Title
                </th>
                <th scope="col" className="px-6 py-3">
                  Ratings
                </th>
                <th scope="col" className="px-6 py-3">
                  Purchased
                </th>
                <th scope="col" className="px-6 py-3">
                  Created_At
                </th>

                <th scope="col" className="px-6 py-3 whitespace-nowrap">
                  Edith Course
                </th>

                <th scope="col" className="px-6 py-3">
                  Delete
                </th>
              </tr>
            </thead>
            <tbody>
              {data &&
                data.course.map((item, index) => (
                  <tr
                    className="bg-white border-b dark:bg-gray-800 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-600"
                    key={index}
                  >
                    <td className="w-4 p-4">
                      <div className="flex items-center">
                        <input
                          type="checkbox"
                          className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 dark:focus:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600"
                        />
                        <label htmlFor="checkbox" className="sr-only">
                          checkbox
                        </label>
                      </div>
                    </td>
                    <th
                      scope="row"
                      className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white"
                    >
                      {item._id}
                    </th>
                    <td className="px-6 py-4 whitespace-nowrap">
                      {item?.name}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      {item?.rating}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      {item?.purchase}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      {format(item.createdAt)}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <Link
                        href={`/admin/edithCourse/${item._id}`}
                        className="font-medium text-blue-600 dark:text-blue-500 hover:underline"
                      >
                        <AiFillEdit size={20} />
                      </Link>
                    </td>
                    <td className="flex items-center px-6 py-4">
                      <button
                        onClick={() => {
                          setConfirm(true);
                          setUserId(item?._id);
                        }}
                        className="font-medium text-red-600 dark:text-red-500 hover:underline ms-3 cursor-pointer"
                      >
                        <AiOutlineDelete size={20} />
                      </button>
                    </td>
                  </tr>
                ))}
            </tbody>
          </table>
          {confirm && (
            <div
              className={`fixed bg-white dark:bg-slate-900 rounded-[8px] shadow flex flex-col justify-center items-center transition-colors z-[999999] outline-none top-[50%] left-[50%] -translate-x-1/2 -translate-y-1/2 w-[420px] p-6 ${
                confirm ? "scale-100 opacity-100" : "scale-125 opacity-0"
              }`}
            >
              <h1
                className={`text-[25px] text-black dark:text-white font-[500] font-Poppins text-center py-2`}
              >
                Are you sure you want to delete this user
              </h1>
              <div className="flex w-full items-center justify-between mb-6 mt-4">
                <div
                  className={`text-white bg-gradient-to-r cursor-pointer from-blue-500 via-blue-600 to-blue-700 hover:bg-gradient-to-br focus:ring-4 focus:outline-none focus:ring-blue-300 dark:focus:ring-blue-800 shadow-lg shadow-blue-500/50 dark:shadow-lg dark:shadow-blue-800/80 font-medium rounded-lg text-sm px-7 py-2.5 text-center me-2 mb-2`}
                  onClick={() => setConfirm(!confirm)}
                >
                  Cancel
                </div>
                <button
                  className={`text-red-700 hover:text-white border border-red-700 hover:bg-red-800 focus:ring-4 focus:outline-none focus:ring-red-300 font-medium rounded-lg text-sm px-7 py-2.5 text-center me-2 mb-2 dark:border-red-500 dark:text-red-500 dark:hover:text-white dark:hover:bg-red-600 dark:focus:ring-red-900`}
                  onClick={handleDelete}
                >
                  Delete
                </button>
              </div>
            </div>
          )}
        </div>
      )}
    </>
  );
}
