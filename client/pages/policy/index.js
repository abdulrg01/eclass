import Heading from "../utils/Heading";
import Header from "../component/Header";
import Footer from "../component/Footer";
import { useState } from "react";
import Policy from "./Policy";

export default function index() {
  const [open, setOpen] = useState(false);
  const [activeItem, setActiveItem] = useState(4);
  const [route, setRoute] = useState("Login");

  return (
    <div>
      <Heading
        title="Policy - ELearning"
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
      <Policy />
      <Footer />
    </div>
  );
}