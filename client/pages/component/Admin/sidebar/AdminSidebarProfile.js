import { RxAvatar } from "react-icons/rx";
import { useEffect } from "react";
import { PiUsersThreeDuotone } from "react-icons/pi";
import { IoMdAddCircle } from "react-icons/io";
import { MdLiveTv } from "react-icons/md";
import { GiNinjaHeroicStance } from "react-icons/gi";
import { FaQuoteLeft } from "react-icons/fa6";
import { BiLogOut, BiSolidCategory } from "react-icons/bi";
import { SiSimpleanalytics } from "react-icons/si";
import { SiCodersrank } from "react-icons/si";
import { usePathname } from "next/navigation";
import Link from "next/link";
import { useDispatch, useSelector } from "react-redux";
import { selectCurrentUser, setIsOpen } from "../../../../redux/auth/authSlice";
import { HiHome } from "react-icons/hi";
import useAuth from "../../../hook/useAuth";
import DashboardHeader from "../../DashboardHeader";
import { useSendLogoutMutation } from "../../../../redux/auth/authApi";
import { useRouter } from "next/router";
import { signOut, useSession } from "next-auth/react";
import { GiHamburgerMenu } from "react-icons/gi";

export default function AdminSidebarProfile() {
  const [sendLogout, { isSuccess }] = useSendLogoutMutation();
  const { data: session } = useSession();
  const pathname = usePathname();
  const { name, role } = useAuth();
  const user = useSelector(selectCurrentUser);
  const dispatch = useDispatch();
  const router = useRouter();
  const isOpen = useSelector((state) => state.auth.isOpen);

  useEffect(() => {
    if (isSuccess) router.replace("/");
  }, [isSuccess, router]);

  const handleSignOut = () => {
    sendLogout();
    if (session) {
      signOut();
    }
  };

  return (
    <>
      <div
        className={`${
          isOpen ? "w-[4.2rem]" : "w-[16rem]"
        } h-screen sticky top-0 left-0 z-[9999999999] dark:bg-slate-900 bg-opacity-90 bg-gray-100 border dark:border-[#ffffff1d] border-[rgba(248,211,211,0.05)]`}
      >
        <div className="flex flex-col items-start justify-start h-full px-3 py-4 overflow-y-auto">
          <div
            className={`${
              isOpen ? "w-full flex items-center justify-center" : ""
            } rounded-full mb-5 flex items-center justify-center gap-[133px]`}
          >
            <Link href="/" className={`${isOpen ? "hidden" : ""}`}>
              ELearning
            </Link>
            <GiHamburgerMenu
              className="cursor-pointer"
              onClick={() => dispatch(setIsOpen({}))}
            />
          </div>
          {/* profile */}
          <Link
            href="/profile"
            className="flex items-center flex-col mb-[1rem] rounded-3xl w-full"
          >
            <img
              className="w-[40px] h-[40px] cursor-pointer border-[3px] border-[#37a39a] rounded-full flex items-center mb-1"
              src={user ? user?.avatar.url : <RxAvatar />}
              alt="profile"
            />
            <p
              className={`${
                isOpen ? "hidden" : ""
              } text-sm font-normal text-black dark:text-white mb-1`}
            >
              {name}
            </p>
            <p
              className={`${
                isOpen ? "hidden" : ""
              } text-sm font-normal text-black dark:text-white`}
            >
              -{role}
            </p>
          </Link>

          {/* ul list */}
          <ul className="space-y-2 font-medium text-sm w-full">
            <li>
              <Link
                href="/admin"
                className={`${
                  pathname === "/admin" ? "active" : ""
                } flex items-center p-2 text-gray-900 rounded-lg dark:text-white hover:bg-gray-[rgb(22, 19, 155)] dark:hover:bg-gray-700`}
              >
                <span className=" w-5 h-5 text-gray-500 transition duration-75 dark:text-gray-400 -hover:text-gray-900 dark:-hover:text-white">
                  <HiHome className=" w-5 h-5" />
                </span>
                <span className={`${isOpen ? "hidden" : "ms-3"}`}>
                  Dashboard
                </span>
              </Link>
            </li>
            <div className={`${isOpen ? "hidden" : "ml-2"}`}>
              <h2>Data</h2>
            </div>
            <li>
              <Link
                href="/admin/users"
                className={`${
                  pathname === "/admin/users" ? "active" : ""
                } flex items-center p-2 text-gray-900 rounded-lg dark:text-white hover:bg-gray-[rgb(22, 19, 155)] dark:hover:bg-gray-700 `}
              >
                <svg
                  className=" w-4 h-4 text-gray-500 transition duration-75 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white"
                  aria-hidden="true"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="currentColor"
                  viewBox="0 0 20 18"
                >
                  <path d="M14 2a3.963 3.963 0 0 0-1.4.267 6.439 6.439 0 0 1-1.331 6.638A4 4 0 1 0 14 2Zm1 9h-1.264A6.957 6.957 0 0 1 15 15v2a2.97 2.97 0 0 1-.184 1H19a1 1 0 0 0 1-1v-1a5.006 5.006 0 0 0-5-5ZM6.5 9a4.5 4.5 0 1 0 0-9 4.5 4.5 0 0 0 0 9ZM8 10H5a5.006 5.006 0 0 0-5 5v2a1 1 0 0 0 1 1h11a1 1 0 0 0 1-1v-2a5.006 5.006 0 0 0-5-5Z" />
                </svg>
                <span
                  className={`${
                    isOpen ? "hidden" : "flex-1 ms-3 whitespace-nowrap"
                  }`}
                >
                  Users
                </span>
              </Link>
            </li>
            <li>
              <Link
                href="/admin/invoices"
                className={`${
                  pathname === "/admin/invoices" ? "active" : ""
                } flex items-center p-2 text-gray-900 rounded-lg dark:text-white hover:bg-gray-[rgb(22, 19, 155)] dark:hover:bg-gray-700 `}
              >
                <svg
                  className=" w-4 h-4 text-gray-500 transition duration-75 dark:text-gray-400 -hover:text-gray-900 dark:-hover:text-white"
                  aria-hidden="true"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="currentColor"
                  viewBox="0 0 20 20"
                >
                  <path d="m17.418 3.623-.018-.008a6.713 6.713 0 0 0-2.4-.569V2h1a1 1 0 1 0 0-2h-2a1 1 0 0 0-1 1v2H9.89A6.977 6.977 0 0 1 12 8v5h-2V8A5 5 0 1 0 0 8v6a1 1 0 0 0 1 1h8v4a1 1 0 0 0 1 1h2a1 1 0 0 0 1-1v-4h6a1 1 0 0 0 1-1V8a5 5 0 0 0-2.582-4.377ZM6 12H4a1 1 0 0 1 0-2h2a1 1 0 0 1 0 2Z" />
                </svg>
                <span
                  className={`${
                    isOpen ? "hidden" : "flex-1 ms-3 whitespace-nowrap"
                  }`}
                >
                  Inbox
                </span>
                <span
                  className={`${
                    isOpen
                      ? "hidden"
                      : "inline-flex items-center justify-center w-3 h-3 p-3 ms-3 text-sm font-medium text-blue-800 bg-blue-100 rounded-full dark:bg-blue-900 dark:text-blue-300"
                  }`}
                >
                  3
                </span>
              </Link>
            </li>
            <div className={`${isOpen ? "hidden" : "ml-2"}`}>
              <h2>Content</h2>
            </div>
            <li>
              <Link
                href="/admin/createCourse"
                className={`${
                  pathname === "/admin/createCourse" ? "active" : ""
                } flex items-center p-2 text-gray-900 rounded-lg dark:text-white hover:bg-gray-[rgb(22, 19, 155)] dark:hover:bg-gray-700 `}
              >
                <span className=" w-5 h-5 text-gray-500 transition duration-75 dark:text-gray-400 -hover:text-gray-900 dark:-hover:text-white">
                  <IoMdAddCircle className=" w-5 h-5" />
                </span>
                <span
                  className={`${
                    isOpen ? "hidden" : "flex-1 ms-3 whitespace-nowrap"
                  }`}
                >
                  Create Course
                </span>
              </Link>
            </li>
            <li>
              <Link
                href="/admin/courses"
                className={`${
                  pathname === "/admin/courses" ? "active" : ""
                } flex items-center p-2 text-gray-900 rounded-lg dark:text-white hover:bg-gray-[rgb(22, 19, 155)] dark:hover:bg-gray-700 `}
              >
                <span className=" w-5 h-5 text-gray-500 transition duration-75 dark:text-gray-400 -hover:text-gray-900 dark:-hover:text-white">
                  <MdLiveTv className=" w-5 h-5" />
                </span>
                <span
                  className={`${
                    isOpen ? "hidden" : "flex-1 ms-3 whitespace-nowrap"
                  }`}
                >
                  Live Course
                </span>
              </Link>
            </li>
            <div className={`${isOpen ? "hidden" : "ml-2"}`}>
              <h2>Customization</h2>
            </div>
            <li>
              <Link
                href="/admin/hero"
                className={`${
                  pathname === "/admin/hero" ? "active" : ""
                } flex items-center p-2 text-gray-900 rounded-lg dark:text-white hover:bg-gray-[rgb(22, 19, 155)] dark:hover:bg-gray-700 `}
              >
                <span className=" w-5 h-5 text-gray-500 transition duration-75 dark:text-gray-400 -hover:text-gray-900 dark:-hover:text-white">
                  <GiNinjaHeroicStance className=" w-5 h-5" />
                </span>
                <span
                  className={`${
                    isOpen ? "hidden" : "flex-1 ms-3 whitespace-nowrap"
                  }`}
                >
                  Hero
                </span>
              </Link>
            </li>
            <li>
              <Link
                href="/admin/faq"
                className={`${
                  pathname === "/admin/faq" ? "active" : ""
                } flex items-center p-2 text-gray-900 rounded-lg dark:text-white hover:bg-gray-[rgb(22, 19, 155)] dark:hover:bg-gray-700 `}
              >
                <span className=" w-5 h-5 text-gray-500 transition duration-75 dark:text-gray-400 -hover:text-gray-900 dark:-hover:text-white">
                  <FaQuoteLeft className=" w-5 h-5" />
                </span>
                <span
                  className={`${
                    isOpen ? "hidden" : "flex-1 ms-3 whitespace-nowrap"
                  }`}
                >
                  FAQ
                </span>
              </Link>
            </li>
            <li>
              <Link
                href="/admin/categories"
                className={`${
                  pathname === "/admin/categories" ? "active" : ""
                }  flex items-center p-2 text-gray-900 rounded-lg dark:text-white hover:bg-gray-[rgb(22, 19, 155)] dark:hover:bg-gray-700 `}
              >
                <span className=" w-5 h-5 text-gray-500 transition duration-75 dark:text-gray-400 -hover:text-gray-900 dark:-hover:text-white">
                  <BiSolidCategory className=" w-5 h-5" />
                </span>
                <span
                  className={`${
                    isOpen ? "hidden" : "flex-1 ms-3 whitespace-nowrap"
                  }`}
                >
                  Categories
                </span>
              </Link>
            </li>
            <div className={`${isOpen ? "hidden" : "ml-2"}`}>
              <h2>Controller</h2>
            </div>
            <li>
              <Link
                href="/admin/team"
                className={`${
                  pathname === "/admin/team" ? "active" : ""
                } flex items-center p-2 text-gray-900 rounded-lg dark:text-white hover:bg-gray-[rgb(22, 19, 155)] dark:hover:bg-gray-700 `}
              >
                <span className=" w-5 h-5 text-gray-500 transition duration-75 dark:text-gray-400 -hover:text-gray-900 dark:-hover:text-white">
                  <PiUsersThreeDuotone className=" w-5 h-5" />
                </span>
                <span
                  className={`${
                    isOpen ? "hidden" : "flex-1 ms-3 whitespace-nowrap"
                  }`}
                >
                  Manage Team
                </span>
              </Link>
            </li>
            <div className={`${isOpen ? "hidden" : "ml-2"}`}>
              <h2>Analytics</h2>
            </div>
            <li>
              <Link
                href="/admin/courseAnalytics"
                className={`${
                  pathname === "/admin/courseAnalytics" ? "active" : ""
                } flex items-center p-2 text-gray-900 rounded-lg dark:text-white hover:bg-gray-[rgb(22, 19, 155)] dark:hover:bg-gray-700 `}
              >
                <span className=" w-5 h-5 text-gray-500 transition duration-75 dark:text-gray-400 -hover:text-gray-900 dark:-hover:text-white">
                  <SiSimpleanalytics className=" w-[14px] h-[14px]" />
                </span>
                <span
                  className={`${
                    isOpen ? "hidden" : "flex-1 ms-3 whitespace-nowrap"
                  }`}
                >
                  Course Analytics
                </span>
              </Link>
            </li>
            <li>
              <Link
                href="/admin/ordersAnalytics"
                className={`${
                  pathname === "/admin/ordersAnalytics" ? "active" : ""
                } flex items-center p-2 text-gray-900 rounded-lg dark:text-white hover:bg-gray-[rgb(22, 19, 155)] dark:hover:bg-gray-700 `}
              >
                <span className=" w-5 h-5 text-gray-500 transition duration-75 dark:text-gray-400 -hover:text-gray-900 dark:-hover:text-white">
                  <SiCodersrank className=" w-4 h-4" />
                </span>
                <span
                  className={`${
                    isOpen ? "hidden" : "flex-1 ms-3 whitespace-nowrap"
                  }`}
                >
                  Orders Analytics
                </span>
              </Link>
            </li>
            <li>
              <Link
                href="/admin/userAnalytics"
                className={`${
                  pathname === "/admin/userAnalytics" ? "active" : ""
                } flex items-center p-2 text-gray-900 rounded-lg dark:text-white hover:bg-gray-[rgb(22, 19, 155)] dark:hover:bg-gray-700 `}
              >
                <span className=" w-5 h-5 text-gray-500 transition duration-75 dark:text-gray-400 -hover:text-gray-900 dark:-hover:text-white">
                  <RxAvatar className=" w-5 h-5" />
                </span>
                <span
                  className={`${
                    isOpen ? "hidden" : "flex-1 ms-3 whitespace-nowrap"
                  }`}
                >
                  Users Analytics
                </span>
              </Link>
            </li>
            <div className={`${isOpen ? "hidden" : "ml-2"}`}>
              <h2>Extra</h2>
            </div>
            <li>
              <div
                className="flex items-center p-2 text-gray-900 rounded-lg dark:text-white hover:bg-gray-[rgb(22, 19, 155)] dark:hover:bg-gray-700 "
                onClick={handleSignOut}
              >
                <span className=" w-5 h-5 text-gray-500 transition duration-75 dark:text-gray-400 -hover:text-gray-900 dark:-hover:text-white cursor-pointer">
                  <BiLogOut className=" w-6 h-6" />
                </span>
                <span
                  className={`${
                    isOpen
                      ? "hidden"
                      : "flex-1 ms-3 whitespace-nowrap cursor-pointer"
                  }`}
                >
                  Logout
                </span>
              </div>
            </li>
          </ul>
        </div>
      </div>
    </>
  );
}
