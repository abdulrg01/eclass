import { styles } from "../../../style";
import React from "react";
import toast from "react-hot-toast";
import { MdAddCircle } from "react-icons/md";

export default function CourseData({
  benefits,
  setBenefits,
  prerequisites,
  setPrerequisites,
  active,
  setActive,
}) {
  const handleBenefitChange = (index, value) => {
    const updatedBenefits = [...benefits];
    updatedBenefits[index].title = value;
    setBenefits(updatedBenefits);
  };

  const handleAddBenefits = () => {
    setBenefits([...benefits, { title: "" }]);
  };

  const handlePrerequisiteChange = (index, value) => {
    const updatedPrerequisites = [...prerequisites];
    updatedPrerequisites[index].title = value;
    setPrerequisites(updatedPrerequisites);
  };

  const handleAddPrerequisites = () => {
    setPrerequisites([...prerequisites, { title: "" }]);
  };

  const prevButton = () => {
    setActive(active - 1);
  };
  const handleOptions = () => {
    if (
      benefits[benefits.length - 1]?.title !== "" &&
      prerequisites[prerequisites.length - 1]?.title !== ""
    ) {
      setActive(active + 1);
    } else {
      toast.error("Please fill the fields for go to next!");
    }
  };

  return (
    <div className=" w-[75%] m-auto mt-16 block">
      <div>
        <label className={`${styles.label} text-[20px]`} htmlFor="email">
          What are the benefits for students in this course
        </label>
        <br />
        {benefits.map((benefit, index) => (
          <input
            type="text"
            key={index}
            name="benefit"
            placeholder="You will be able to build a full stack LMS Platform..."
            required
            value={benefit.title}
            onChange={(e) => handleBenefitChange(index, e.target.value)}
            className={`${styles.input} my-2`}
          />
        ))}
        <MdAddCircle
          style={{ margin: "10px 0px", cursor: "pointer", width: "30px" }}
          onClick={handleAddBenefits}
        />
      </div>
      <div>
        <label className={`${styles.label} text-[20px]`} htmlFor="">
          What are the prerequisites for starting this course
        </label>
        <br />
        {prerequisites.map((prerequisite, index) => (
          <input
            type="text"
            key={index}
            name="prerequisites"
            placeholder="You need basic knowledge of MERN stack"
            required
            value={prerequisite.title}
            onChange={(e) => handlePrerequisiteChange(index, e.target.value)}
            className={`${styles.input} my-2`}
          />
        ))}
        <MdAddCircle
          style={{ margin: "10px 0px", cursor: "pointer", width: "30px" }}
          onClick={handleAddPrerequisites}
        />
      </div>
      <div className="w-full flex items-center justify-between">
        <div
          className=" w-full md:w-[100px] flex items-center justify-center h-[40px] bg-[#37a39a] text-center text-[#fff] rounded mt-8 cursor-pointer"
          onClick={() => prevButton()}
        >
          Prev
        </div>
        <div
          className=" w-full md:w-[100px] flex items-center justify-center h-[40px] bg-[#37a39a] text-center text-[#fff] rounded mt-8 cursor-pointer"
          onClick={() => handleOptions()}
        >
          Next
        </div>
      </div>
    </div>
  );
}
