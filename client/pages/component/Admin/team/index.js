import { AiOutlineDelete } from "react-icons/ai";
import Loader from "../../Loader";
import { format } from "timeago.js";
import {
  useGetUsersQuery,
  useUpdateUserRoleMutation,
} from "../../../../redux/user/userApi";
import { MdEmail } from "react-icons/md";
import { styles } from "../../../../style";
import { useEffect, useState } from "react";
import toast from "react-hot-toast";
import { useDeleteUserMutation } from "../../../../redux/user/userApi";

export default function Team() {
  const [open, setOpen] = useState(false);
  const [confirm, setConfirm] = useState(false);
  const [email, setEmail] = useState("");
  const [role, setRole] = useState("");
  const [userId, setUserId] = useState("");

  const { data, isLoading, refetch } = useGetUsersQuery(
    {},
    { refetchOnMountOrArgChange: true }
  );

  const [updateUserRole, { isSuccess, error }] = useUpdateUserRoleMutation();

  const [deleteUser, { isSuccess: isDeleteSuccess, error: isDeleteError }] =
    useDeleteUserMutation();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await updateUserRole({ email, role });
    } catch (err) {
      console.log(err);
    }
  };

  const handleEmailInput = (e) => setEmail(e.target.value);
  const handleRoleInput = (e) => setRole(e.target.value);

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

  useEffect(() => {
    if (isSuccess) {
      setOpen(false);
      refetch();
      if (role === "Admin") {
        toast.success("New Member added Successfully");
      }
    }
    if (error) {
      if ("data" in error) {
        const errorData = error;
        toast.error(errorData.data.message);
      }
    }
  }, [isSuccess, error, refetch]);

  const newData = data && data.filter((item) => item.role === "Admin");

  const handleDelete = async () => {
    const id = userId;
    await deleteUser(id);
  };

  return (
    <>
      {isLoading ? (
        <Loader />
      ) : (
        <div className="relative overflow-x-auto shadow-md sm:rounded-lg mt-14 p-2 mx-auto">
          <div className="w-full flex justify-start mb-[20px]">
            <button
              className={`${styles.button} !w-[200px] !rounded-md dark:bg-[rgb(22, 19, 200)] !h-[35px]`}
              onClick={() => setOpen(true)}
            >
              Add New Member
            </button>
          </div>
          <table className="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400">
            <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
              <tr>
                <th scope="col" className="p-4">
                  <div className="flex items-center">
                    <input
                      type="checkbox"
                      className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 dark:focus:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600"
                    />
                    <label htmlFor="checkbox" className="sr-only">
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
            <tbody>
              {newData &&
                newData.map((item, index) => (
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
          {open && (
            <>
              <div
                className={`fixed bg-white dark:bg-slate-900 rounded-[8px] shadow flex justify-center items-center transition-colors z-[999999] outline-none top-[50%] left-[50%] -translate-x-1/2 -translate-y-1/2 w-[420px] p-6 ${
                  open ? "scale-100 opacity-100" : "scale-125 opacity-0"
                }`}
              >
                {/* scale for the zoom effect opacity for the fade effect */}
                <div className={`rounded-xl shadow transition-all w-[350px]`}>
                  <h1 className={`${styles.title}`}>Add New member</h1>
                  <form onSubmit={handleSubmit}>
                    <div className="mb-3">
                      <label
                        htmlFor="email"
                        className="block mb-2 text-sm font-medium"
                      >
                        Enter Email
                      </label>
                      <input
                        type="text"
                        onChange={handleEmailInput}
                        value={email}
                        name="email"
                        id="email"
                        className={`bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500`}
                        placeholder="adam@gmail.com"
                        required
                      />
                      {/* {error && <span className="text-red-500 pt-2 block"></span>} */}
                    </div>
                    <div className="mb-5">
                      <label
                        htmlFor="role"
                        className="block mb-2 text-sm font-medium"
                      >
                        Role
                      </label>
                      <input
                        type="text"
                        onChange={handleRoleInput}
                        value={role}
                        name="role"
                        id="role"
                        className={`bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500`}
                        placeholder="Admin"
                        required
                      />
                    </div>
                    <button
                      className={`text-white bg-gradient-to-r from-blue-500 via-blue-600 to-blue-700 hover:bg-gradient-to-br focus:ring-4 focus:outline-none focus:ring-blue-300 dark:focus:ring-blue-800 shadow-lg shadow-blue-500/50 dark:shadow-lg dark:shadow-blue-800/80 font-medium rounded-lg text-sm w-full py-2.5 text-center me-2 mb-2`}
                    >
                      Add New Member
                    </button>
                  </form>
                </div>
              </div>
            </>
          )}
          {confirm && (
            <div
              className={`fixed bg-white dark:bg-slate-900 rounded-[8px] shadow flex flex-col justify-center items-center transition-colors z-[999999] outline-none top-[50%] left-[50%] -translate-x-1/2 -translate-y-1/2 w-[420px] p-6 ${
                confirm ? "scale-100 opacity-100" : "scale-125 opacity-0"
              }`}
            >
              <h1 className={`${styles.title}`}>
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
