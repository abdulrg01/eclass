import { useSelector } from "react-redux";
import { selectCurrentUser } from "../../../redux/auth/authSlice";
import Ratings from "../../utils/Ratings";
import { MdDoneOutline } from "react-icons/md";
import { format } from "timeago.js";
import CoursePlayer from "../../utils/CoursePlayer";
import Link from "next/link";
import CourseContentList from "./CourseContentList";
import { IoMdClose } from "react-icons/io";
import { useEffect, useState } from "react";
import { Elements } from "@stripe/react-stripe-js";
import CheckOutForm from "../Payment/CheckOutForm";
import { VscVerifiedFilled } from "react-icons/vsc";

export default function CourseDetails({
  data,
  stripePromise,
  clientSecret,
  setRoute,
  setOpen: openAuthModel,
}) {
  const user = useSelector(selectCurrentUser);
  const [open, setOpen] = useState(false);
  const [name, setName] = useState(null);
  const [ratings, setratings] = useState(null);
  const [dataLength, setDatalength] = useState(null);
  const [purchased, setPurchased] = useState(null);
  const [benefits, setBenefits] = useState(null);
  const [prerequisites, setPrerequisites] = useState(null);
  const [courseData, setCourseData] = useState(null);
  const [description, setDescription] = useState(null);
  const [reviewLength, setReviewLength] = useState(null);
  const [reviews, setReview] = useState(null);
  const [demoUrl, setDemoUrl] = useState(null);
  const [title, setTitle] = useState(null);
  const [price, setPrice] = useState(null);
  const [estimatedPrice, setEstimatedPrice] = useState(null);
  const [id, setId] = useState(null);

  useEffect(() => {
    if (data) {
      setName(data.name);
      setratings(data.ratings);
      setDatalength(data.reviews.length);
      setPurchased(data.purchased);
      setBenefits(data.benefits);
      setPrerequisites(data.prerequisites);
      setCourseData(data.courseData);
      setDescription(data.description);
      setReviewLength(data.reviews.length);
      setReview(data.reviews);
      setDemoUrl(data.demoUrl);
      setTitle(data.title);
      setPrice(data.price);
      setEstimatedPrice(data.estimatedPrice);
      setId(data._id);
    }
  }, [data]);
  const discountPercentage =
    ((estimatedPrice - price) / estimatedPrice) * 100;

  const discountPercentagePrice = discountPercentage.toFixed(0);

  const isUserPurchased =
    user && user?.courses?.find((item) => item === data?._id);

  const handleOrder = (e) => {
    if (user) {
      setOpen(true);
    } else {
      setRoute("Login");
      openAuthModel(true);
    }
  };

  return (
    <div>
      <div className="w-[90%] md:w-[80%] m-auto py-5">
        <div className="w-full flex flex-col-reverse md:flex-row">
          <div className="w-full md:w-[65%] md:pr-5">
            <h1 className=" text-2xl font-Poppins font-[600] text-black dark:text-white">
              {name}
            </h1>
            <div className="flex items-center justify-between pt-3">
              <div className="flex items-center">
                <Ratings rating={ratings} />
                <h5 className="text-black dark:text-white">
                  {dataLength} Reviews
                </h5>
              </div>
              <h5 className="text-black dark:text-white">
                {purchased} Student
              </h5>
            </div>

            <br />
            <h1 className="text-black dark:text-white text-[25px]">
              What you will learn from this course
            </h1>
            <div>
              {benefits?.map((item, index) => (
                <div className="w-full flex md:items-center py-2" key={index}>
                  <div className="w-[15px] mr-1">
                    <MdDoneOutline
                      size={20}
                      className="text-black dark:text-white"
                    />
                  </div>
                  <p className="pl-2 text-black dark:text-white">
                    {item.title}
                  </p>
                </div>
              ))}
              <br />
            </div>
            <h1 className="text-black dark:text-white text-[25px]">
              What are the prerequisites for stating this course
            </h1>
            {prerequisites?.map((item, index) => (
              <div className="w-full flex md:items-center py-2" key={index}>
                <div className="w-[15px] mr-1">
                  <MdDoneOutline
                    size={20}
                    className="text-black dark:text-white"
                  />
                </div>
                <p className="pl-2 text-black dark:text-white">{item.title}</p>
              </div>
            ))}
            <br />
            <div>
              <h1 className="text-black dark:text-white text-[25px]">
                Course Overview
              </h1>
              {/* CourseContentList */}
              <CourseContentList data={courseData} isDemo={true} />
            </div>
            <br />
            <p className="mt-[20px] whitespace-pre-line w-full overflow-hidden text-black dark:text-white">
              {description}
            </p>
            <br />
            <div className="w-full">
              <div className="md:flex items-center">
                <Ratings ratings={ratings} />
                <div className="mb-2 md:mb-[unset]" />
                <h5 className="text-black dark:text-white text-[25px]">
                  {Number.isInteger(ratings)
                    ? data?.ratings.toFixed(1)
                    : data?.ratings?.toFixed(2)}{" "}
                  Course Ratings + {reviewLength} Reviews
                </h5>
              </div>
              <br />
              {(reviews && [...reviews].reverse())?.map((item, index) => (
                <div
                  className="w-full pb-4 dark:text-[#ffffff83] text-[#bb8383b8]"
                  key={index}
                >
                  <div className="flex">
                    <div>
                      <img
                        src={
                          item?.user.avatar ? (
                            item?.user.avatar.url
                          ) : (
                            <RxAvatar />
                          )
                        }
                        alt="avatar"
                        className=" rounded-full w-[40px] h-[40px]"
                      />
                    </div>
                    <div className="pl-3">
                      <div className="flex items-center gap-2">
                        <h5 className="text-[20px] text-white">
                          {item?.user.name}
                        </h5>{" "}
                        <Ratings rating={item?.ratings} />
                      </div>
                      <p className="text-white">{item?.reviews}</p>
                      <small className="text-[#ffffff83]">
                        {item.createdAt ? format(item.createdAt) : ""}
                      </small>
                    </div>
                  </div>
                  {item.commentReplies?.map((item, index) => (
                    <div className="w-full flex md:ml-14 my-5 dark:text-[#ffffff83] text-[#dc9c9cb8]">
                      <div>
                        <img
                          src={
                            item?.user.avatar ? (
                              item?.user.avatar.url
                            ) : (
                              <RxAvatar />
                            )
                          }
                          alt="avatar"
                          className=" rounded-full w-[40px] h-[40px]"
                        />
                      </div>
                      <div className="pl-3">
                        <div className="flex items-center">
                          <h5 className="text-[20px] text-white">
                            {item.user.name}
                          </h5>{" "}
                          {item.user.role === "Admin" && (
                            <VscVerifiedFilled className="text-[green] ml-2 text-[20px]" />
                          )}
                        </div>
                        <p className="text-white">{item.comment}</p>
                        <small className="text-[#ffffff83]">
                          {item.createdAt ? format(item.createdAt) : ""}
                        </small>
                      </div>
                    </div>
                  ))}
                </div>
              ))}
            </div>
          </div>
          <div className="w-full md:w-[35%] relative">
            <div className="sticky top-[100px] left-0 z-50 w-full">
              <CoursePlayer videoUrl={demoUrl} title={title} />
              <div className="flex items-center">
                <h1 className="pl-5 text-[25px] mt-2 text-black dark:text-white">
                  {price === 0 ? "Free" : price + "$"}
                </h1>
                <h5 className="pl-3 text-[20] mt-2 line-through opacity-80 text-black dark:text-white">
                  {estimatedPrice}$
                </h5>
                <h4 className="pl-5 pt-2 text-[22px] text-black dark:text-white">
                  {discountPercentagePrice}% Off
                </h4>
              </div>
              <div className="flex items-center my-3">
                {isUserPurchased ? (
                  <Link
                    className="text-white bg-red-700 hover:bg-red-800 focus:outline-none focus:ring-4 focus:ring-red-300 font-medium rounded-full text-sm px-5 py-2.5 text-center me-2 mb-2 dark:bg-red-600 dark:hover:bg-red-700 dark:focus:ring-red-900 cursor-pointer"
                    href={`/courseAccess/${id}`}
                  >
                    Enter to Course
                  </Link>
                ) : (
                  <div
                    className="text-white bg-red-700 hover:bg-red-800 focus:outline-none focus:ring-4 focus:ring-red-300 font-medium rounded-full text-sm px-5 py-2.5 text-center me-2 mb-2 dark:bg-red-600 dark:hover:bg-red-700 dark:focus:ring-red-900 cursor-pointer"
                    onClick={handleOrder}
                  >
                    Buy Now {price}$
                  </div>
                )}
              </div>
              <p className="pb-1 text-black dark:text-white">
                * Source code included
              </p>
              <p className="pb-1 text-black dark:text-white">
                * Full lifetime access
              </p>
              <p className="pb-1 text-black dark:text-white">
                * Certificate of completion
              </p>
              <p className="pb-3 md:pb-1 text-black dark:text-white">
                * Premium Support
              </p>
            </div>
          </div>
        </div>
      </div>
      <>
        {open && (
          <div className="w-full h-screen bg-[#00000036] fixed top-0 left-0 z-[999] flex items-center justify-center">
            <div className="w-[500px] min-h-[450px] bg-white rounded-xl shadow p-3 relative">
              <IoMdClose
                size={20}
                className="text-white cursor-pointer dark:text-black absolute top-3 right-5"
                onClick={() => setOpen(false)}
              />

              <div className="w-full mt-5">
                <Elements stripe={stripePromise} options={{ clientSecret }}>
                  <CheckOutForm data={data} user={user} />
                </Elements>
              </div>
            </div>
          </div>
        )}
      </>
    </div>
  );
}
