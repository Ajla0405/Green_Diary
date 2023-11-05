import React from "react";
import SlideShow from "../components/SlideShow";
import "./Homepage.css";
import Footer from "../components/Footer";
import ContactUs from "../components/ContactUs";
import PlantsPage from "./PlantsPage";

const Homepage = () => {
  return (
    <div>
      <SlideShow />
      <PlantsPage />
      <ContactUs />
    </div>
  );
};

export default Homepage;
