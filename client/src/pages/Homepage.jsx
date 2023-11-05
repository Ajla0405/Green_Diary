import React from "react";
import "./Homepage.css";
import Footer from "../components/Footer";
import ContactUs from "../components/ContactUs";
import PlantsPage from "./Plantspage";
import AboutUs from "../components/AboutUs";
import { Link } from "react-router-dom";

const Homepage = () => {
  return (
    <div>
      <div className="background-page1">
        <div className="content-page1">
          <h6>Plant care is our mission</h6>
          <h1>Welcome to Green Diary</h1>
          <p>
            We are dedicated to making plant care easy, enjoyable, and
            accessible to everyone, whether you're a seasoned green enthusiast
            or a complete beginner. Our mission is to help people nurture the
            plants they've received as gifts, ensuring they thrive, and to offer
            a wide range of services to make plant care a breeze.
          </p>
          <button className="discover-more">
            <Link to="/plants">Discover more</Link>
          </button>
        </div>
      </div>
      <PlantsPage />
      <AboutUs />
      <ContactUs />
    </div>
  );
};

export default Homepage;
