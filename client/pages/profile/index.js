import React, { useState } from "react";
import Heading from "../utils/Heading";
import Header from "../component/Header";
import Profile from "../component/Profile/Profile";
import Footer from "../component/Footer";
import { useSelector } from "react-redux";
import { selectCurrentUser } from "@/redux/auth/authSlice";

export default function index() {
  const [open, setOpen] = useState(false);
  const [activeItem, setActiveItem] = useState(5);
  const user = useSelector(selectCurrentUser);
  const [route, setRoute] = useState("Login");

  return (
    <div>
      <Heading
        title={`${user?.name} profile - ELearning`}
        description="ELearning is a platform for students to learn and help from teachers"
        keywords="Programing, Mearn, Redux, maching Learning"
      />
      <Header
        open={open}
        setOpen={setOpen}
        activeItem={activeItem}
        route={route}
        setRoute={setRoute}
      />
      <Profile user={user} />
      <Footer />
    </div>
  );
}
