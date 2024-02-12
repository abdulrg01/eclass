import { useUpdatePasswordMutation } from "../../../redux/user/userApi";
import React, { useEffect, useState } from "react";
import toast from "react-hot-toast";

export default function ChangePassword() {
  const [oldPassword, setOldPassword] = useState();
  const [newPassword, setNewPassword] = useState();
  const [confirmPassword, setConfirmPassword] = useState();
  const [updatePassword, { isSuccess, error }] = useUpdatePasswordMutation();

  const passwordChangeHandler = async (e) => {
    e.preventDefault();
    if (newPassword !== confirmPassword) {
      toast.error("Password do not match");
    } else {
      await updatePassword({ oldPassword, newPassword });
    }
  };

  useEffect(() => {
    if (isSuccess) {
      toast.success("Password Change Successfully");
      setConfirmPassword("");
      setNewPassword("");
      setOldPassword("");
    }
    if (error) {
      if ("data" in error) {
        const errorData = error;
        toast.error(errorData.data.message);
      }
    }
  }, [isSuccess, error]);

  return (
    <div className="w-full pl-6 md:px-10">
      <form
        className="md:w-[80%] m-auto block"
        onSubmit={passwordChangeHandler}
      >
        <h1 className="dark:text-white text-black font-bold text-2xl text-center mb-5">
          Change Password
        </h1>
        <div className="mb-6">
          <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
            Enter your old Password
          </label>
          <input
            type="password"
            id="password"
            value={oldPassword}
            onChange={(e) => setOldPassword(e.target.value)}
            className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
            required
          />
        </div>
        <div className="mb-6">
          <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
            Enter your new Password
          </label>
          <input
            type="password"
            id="password"
            className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
            value={newPassword}
            onChange={(e) => setNewPassword(e.target.value)}
            required
          />
        </div>
        <div className="mb-6">
          <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
            Confirm your Password
          </label>
          <input
            type="password"
            id="password"
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
            className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
            required
          />
          <div
            data-popover
            id="popover-password"
            role="tooltip"
            className="absolute z-10 invisible inline-block text-sm text-gray-500 transition-opacity duration-300 bg-white border border-gray-200 rounded-lg shadow-sm opacity-0 w-72 dark:bg-gray-800 dark:border-gray-600 dark:text-gray-400"
          >
            <div className="p-3 space-y-2">
              <h3 className="font-semibold text-gray-900 dark:text-white">
                Must have at least 6 characters
              </h3>
              <div className="grid grid-cols-4 gap-2">
                <div className="h-1 bg-orange-300 dark:bg-orange-400"></div>
                <div className="h-1 bg-orange-300 dark:bg-orange-400"></div>
                <div className="h-1 bg-gray-200 dark:bg-gray-600"></div>
                <div className="h-1 bg-gray-200 dark:bg-gray-600"></div>
              </div>
              <p>It’s better to have:</p>
              <ul>
                <li className="flex items-center mb-1">
                  <svg
                    className="w-3.5 h-3.5 me-2 text-green-400 dark:text-green-500"
                    aria-hidden="true"
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 16 12"
                  >
                    <path
                      stroke="currentColor"
                      stroke-linecap="round"
                      stroke-linejoin="round"
                      stroke-width="2"
                      d="M1 5.917 5.724 10.5 15 1.5"
                    />
                  </svg>
                  Upper & lower case letters
                </li>
                <li className="flex items-center mb-1">
                  <svg
                    className="w-3 h-3 me-2.5 text-gray-300 dark:text-gray-400"
                    aria-hidden="true"
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 14 14"
                  >
                    <path
                      stroke="currentColor"
                      stroke-linecap="round"
                      stroke-linejoin="round"
                      stroke-width="2"
                      d="m1 1 6 6m0 0 6 6M7 7l6-6M7 7l-6 6"
                    />
                  </svg>
                  A symbol (#$&)
                </li>
                <li className="flex items-center">
                  <svg
                    className="w-3 h-3 me-2.5 text-gray-300 dark:text-gray-400"
                    aria-hidden="true"
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 14 14"
                  >
                    <path
                      stroke="currentColor"
                      stroke-linecap="round"
                      stroke-linejoin="round"
                      stroke-width="2"
                      d="m1 1 6 6m0 0 6 6M7 7l6-6M7 7l-6 6"
                    />
                  </svg>
                  A longer password (min. 12 chars.)
                </li>
              </ul>
            </div>
            <div data-popper-arrow></div>
          </div>
        </div>
        <button
          type="submit"
          className="text-black dark:text-white bg-transparent border-indigo-800 border-[1px] hover:bg-blue-800 hover:text-white focus:ring-4 focus:outline-none focus:bg-blue-800 focus:text-white font-medium rounded-lg text-sm w-full px-5 py-2.5 text-center"
        >
          Update
        </button>
      </form>
    </div>
  );
}
