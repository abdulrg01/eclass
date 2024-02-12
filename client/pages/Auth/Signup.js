import { useFormik, Formik, ErrorMessage, Form, Field } from "formik";
import * as Yup from "yup";
import { useDispatch } from "react-redux";
import {
  AiOutlineEye,
  AiOutlineEyeInvisible,
  AiFillGithub,
} from "react-icons/ai";
import { FcGoogle } from "react-icons/fc";
import { useEffect, useState } from "react";
import { styles } from "../../style";
import { useSignupMutation } from "../../redux/auth/authApi";
import toast from "react-hot-toast";
import { setCredentials } from "../../redux/auth/authSlice";
import Loader from "../component/Loader";
import { signIn } from "next-auth/react";

export default function Signup({ setRoute }) {
  const [email, setEmail] = useState("");
  const [name, setName] = useState("");
  const [password, setPassword] = useState("");
  const [show, setShow] = useState(false);
  const dispatch = useDispatch();

  const [signup, { data, error, isSuccess, isLoading }] = useSignupMutation();

  const handleEmailInput = (e) => setEmail(e.target.value);
  const handleNameInput = (e) => setName(e.target.value);
  const handlePwdInput = (e) => setPassword(e.target.value);

  useEffect(() => {
    if (isSuccess) {
      const message = data?.message || "Registration successful";
      toast.success(message);
      setRoute("verification");
    }
    if (error) {
      if ("data" in error) {
        const errorData = error;
        toast.error(errorData.data.message);
      }
    }
  }, [isSuccess, error]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const { token } = await signup({ name, email, password }).unwrap();
      dispatch(setCredentials({ token }));
    } catch (err) {
      console.log(error);
    }
  };

  return (
    <>
      {isLoading ? (
        <Loader />
      ) : (
        <div className="">
          <div className="w-full">
            <h1 className={`${styles.title}`}>Join to ELearning </h1>
            <form onSubmit={handleSubmit}>
              <div className="mb-3">
                <label
                  htmlFor="email"
                  className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                >
                  Enter your Name
                </label>
                <input
                  type="text"
                  onChange={handleNameInput}
                  value={name}
                  name="name"
                  id="name"
                  className={`${
                    error && "border-red-500"
                  } bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500`}
                  placeholder="adam"
                  required
                />
                {error && <span className="text-red-500 pt-2 block"></span>}
              </div>
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
                className={`${
                  error && "border-red-500"
                } bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500`}
                placeholder="Loginmail@gmail.com"
                required
              />
              {error && <span className="text-red-500 pt-2 block"></span>}
              <div className="w-full mt-5 relative mb-1">
                <label
                  htmlFor="password"
                  className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                >
                  Enter your Password
                </label>
                <input
                  type={!show ? "password" : "text"}
                  name="password"
                  value={password}
                  onChange={handlePwdInput}
                  id="password"
                  placeholder="••••••••"
                  className={`${
                    error && "border-red-500"
                  } bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500`}
                />
                {!show ? (
                  <AiOutlineEyeInvisible
                    className="absolute bottom-3 right-2 z-1 cursor-pointer"
                    size={20}
                    onClick={() => setShow(true)}
                  />
                ) : (
                  <AiOutlineEye
                    className="absolute bottom-3 right-2 z-1 cursor-pointer"
                    size={20}
                    onClick={() => setShow(false)}
                  />
                )}
              </div>
              {error && <span className="text-red-500 pt-2 block"></span>}
              <div className=" w-full mt-5">
                <input
                  type="submit"
                  value="Sign up"
                  className={styles.button}
                />
              </div>
              <h5 className=" mt-4 text-center pt-4 font-Poppins text-[14px] text-black dark:text-white">
                Or Join with
              </h5>
              <div className="flex items-center justify-center my-2">
                <FcGoogle
                  size={30}
                  className=" cursor-pointer mr-2"
                  onClick={() => signIn("google")}
                />
                <AiFillGithub
                  size={30}
                  className=" cursor-pointer mr-2"
                  onClick={() => signIn("github")}
                />
              </div>
              <h5 className=" text-center pt-4 font-Poppins text-[14px]">
                Already have an account?{" "}
                <span
                  className="text-[#2190ff] pt-1 cursor-pointer"
                  onClick={() => setRoute("Login")}
                >
                  Sign in
                </span>
              </h5>
              <br />
            </form>
          </div>
        </div>
      )}
    </>
  );
}
