import React from "react";
import { Link } from "react-router-dom";

const AboutUs = () => {
  return (
    <div className="aboutUs-container">
      <div className="aboutUs-first">
        <h2>ABOUT US</h2>
        <div className="line-1"></div>
        <p>
          We understand that many individuals receive plants as gifts from
          friends and loved ones and want to ensure these cherished green
          companions remain healthy and vibrant. Our mission extends to
          providing comprehensive support and resources for those who may have
          little to no experience in plant care.
          <br />
          <br />
          Caring for plants can be a rewarding and fulfilling experience, but it
          can also be a bit daunting, especially for beginners. That's why we
          are dedicated to simplifying the art of plant care, making it
          accessible and enjoyable for everyone. Our commitment to plant
          enthusiasts and novices alike goes beyond just offering advice; we aim
          to empower you with knowledge and confidence.
        </p>
      </div>
      <div className="aboutUs-second">
        <h3>What we offer</h3>
        <div className="line-3"></div>
        <div className="offer-container">
          <div className="offer-caring">
            <h5>Plant Identification</h5>
            <a href="#" className="fa-solid fa-leaf fa-xl" />
            <p>
              We understand that many individuals receive plants as gifts from
              friends and loved ones and want to ensure these cherished green
              companions remain healthy and vibrant. Our mission extends to
              providing comprehensive support and resources for those who may
              have little to no experience in plant care.
            </p>
          </div>
          <div className="line-2"></div>
          <div className="offer-caring">
            <h5>Comprehensive Care Information</h5>
            <a href="#" className="fa-solid fa-hand-holding-heart fa-xl" />
            <p>
              We understand that many individuals receive plants as gifts from
              friends and loved ones and want to ensure these cherished green
              companions remain healthy and vibrant. Our mission extends to
              providing comprehensive support and resources for those who may
              have little to no experience in plant care.
            </p>
          </div>
          <div className="line-2"></div>
          <div className="offer-caring">
            <h5>Useful Care Calendar</h5>
            <a href="#" className="fa-solid fa-calendar-check fa-xl" />
            <p>
              We understand that many individuals receive plants as gifts from
              friends and loved ones and want to ensure these cherished green
              companions remain healthy and vibrant. Our mission extends to
              providing comprehensive support and resources for those who may
              have little to no experience in plant care.
            </p>
          </div>
        </div>
        <button className="register-now">
          <Link to="/register">Register Now</Link>
        </button>
      </div>
    </div>
  );
};

export default AboutUs;
