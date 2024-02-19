import Link from "next/link";
import Loader from "../Loader";
import { useRouter } from "next/navigation";
import { useGetHeroDataQuery } from "../../../redux/layout/layoutApi";
import { useState } from "react";

export default function Hero() {
  const { data } = useGetHeroDataQuery("Banner", {});
  const [search, setSearch] = useState("");
  const router = useRouter();

  const handleSearch = (e) => {
    e.preventDefault();
    if (search === "") {
      return;
    } else {
      router.push(`/courses?title=${search}`);
    }
  };

  return (
    <section className="bg-white dark:bg-gray-900">
      <div className="grid max-w-screen-xl px-4 py-8 mx-auto lg:gap-8 xl:gap-0 lg:py-16 lg:grid-cols-12">
        <div className="mr-auto place-self-center lg:col-span-7">
          <h1 className="max-w-2xl mb-4 text-4xl font-extrabold tracking-tight leading-none md:text-5xl xl:text-6xl dark:text-white text-gray-700">
            {data
              ? data?.layout?.banner.title
              : "Improve Your Online Learning Experience"}
          </h1>
          <p className="max-w-2xl mb-6 font-light text-gray-500 lg:mb-8 md:text-lg lg:text-xl dark:text-gray-500">
            {data
              ? data?.layout?.banner.subTitle
              : "From checkout to global sales tax compliance, companies around the world use Rg to simplify their payment stack."}
          </p>
          {/*  */}

          <form>
            <div className="flex">
              <div className="relative w-full">
                <input
                  type="search"
                  value={search}
                  onChange={(e) => setSearch(e.target.value)}
                  className="block p-2.5 w-full z-20 text-sm text-gray-900 bg-gray-50 rounded-e-lg border-s-gray-50 border-s-2 border border-gray-300 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-s-gray-700  dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:border-blue-500"
                  placeholder="Search for courses"
                  required
                />
                <button
                  type="submit"
                  className="absolute top-0 end-0 h-full p-2.5 text-sm font-medium text-white bg-blue-700 rounded-e-lg border border-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
                  onClick={handleSearch}
                >
                  <svg
                    className="w-4 h-4"
                    aria-hidden="true"
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 20 20"
                  >
                    <path
                      stroke="currentColor"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      d="m19 19-4-4m0-7A7 7 0 1 1 1 8a7 7 0 0 1 14 0Z"
                    />
                  </svg>
                  <span className="sr-only">Search</span>
                </button>
              </div>
            </div>
          </form>

          <div className="flex -space-x-4 rtl:space-x-reverse mt-7">
            <img
              className="w-10 h-10 border-2 border-white rounded-full dark:border-gray-800"
              src="/taj.png"
              alt=""
            />
            <img
              className="w-10 h-10 border-2 border-white rounded-full dark:border-gray-800"
              src="/img.png"
              alt=""
            />
            <img
              className="w-10 h-10 border-2 border-white rounded-full dark:border-gray-800"
              src="/aarg.png"
              alt=""
            />
            <img
              className="w-10 h-10 border-2 border-white rounded-full dark:border-gray-800"
              src="/img.png"
              alt=""
            />
            <p className="pl-5 mt-2 text-sm dark:text-white text-black">
              5000k+ People already trusted us{" "}
              <span className=" text-sky-700">
                <Link href="/">View Courses</Link>
              </span>
            </p>
          </div>
        </div>
        <div className="hidden lg:mt-0 lg:col-span-5 lg:flex">
          <img
            className=" rounded-xl"
            src={
              data
                ? data?.layout?.banner?.image?.url
                : `https://images.unsplash.com/photo-1546430498-05c7b929830e?q=80&w=1470&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D`
            }
            alt="mockup"
          />
        </div>
      </div>
    </section>
  );
}
