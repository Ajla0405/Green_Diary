import React from "react";

const ContactUs = () => {
  return (
    <div className="row" id="contact-form">
      <div className="col-md-3" id="contact-text">
        <h6>Have questions about our products or any special queries?</h6>
        <h3>Let's connected!</h3>
      </div>
      <div className="col-md-8" id="screen-body-item">
        <div className="app-form">
          <div className="app-form-group">
            <input className="app-form-control" placeholder="NAME" />
          </div>
          <div className="app-form-group">
            <input className="app-form-control" placeholder="EMAIL" />
          </div>
          <div className="app-form-group">
            <input className="app-form-control" placeholder="CONTACT NO" />
          </div>
          <div className="app-form-group message">
            <input className="app-form-control" placeholder="MESSAGE" />
          </div>
          <div className="app-form-group buttons">
            <button className="app-form-button">CANCEL</button>
            <button className="app-form-button">SEND</button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ContactUs;
