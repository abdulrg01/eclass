import Link from "next/link";
import React from "react";

export const navItemsData = [
  {
    name: "Home",
    url: "/",
  },
  {
    name: "Courses",
    url: "/courses",
  },
  {
    name: "About",
    url: "/about",
  },
  {
    name: "Policy",
    url: "/policy",
  },
  {
    name: "FAQ",
    url: "/faq",
  },
];

export default function NavItems({ activeItem }) {
  return (
    <>
      <div className="hidden w-full md:block md:w-auto">
        {["home", "courses", "about", "faq", "policy"].map((item, index) => {
          return (
            <Link href={`/${item}`} key={index}>
              <span
                className={`${
                  activeItem === index
                    ? "dark:text-[#37a39a] text-[crimson]"
                    : "dark:text-white"
                } text-[16px] px-6 font-Poppins font-[600] uppercase text-gray-700`}
              >
                {item}
              </span>
            </Link>
          );
        })}
      </div>
    </>
  );
}
