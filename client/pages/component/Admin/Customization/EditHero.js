import { useEffect, useState } from "react";
import {
  useEditLayoutMutation,
  useGetHeroDataQuery,
} from "../../../../redux/layout/layoutApi";
import { AiOutlineCamera } from "react-icons/ai";
import toast from "react-hot-toast";
import Loader from "../../Loader";

export default function EditHero() {
  const [image, setImage] = useState("");
  const [title, setTitle] = useState("");
  const [subTitle, setSubTitle] = useState("");

  const { data, refetch, isLoading } = useGetHeroDataQuery("Banner", {
    refetchOnMountOrArgChange: true,
  });
  const [editLayout, { isSuccess, error }] = useEditLayoutMutation();

  useEffect(() => {
    if (data) {
      setTitle(data?.layout?.banner.title);
      setSubTitle(data?.layout?.banner.subTitle);
      setImage(data?.layout?.banner?.image?.url);
    }
    if (isSuccess) {
      refetch();
      toast.success("Hero Updated Successfully");
    }
    if (error) {
      if ("data" in error) {
        const errorMessage = error;

        toast.error(errorMessage.data.message);
      }
    }
  }, [data, isSuccess, error]);

  const handleUpdate = (e) => {
    const file = e.target.files?.[0];
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = (e) => {
      if (reader.readyState === 2) {
        setImage(e.target.result);
      }
    };
  };

  const handleEdit = async (e) => {
    await editLayout({ type: "Banner", image, title, subTitle });
  };

  return (
    <>
      {isLoading ? (
        <Loader />
      ) : (
        <>
          <section className=" bg-transparent w-[95%] m-auto mt-14">
            <div className="grid max-w-screen-lg px-4 py-8 mx-auto lg:gap-8 xl:gap-0 lg:py-16 lg:grid-cols-12">
              <div className="mr-auto place-self-center lg:col-span-7 pl-10">
                {/*  */}
                <textarea
                  className="max-w-lg text-4xl resize-none font-bold md:text-4xl xl:text-5xl dark:text-white text-gray-700 bg-transparent"
                  value={title}
                  rows={3}
                  onChange={(e) => setTitle(e.target.value)}
                  placeholder="Improve Your Online Learning Experience"
                />{" "}
                <textarea
                  value={subTitle}
                  rows={3}
                  cols="60"
                  onChange={(e) => setSubTitle(e.target.value)}
                  className="max-w-lg bg-transparent font-light text-gray-600 md:text-lg lg:text-xl dark:text-gray-400 focus:ring-0"
                  placeholder="From checkout to global sales tax compliance, companies around the
                world use Rpower to simplify their payment stack."
                />{" "}
              </div>
              <div className="hidden lg:mt-0 lg:col-span-5 lg:flex relative">
                <img
                  className="h-[350px] w-[350px] rounded-full"
                  src={
                    image
                      ? image
                      : "https://images.unsplash.com/photo-1546430498-05c7b929830e?q=80&w=1470&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
                  }
                  alt="mockup"
                />
                <input
                  type="file"
                  name=""
                  id="banner"
                  className="hidden"
                  onChange={handleUpdate}
                  accept="image/*"
                />
                <label htmlFor="banner">
                  <div className="w-[30px] h-[30px] bg-slate-900 rounded-full absolute bottom-10 right-28 flex items-center justify-center cursor-pointer">
                    <AiOutlineCamera
                      size={20}
                      className="z-1 text-black dark:text-white"
                    />
                  </div>
                </label>
              </div>
            </div>
            <div
              className={`rounded-2xl hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800 flex flex-row justify-center items-center py-3 px-6 cursor-pointer text-black dark:text-white text-[16px] font-Poppins font-semibold w-[100px] min-h-[40px] h-[40px] bg-[#cccccc34]  ${
                data?.layout?.banner?.title !== title ||
                data?.layout?.banner?.subTitle !== subTitle ||
                data?.layout?.banner?.image?.url !== image
                  ? "cursor-pointer !bg-[#42d383]"
                  : "!cursor-not-allowed"
              } absolute bottom-12 right-12`}
              onClick={
                data?.layout?.banner?.title !== title ||
                data?.layout?.banner?.subTitle !== subTitle ||
                data?.layout?.banner?.image?.url !== image
                  ? handleEdit
                  : () => null
              }
            >
              Save
            </div>
          </section>
        </>
      )}
    </>
  );
}
