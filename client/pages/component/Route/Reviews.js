import ReviewCard from "../../Review/ReviewCard";

const review = [
  {
    name: "Adam",
    avatar:
      "https://images.unsplash.com/photo-1546430498-05c7b929830e?q=80&w=1470&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    profession: "Full stack web developer | Canada",
    comment:
      "From checkout to global sales tax compliance, companies around the world use Flowbite to simplify their payment stack. From checkout to global sales tax compliance, companies around the world use Flowbite to simplify their payment stack.",
  },
  {
    name: "Adam",
    avatar:
      "https://images.unsplash.com/photo-1546430498-05c7b929830e?q=80&w=1470&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    profession: "Full stack web developer | Canada",
    comment:
      "From checkout to global sales tax compliance, companies around the world use Flowbite to simplify their payment stack. From checkout to global sales tax compliance, companies around the world use Flowbite to simplify their payment stack.",
  },
  {
    name: "Adam",
    avatar:
      "https://images.unsplash.com/photo-1546430498-05c7b929830e?q=80&w=1470&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    profession: "Full stack web developer | Canada",
    comment:
      "From checkout to global sales tax compliance, companies around the world use Flowbite to simplify their payment stack. From checkout to global sales tax compliance, companies around the world use Flowbite to simplify their payment stack.",
  },
  {
    name: "Adam",
    avatar:
      "https://images.unsplash.com/photo-1546430498-05c7b929830e?q=80&w=1470&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    profession: "Full stack web developer | Canada",
    comment:
      "From checkout to global sales tax compliance, companies around the world use Flowbite to simplify their payment stack. From checkout to global sales tax compliance, companies around the world use Flowbite to simplify their payment stack.",
  },
  {
    name: "Adam",
    avatar:
      "https://images.unsplash.com/photo-1546430498-05c7b929830e?q=80&w=1470&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    profession: "Full stack web developer | Canada",
    comment:
      "From checkout to global sales tax compliance, companies around the world use Flowbite to simplify their payment stack. From checkout to global sales tax compliance, companies around the world use Flowbite to simplify their payment stack.",
  },
  {
    name: "Adam",
    avatar:
      "https://images.unsplash.com/photo-1546430498-05c7b929830e?q=80&w=1470&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    profession: "Full stack web developer | Canada",
    comment:
      "From checkout to global sales tax compliance, companies around the world use Flowbite to simplify their payment stack. From checkout to global sales tax compliance, companies around the world use Flowbite to simplify their payment stack",
  },
];

export default function Reviews() {
  return (
    <div className="bg-white dark:bg-gray-900">
      <div className="w-[90%] md:w-[85%] m-auto">
        <div className="w-full md:flex items-center gap-5">
          <div className="md:w-[50%] w-full">
            <img src="fiverrusiness.png" className="mt-10" alt="business" />
          </div>
          <div className="md:w-[50%] w-full">
            <h3 className="text-[25px] text-black dark:text-white font-[500] font-Poppins text-center py-2 md:!text-[40px]">
              Our Student Are{" "}
              <span className="text-gradient">Our Strength</span> <br /> See
              What They say About Us
            </h3>
            <br />
            <p className="bg-transparent block mb-2 text-sm font-medium text-gray-900 dark:text-white">
              From checkout to global sales tax compliance, companies around the
              world use Flowbite to simplify their payment stack.
            </p>
          </div>
          <br />
        </div>
        <div className="grid grid-cols-1 gap-6 md:grid-cols-2 md:gap-[25px] lg:grid-cols-2 lg:gap-[25px] 1500px:gap-[35px] mb-12 border-0 mt-14">
          {review &&
            review.map((item, index) => <ReviewCard item={item} key={index} />)}
        </div>
      </div>
    </div>
  );
}
