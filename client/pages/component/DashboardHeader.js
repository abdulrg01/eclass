import React, { useEffect } from "react";
import ThemeSwitcher from "../utils/ThemeSwitcher";
import { IoMdNotifications } from "react-icons/io";
import { useState } from "react";
import socketIO from "socket.io-client";
const ENDPOINT = process.env.PUBLIC_SOCKET_SERVER_URL || "";
import Loader from "./Loader";
import {
  useGetAllNotificationsQuery,
  useUpdateNotificationStatusMutation,
} from "../../redux/notifications/notifications";
import { format } from "timeago.js";

export default function DashboardHeader() {
  const [open, setOpen] = useState(false);
  const { data, refetch, isLoading, error } = useGetAllNotificationsQuery(
    undefined,
    {
      refetchOnMountOrArgChange: true,
    }
  );
  const [updateNotificationStatus, { isSuccess }] =
    useUpdateNotificationStatusMutation();
  const [notifications, setNotifications] = useState([]);

  const playNotificationSound = () => {
    const audio = new Audio(
      "http://codeskulptor-demos.commondatastorage.googleapis.com/GalaxyInvaders/alien_shoot.wav"
    );

    audio.play();
  };

  useEffect(() => {
    if (data) {
      setNotifications(
        data?.notification.filter((item) => item.status === "unread")
      );
    }
    if (isSuccess) {
      refetch();
    }
    if (error) {
      console.log(error);
    }
    playNotificationSound();
  }, [data, isSuccess, error]);

  useEffect(() => {
    const socket = socketIO(ENDPOINT, { transports: ["websocket"] });

    socket.on("connect_error", (error) => {
      console.error("Socket connection error:", error);
    });

    socket.on("newNotification", (data) => {
      refetch();
      playNotificationSound();
    });

    return () => {
      socket.disconnect();
    };
  }, []);

  const handleNotificationStatusChange = async (id) => {
    await updateNotificationStatus(id);
  };

  return (
    <>
      {isLoading ? (
        <Loader />
      ) : (
        <div className="w-full flex items-center justify-end p-2 fixed top-2 right-0 z-[9999999]">
          <ThemeSwitcher />
          <div
            className="relative cursor-pointer m-2"
            onClick={() => setOpen((prev) => !prev)}
          >
            <IoMdNotifications className="text-2xl cursor-pointer dark:text-white text-black" />
            <span className=" absolute -top-2 -right-2 bg-[#3ccbae] rounded-full w-[20px] text-[12px] flex items-center justify-center text-white">
              {notifications && notifications.length}
            </span>
          </div>
          {open && (
            <div className=" absolute top-16 z-10 h-[60vh] px-3 py-4 overflow-y-auto">
              <div
                id="toast-notification"
                className="w-full max-w-xs p-4 text-gray-900 bg-white rounded-lg shadow dark:bg-gray-800 dark:text-gray-300 overflow-y-scroll"
                role="alert"
              >
                <div className="mb-3">
                  <span className="text-sm font-semibold text-gray-900 dark:text-white">
                    New notification
                  </span>
                </div>

                {notifications &&
                  notifications.map((item, index) => (
                    <div key={index}>
                      <div className="flex items-center mb-3">
                        <p className="mb-1 text-sm font-semibold text-gray-900 dark:text-white">
                          {item.title}
                        </p>
                        <p
                          className="ms-auto -mx-1.5 -my-1.5 cursor-pointer"
                          onClick={() =>
                            handleNotificationStatusChange(item._id)
                          }
                        >
                          {item.status}
                        </p>
                      </div>
                      <div className="border-b dark:border-b-[#ffffff47] border-b-[#00000f] mb-2">
                        <p className="text-black dark:text-white">
                          {item.message}
                        </p>
                        <p className="text-black dark:text-white">
                          {format(item.createdAt)}
                        </p>
                      </div>
                    </div>
                  ))}
              </div>
            </div>
          )}
        </div>
      )}
    </>
  );
}
