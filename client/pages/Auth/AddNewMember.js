import { useState } from "react";

export default function AddNewMember({ open, setOpen, }) {
  const [email, setEmail] = useState("");
  const [role, setRole] = useState("");

  const handleEmailInput = (e) => setEmail(e.target.value);
  const handleRoleInput = (e) => setRole(e.target.value);

  const handleSubmit = () => {};


  return (
    <div>
      <h1 className="text-[25px] text-black dark:text-white font-[500] font-Poppins text-center py-2">Add New member</h1>
      <form onSubmit={handleSubmit}>
        <div className="mb-3">
          <label
            htmlFor="email"
            className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
          >
            Enter your Email
          </label>
          <input
            type="email"
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
        <label
          htmlFor="role"
          className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
        >
          Enter your role
        </label>
        <input
          type="role"
          onChange={handleRoleInput}
          value={role}
          name="role"
          id="role"
          className={`bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500`}
          placeholder="Admin"
          required
        />
      </form>
    </div>
  );
}
