import React, { useState } from "react";
import Heading from "./utils/Heading";
import Header from "./component/Header";
import Hero from "./component/Route/Hero";
import useAuth from "./hook/useAuth";
import Courses from "./component/Route/Courses";
import Reviews from "./component/Route/Reviews";
import FAQ from "./component/FAQ/FAQ";
import Footer from "./component/Footer";

export default function index() {
  const [open, setOpen] = useState(false);
  const [activeItem, setActiveItem] = useState(0);
  const [route, setRoute] = useState("Login");
  const { name } = useAuth();

  return (
    <main>
      <Heading
        title={name ? name : "Rg Tech"}
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
      <Hero />
      <Courses />
      <Reviews />
      <FAQ />
      <Footer />
    </main>
  );
}
