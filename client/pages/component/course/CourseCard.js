import { AiOutlineUnorderedList } from "react-icons/ai";
import Ratings from "../../utils/Ratings";
import Link from "next/link";
import { useEffect, useState } from "react";

export default function CourseCard({ item, isProfile }) {
  const [id, setId] = useState(null)
  const [imagUrl, setImagUrl] = useState(null)
  const [name, setName] = useState(null)
  const [purchase, setPurchase] = useState(null)
  const [price, setPrice] = useState(null)
  const [estimatedPrice, setEstimatedPrice] = useState(null)
  const [itemLength, setItemLength] = useState(null)
  
  useEffect(() => {
    if (item) {
      setId(item._id)
      setImagUrl(item.thumbnail.url)
      setName(item.name)
      setPrice(item.price)
      setPurchase(item.purchase)
      setEstimatedPrice(item.estimatedPrice)
      setItemLength(item.courseData.length)
    }
  }, [item])

  return (
    <Link
      href={isProfile ? `/courseR/${id}` : `courseAccess/${id}`}
    >
      <div className="w-full min-h-[35vh] dark:bg-slate-500 dark:bg-opacity-20 backdrop-blur border dark:border-[#ffffff1d] border-[#ffffff15] dark:shadow-[bg-slate-700] rounded-lg p-3 shadow-sm dark:shadow-inner">
        <img
          src={imagUrl}
          className="rounded w-full h-[150px]"
          alt=""
        />
        <br />
        <h1 className="font-Poppins text-[16px] text-black dark:text-[#fff]">
          {name}
        </h1>
        <div className="w-full items-center justify-between pt-2">
          <Ratings rating={5} />
          <h5
            className={`text-black dark:text-[#fff] ${
              isProfile && "hidden md:inline"
            }`}
          >
            {purchase} Student
          </h5>
        </div>
        <div className="w-full flex items-center justify-between pt-3">
          <div className="flex">
            <h3 className="text-black dark:text-[#fff]">
              {price === 0 ? "Free" : `${price}$`}
            </h3>
            <h5 className="pl-3 text-[14px] mt-[-5px] line-through opacity-80 text-black dark:text-[#fff]">
              {estimatedPrice}$
            </h5>
          </div>
          <div className="flex items-center pb-3">
            <AiOutlineUnorderedList size={20} fill="#fff" />
            <h5 className="pl-2 text-black dark:text-[#fff]">
              {itemLength} Lectures
            </h5>
          </div>
        </div>
      </div>
    </Link>
  );
}
