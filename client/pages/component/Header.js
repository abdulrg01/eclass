import Link from "next/link";
import React, { useEffect, useState } from "react";
import NavItems from "../utils/NavItems";
import ThemeSwitcher from "../utils/ThemeSwitcher";
import { HiOutlineMenuAlt3 } from "react-icons/hi";
import { FaHome } from "react-icons/fa";
import { FcAbout } from "react-icons/fc";
import { MdPolicy } from "react-icons/md";
import Login from "../Auth/Login";
import CustomModel from "../utils/CustomModel";
import Signup from "../Auth/Signup";
import Verification from "../Auth/Verification";
import { useDispatch } from "react-redux";
import { setCredentials, setUser } from "../../redux/auth/authSlice";
import {
  useRefreshMutation,
  useSocialAuthMutation,
} from "../../redux/auth/authApi";
import { useSession } from "next-auth/react";
import { RxAvatar } from "react-icons/rx";
import Loader from "./Loader";

export default function Header({ open, setOpen, activeItem, route, setRoute }) {
  const [active, setActive] = useState(false);
  const dispatch = useDispatch();
  const [openSidebar, setOpenSidebar] = useState(false);
  const [socialAuth, { socialAuthLoading }] = useSocialAuthMutation();
  const { data: session } = useSession();
  const [refresh, { data, isLoading }] = useRefreshMutation();
  const user = data?.user;
  const token = data?.token;

  if (typeof window !== "undefined") {
    window.addEventListener("scroll", () => {
      if (window.scrollY > 80) {
        setActive(true);
      } else {
        setActive(false);
      }
    });
  }

  useEffect(() => {
    const verifyRefreshToken = async () => {
      try {
        //const response =
        await refresh();
        //const { accessToken } = response.data
      } catch (err) {
        console.error(err);
      }
    };

    if (!token || !user) verifyRefreshToken();
  }, []);

  useEffect(() => {
    if (data) {
      dispatch(setUser({ user }));
      dispatch(setCredentials({ token }));
    }
  }, [data]);

  useEffect(() => {
    if (session) {
      try {
        const { user, token } = socialAuth({
          email: session?.user?.email,
          name: session?.user?.name,
          avatar: session?.user?.image,
        });

        dispatch(setUser({ user }));
        dispatch(setCredentials({ token }));
      } catch (error) {
        console.error("Social authentication error:", error);
      }
    }
  }, [session]);

  return (
    <>
      {isLoading && socialAuthLoading ? (
        <Loader />
      ) : (
        <div className="w-full relative h-[80px]">
          <div
            className={`${
              active
                ? "dark:bg-opacity-50 bg-gray-100 dark:bg-gradient-to-b dark:from-gray-900 dark:to-black fixed top-0 left-0 w-full h-[80px] z-[80] border-b dark:border-[#ffffff1c] shadow-xl transition duration-500"
                : "w-full bg-white dark:bg-gray-900 border-b dark:border-[#ffffff1c] h-[80px] z-[80] dark:shadow"
            }`}
          >
            <div className="max-w-screen-xl mx-auto py-2 h-full">
              <div className="w-full h-[80px] flex item-center justify-between p-3">
                <div>
                  <Link
                    href={"/"}
                    className={`font-[700] text-gray-700 text-2xl text-[18px] dark:text-white`}
                  >
                    Elearning
                  </Link>
                </div>
                <div className="flex items-center">
                  <NavItems activeItem={activeItem} />
                  <ThemeSwitcher />
                  {/* ONLY FOR MOBILE */}
                  <div className="">
                    <HiOutlineMenuAlt3
                      size={25}
                      className="cursor-pointer inline-flex items-center p-2 w-10 h-10 justify-center text-sm text-gray-500 rounded-lg md:hidden hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-gray-200 dark:text-gray-400 dark:hover:bg-gray-700 dark:focus:ring-gray-600"
                      onClick={() => setOpenSidebar((prev) => !prev)}
                    />
                  </div>
                  {token ? (
                    <Link href="/profile" className="ml-3">
                      <img
                        className="w-[30px] h-[30px] rounded-full cursor-pointer"
                        src={user ? user?.avatar?.url : "/userIcon.png"}
                        alt="profile"
                        style={{
                          border:
                            activeItem === 5 ? "2px solid #37a39a" : "none",
                        }}
                      />
                    </Link>
                  ) : (
                    <RxAvatar
                      size={25}
                      className="cursor-pointer text-gray-500 dark:text-gray-400 m-2 w-full md:block md:w-auto"
                      onClick={() => setOpen(true)}
                    />
                  )}
                </div>
              </div>
            </div>

            {/* MOBILE SIDEBAR */}
            {openSidebar && (
              <div className="fixed w-full h-screen top-0 left-0 z-[99999] dark:bg-[unset] bg-[#856a6a24]">
                <div className="w-[70%] md:w-[30%] fixed z-[999999999] h-screen bg-white dark:bg-slate-900 dark:bg-opacity-90 top-0 right-0">
                  <h5
                    id="drawer-navigation-label"
                    className="text-base font-semibold text-white uppercase ml-5 my-5"
                  >
                    Elearning
                  </h5>
                  <button
                    type="button"
                    data-drawer-hide="drawer-navigation"
                    aria-controls="drawer-navigation"
                    className="text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm p-1.5 absolute top-2.5 end-2.5 inline-flex items-center dark:hover:bg-gray-600 dark:hover:text-white"
                    onClick={() => setOpenSidebar((prev) => !prev)}
                  >
                    <svg
                      aria-hidden="true"
                      className="w-5 h-5"
                      fill="currentColor"
                      viewBox="0 0 20 20"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path
                        fillRule="evenodd"
                        d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z"
                        clipRule="evenodd"
                      ></path>
                    </svg>
                    <span className="sr-only">Close menu</span>
                  </button>
                  <div className="py-4 overflow-y-auto">
                    <ul className="space-y-2 font-medium">
                      <li>
                        <Link
                          href="#"
                          className="flex items-center p-2 text-gray-900 rounded-lg dark:text-white hover:bg-gray-100 dark:hover:bg-gray-700 group"
                        >
                          <FaHome
                            className="w-5 h-5 text-gray-500 transition duration-75 dark:text-gray-400 group-hover:text-gray-900 dark:group-hover:text-white"
                            size={30}
                          />
                          <span href="/" className="ms-3">
                            Home
                          </span>
                        </Link>
                      </li>
                      <li>
                        <Link
                          href="#"
                          className="flex items-center p-2 text-gray-900 rounded-lg dark:text-white hover:bg-gray-100 dark:hover:bg-gray-700 group"
                        >
                          <svg
                            className="flex-shrink-0 w-5 h-5 text-gray-500 transition duration-75 dark:text-gray-400 group-hover:text-gray-900 dark:group-hover:text-white"
                            aria-hidden="true"
                            xmlns="http://www.w3.org/2000/svg"
                            fill="currentColor"
                            viewBox="0 0 18 18"
                          >
                            <path d="M6.143 0H1.857A1.857 1.857 0 0 0 0 1.857v4.286C0 7.169.831 8 1.857 8h4.286A1.857 1.857 0 0 0 8 6.143V1.857A1.857 1.857 0 0 0 6.143 0Zm10 0h-4.286A1.857 1.857 0 0 0 10 1.857v4.286C10 7.169 10.831 8 11.857 8h4.286A1.857 1.857 0 0 0 18 6.143V1.857A1.857 1.857 0 0 0 16.143 0Zm-10 10H1.857A1.857 1.857 0 0 0 0 11.857v4.286C0 17.169.831 18 1.857 18h4.286A1.857 1.857 0 0 0 8 16.143v-4.286A1.857 1.857 0 0 0 6.143 10Zm10 0h-4.286A1.857 1.857 0 0 0 10 11.857v4.286c0 1.026.831 1.857 1.857 1.857h4.286A1.857 1.857 0 0 0 18 16.143v-4.286A1.857 1.857 0 0 0 16.143 10Z" />
                          </svg>
                          <span
                            href="courses"
                            className="flex-1 ms-3 whitespace-nowrap"
                          >
                            Courses
                          </span>
                          <span className="inline-flex items-center justify-center px-2 ms-3 text-sm font-medium text-gray-800 bg-gray-100 rounded-full dark:bg-gray-700 dark:text-gray-300">
                            Pro
                          </span>
                        </Link>
                      </li>
                      <li>
                        <Link
                          href="#"
                          className="flex items-center p-2 text-gray-900 rounded-lg dark:text-white hover:bg-gray-100 dark:hover:bg-gray-700 group"
                        >
                          <svg
                            className="flex-shrink-0 w-5 h-5 text-gray-500 transition duration-75 dark:text-gray-400 group-hover:text-gray-900 dark:group-hover:text-white"
                            aria-hidden="true"
                            xmlns="http://www.w3.org/2000/svg"
                            fill="currentColor"
                            viewBox="0 0 20 20"
                          >
                            <path d="m17.418 3.623-.018-.008a6.713 6.713 0 0 0-2.4-.569V2h1a1 1 0 1 0 0-2h-2a1 1 0 0 0-1 1v2H9.89A6.977 6.977 0 0 1 12 8v5h-2V8A5 5 0 1 0 0 8v6a1 1 0 0 0 1 1h8v4a1 1 0 0 0 1 1h2a1 1 0 0 0 1-1v-4h6a1 1 0 0 0 1-1V8a5 5 0 0 0-2.582-4.377ZM6 12H4a1 1 0 0 1 0-2h2a1 1 0 0 1 0 2Z" />
                          </svg>
                          <span
                            href="/admin/invoices"
                            className="flex-1 ms-3 whitespace-nowrap"
                          >
                            Inbox
                          </span>
                          <span className="inline-flex items-center justify-center w-3 h-3 p-3 ms-3 text-sm font-medium text-blue-800 bg-blue-100 rounded-full dark:bg-blue-900 dark:text-blue-300">
                            3
                          </span>
                        </Link>
                      </li>
                      <li>
                        <Link
                          href="#"
                          className="flex items-center p-2 text-gray-900 rounded-lg dark:text-white hover:bg-gray-100 dark:hover:bg-gray-700 group"
                        >
                          <FcAbout
                            className="flex-shrink-0 w-5 h-5 text-gray-500 transition duration-75 dark:text-gray-400 group-hover:text-gray-900 dark:group-hover:text-white"
                            size={30}
                          />
                          <span
                            href="/about"
                            className="flex-1 ms-3 whitespace-nowrap"
                          >
                            About
                          </span>
                        </Link>
                      </li>
                      <li>
                        <Link
                          href="#"
                          className="flex items-center p-2 text-gray-900 rounded-lg dark:text-white hover:bg-gray-100 dark:hover:bg-gray-700 group"
                        >
                          <MdPolicy
                            size={30}
                            className="flex-shrink-0 w-5 h-5 text-gray-500 transition duration-75 dark:text-gray-400 group-hover:text-gray-900 dark:group-hover:text-white"
                            fill="currentColor"
                          />
                          <span
                            href="/policy"
                            className="flex-1 ms-3 whitespace-nowrap"
                          >
                            Policy
                          </span>
                        </Link>
                      </li>
                    </ul>
                  </div>
                  <br />
                  <p className="text-[16px] ml-2 font-medium text-black dark:text-white">
                    copyright @2023 ELearning
                  </p>
                </div>
              </div>
            )}
          </div>
          {route === "Login" && (
            <>
              {open && (
                <CustomModel
                  open={open}
                  setOpen={setOpen}
                  activeItem={activeItem}
                  setRoute={setRoute}
                  Component={Login}
                />
              )}
            </>
          )}

          {route === "Sign-up" && (
            <>
              {open && (
                <CustomModel
                  open={open}
                  setOpen={setOpen}
                  activeItem={activeItem}
                  setRoute={setRoute}
                  Component={Signup}
                />
              )}
            </>
          )}

          {/* verification */}
          {route === "verification" && (
            <>
              {open && (
                <CustomModel
                  open={open}
                  setOpen={setOpen}
                  activeItem={activeItem}
                  setRoute={setRoute}
                  Component={Verification}
                />
              )}
            </>
          )}
        </div>
      )}
    </>
  );
}
