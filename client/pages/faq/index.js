import Heading from "../utils/Heading";
import Header from "../component/Header";
import Footer from "../component/Footer";
import { useState } from "react";
import FAQ from "../component/FAQ/FAQ";

export default function index() {
  const [open, setOpen] = useState(false);
  const [activeItem, setActiveItem] = useState(3);
  const [route, setRoute] = useState("Login");

  return (
    <div className="min-h-screen">
      <Heading
        title="FAQ - ELearning"
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
      <FAQ />
      <Footer />
    </div>
  );
}
