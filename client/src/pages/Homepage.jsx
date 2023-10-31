import React from "react";
import SlideShow from "../components/SlideShow";
import Navbar from "../components/Navbar";
import "./Homepage.css";
import Footer from "../components/Footer";
import ContactUs from "../components/ContactUs";

const Homepage = () => {
  return (
    <div>
      <Navbar />
      {/* <SlideShow /> */}
      <ContactUs />
      <Footer />
    </div>
  );
};

export default Homepage;
