import { AiOutlineUnorderedList } from "react-icons/ai";
import Ratings from "../../utils/Ratings";
import Link from "next/link";

export default function CourseCard({ item, isProfile }) {
  return (
    <Link
      href={isProfile ? `/courseR/${item._id}` : `courseAccess/${item._id}`}
    >
      <div className="w-full min-h-[35vh] dark:bg-slate-500 dark:bg-opacity-20 backdrop-blur border dark:border-[#ffffff1d] border-[#ffffff15] dark:shadow-[bg-slate-700] rounded-lg p-3 shadow-sm dark:shadow-inner">
        <img
          src={item.thumbnail.url}
          className="rounded w-full h-[150px]"
          alt=""
        />
        <br />
        <h1 className="font-Poppins text-[16px] text-black dark:text-[#fff]">
          {item.name}
        </h1>
        <div className="w-full items-center justify-between pt-2">
          <Ratings rating={5} />
          <h5
            className={`text-black dark:text-[#fff] ${
              isProfile && "hidden md:inline"
            }`}
          >
            {item.purchase} Student
          </h5>
        </div>
        <div className="w-full flex items-center justify-between pt-3">
          <div className="flex">
            <h3 className="text-black dark:text-[#fff]">
              {item.price === 0 ? "Free" : `${item.price}$`}
            </h3>
            <h5 className="pl-3 text-[14px] mt-[-5px] line-through opacity-80 text-black dark:text-[#fff]">
              {item.estimatedPrice}$
            </h5>
          </div>
          <div className="flex items-center pb-3">
            <AiOutlineUnorderedList size={20} fill="#fff" />
            <h5 className="pl-2 text-black dark:text-[#fff]">
              {item.courseData?.length} Lectures
            </h5>
          </div>
        </div>
      </div>
    </Link>
  );
}
