import { AiOutlineDelete } from "react-icons/ai";
import Loader from "../../Loader";
import { format } from "timeago.js";
import { MdEmail } from "react-icons/md";
import { useEffect, useState } from "react";
import {
  useDeleteUserMutation,
  useGetUsersQuery,
} from "../../../../redux/user/userApi";
import toast from "react-hot-toast";

export default function Users() {
  const [confirm, setConfirm] = useState(false);
  const [userId, setUserId] = useState("");

  const { data, isLoading, refetch, isError, error } = useGetUsersQuery(
    {},
    { refetchOnMountOrArgChange: true }
  );

  const [deleteUser, { isSuccess: isDeleteSuccess, error: isDeleteError }] =
    useDeleteUserMutation();

  useEffect(() => {
    if (isDeleteSuccess) {
      setConfirm(false);
      refetch();
      toast.success("User deleted Successfully");
    }
    if (isDeleteError) {
      if ("data" in error) {
        const errorData = error;
        toast.error(errorData.data.message);
      }
    }
  }, [isDeleteSuccess, isDeleteError, refetch]);

  if (isError)
    return (
      <>
        <p className="errmsg">{error?.data?.message}</p>
      </>
    );

  const handleDelete = async () => {
    const id = userId;
    await deleteUser(id);
  };

  return (
    <>
      {isLoading ? (
        <Loader />
      ) : (
        <div className="relative overflow-x-scroll overscroll-x-contain shadow-md sm:rounded-lg mt-14 p-3">
          <table className="w-full text-sm text-left rtl:text-right bg-gray-100 dark:text-gray-400">
            <thead className="text-xs text-gray-700 uppercase bg-gray-200 dark:bg-gray-700 dark:text-gray-400">
              <tr>
                <th scope="col" className="p-4">
                  <div className="flex items-center">
                    <input
                      id="checkbox-all-search"
                      type="checkbox"
                      className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 dark:focus:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600"
                    />
                    <label for="checkbox-all-search" className="sr-only">
                      checkbox
                    </label>
                  </div>
                </th>
                <th scope="col" className="px-6 py-3">
                  ID
                </th>
                <th scope="col" className="px-6 py-3">
                  Name
                </th>
                <th scope="col" className="px-6 py-3">
                  Email
                </th>
                <th scope="col" className="px-6 py-3">
                  Role
                </th>
                <th scope="col" className="px-6 py-3">
                  Courses
                </th>
                <th scope="col" className="px-6 py-3">
                  Created_At
                </th>
                <th scope="col" className="px-6 py-3">
                  Email
                </th>
                <th scope="col" className="px-6 py-3">
                  Delete
                </th>
              </tr>
            </thead>
            <tbody className="bg-gray-100">
              {data &&
                data.map((item) => (
                  <tr className="bg-gray-100 border-b dark:bg-gray-800 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-600">
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
                      {item?.email}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      {item?.role}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      {item?.courses.length}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      {format(item.createdAt)}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <a
                        href={`mailto:${item?.email}`}
                        className="font-medium text-blue-600 dark:text-blue-500 hover:underline ms-3 cursor-pointer flex items-center"
                      >
                        <MdEmail size={20} />
                      </a>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <button
                        onClick={() => {
                          setConfirm(true);
                          setUserId(item?._id);
                        }}
                        className="font-medium text-red-600 dark:text-red-500 hover:underline ms-3 cursor-pointer flex items-center"
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
                  className={`text-white bg-gradient-to-r from-blue-500 via-blue-600 to-blue-700 hover:bg-gradient-to-br focus:ring-4 focus:outline-none focus:ring-blue-300 dark:focus:ring-blue-800 shadow-lg shadow-blue-500/50 dark:shadow-lg dark:shadow-blue-800/80 font-medium rounded-lg text-sm px-7 py-2.5 text-center me-2 mb-2 cursor-pointer`}
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
