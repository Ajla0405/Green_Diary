import React from "react";
import logo from "../images/logo2.png";

const Navbar = () => {
  return (
    <div id="navbar-container" className="row">
      <div id="navbar-icon" className="col-md-4">
        <img src={logo} alt="green diary logo" />
      </div>
      <div id="navbar-menu" className="col-md-8">
        <ul>
          <li>PLANTS</li>
          <li>PLANT IDENTIFIER</li>
          <li>GIFT IDEAS</li>
          <li>ABOUT US</li>
          <li>
            <a href="#" className="fa-solid fa-user fa-xl" id="user-logo" />
          </li>
        </ul>
      </div>
    </div>
  );
};

export default Navbar;
