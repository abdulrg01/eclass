import Heading from "../utils/Heading";
import Header from "../component/Header";
import Footer from "../component/Footer";
import About from "./About";
import { useState } from "react";

export default function index() {
  const [open, setOpen] = useState(false);
  const [activeItem, setActiveItem] = useState(2);
  const [route, setRoute] = useState("Login");

  return (
    <div>
      <Heading
        title="About Us - ELearning"
        description="ELearning is a learning management system for programing"
        keywords=" programing, mern"
      />
      <Header
        open={open}
        setOpen={setOpen}
        activeItem={activeItem}
        route={route}
        setRoute={setRoute}
      />
      <About />
      <Footer />
    </div>
  );
}
