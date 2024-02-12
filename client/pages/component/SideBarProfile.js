import { useSendLogoutMutation } from "../../redux/auth/authApi";
import Link from "next/link";
import { useRouter } from "next/router";
import React, { useEffect } from "react";
import { AiOutlineLogout } from "react-icons/ai";
import { MdOutlineAdminPanelSettings } from "react-icons/md";
import { RiLockPasswordLine } from "react-icons/ri";
import { SiCoursera } from "react-icons/si";
import useAuth from "../hook/useAuth";
import { useSession, signOut } from "next-auth/react";
import Loader from "./Loader";

export default function SideBarProfile({ active, setActive, avatar }) {
  const [sendLogout, { isSuccess, isLoading }] = useSendLogoutMutation();
  const router = useRouter();
  const { data: session } = useSession();
  const { isAdmin } = useAuth();

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
      {isLoading ? (
        <Loader />
      ) : (
        <div className="w-full">
          <div
            className={`w-full flex items-center px-3 py-2 cursor-pointer ${
              active === 1 ? "dark:bg-slate-800" : " bg-transparent"
            }`}
            onClick={() => setActive(1)}
          >
            <img
              className=" md:w-[30px] md:h-[30px] w-[20px] h-[20px] cursor-pointer border-[3px] border-[#37a39a] rounded-full"
              src={avatar ? avatar : "/userIcon.png"}
              alt="avatar"
            />
            <h5 className="pl-2 md:block hidden dark:text-white text-black ">
              My Account
            </h5>
          </div>
          <div
            className={`w-full flex items-center px-3 py-4 cursor-pointer ${
              active === 2 ? "dark:bg-slate-800" : " bg-transparent"
            }`}
            onClick={() => setActive(2)}
          >
            <RiLockPasswordLine className="dark:text-white text-black" />
            <h5 className="pl-2 md:block hidden dark:text-white text-black ">
              Change Password
            </h5>
          </div>
          <div
            className={`w-full flex items-center px-3 py-4 cursor-pointer ${
              active === 3 ? "dark:bg-slate-800" : " bg-transparent"
            }`}
            onClick={() => setActive(3)}
          >
            <SiCoursera className="dark:text-white text-black" />
            <h5 className="pl-2 md:block hidden dark:text-white text-black ">
              Enroll Courses
            </h5>
          </div>
          {isAdmin && (
            <Link
              href="/admin"
              className={`w-full flex items-center px-3 py-4 cursor-pointer ${
                active === 6 ? "dark:bg-slate-800" : " bg-transparent"
              }`}
            >
              <MdOutlineAdminPanelSettings className="dark:text-white text-black" />
              <h5 className="pl-2 md:block hidden dark:text-white text-black ">
                Admin Dashboard
              </h5>
            </Link>
          )}
          <div
            className={`w-full flex items-center px-3 py-4 cursor-pointer ${
              active === 4 ? "dark:bg-slate-800" : " bg-transparent"
            }`}
            onClick={handleSignOut}
          >
            <AiOutlineLogout className="dark:text-white text-black" />
            <h5 className="pl-2 md:block hidden dark:text-white text-black ">
              Log Out
            </h5>
          </div>
        </div>
      )}
    </>
  );
}
