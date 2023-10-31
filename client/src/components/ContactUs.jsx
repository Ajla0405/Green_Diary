import React from "react";

const ContactUs = () => {
  return (
    <div className="row">
      <div className="col-md-3">
        <h6>Have questions about our products or any special queries?</h6>
        <h6>Let's connected!</h6>
      </div>
      <div className="col-md-8">
        <form>
          <input type="text" placeholder="name" />
          <input type="text" placeholder="Phone number" />
          <input type="text" placeholder="email" />
          <input type="text" placeholder="message" />
        </form>
      </div>
    </div>
  );
};

export default ContactUs;
