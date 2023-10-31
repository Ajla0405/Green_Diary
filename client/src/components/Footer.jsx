import React from "react";

const Footer = () => {
  return (
    <div className="footer-container">
      <div className="footer-text">
        <h5>KEEP IN TOUCH WITH US ON SOCIAL MEDIA</h5>
      </div>
      <div className="footer-social-icon">
        <ul>
          <li>
            <a href="#" className="fa fa-facebook fa-lg" />
          </li>
          <li>
            <a href="#" className="fa fa-instagram fa-lg" />
          </li>
          <li>
            <a href="#" className="fa fa-twitter fa-lg" />
          </li>
        </ul>
      </div>
      <div className="copyright">
        <p>©Green Diary 2023</p>
      </div>
    </div>
  );
};

export default Footer;
