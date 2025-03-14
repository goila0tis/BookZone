import React from "react";
import "./Contact.css";

const Contact = () => {
  return (
    <div>
      <div>
        <div >
          <h1>Contact Us</h1>
          <p>If you have any questions, feel free to reach out to us!</p>
          <div >
            <h1>BookZone</h1>
            <p>
              <strong>Email:</strong> info@bookzone.com
            </p>
            <p>
              <strong>Phone Number:</strong> +123 456 789
            </p>
            <p>
              <strong>Address:</strong> 123 BookStreet, CityName, Country
            </p>
          </div>
        </div>
        <div className="contact-map">
          <h1>Our Location</h1>
          <iframe
            src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3153.602028892201!2d144.96328031572903!3d-37.81410797975142!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x6ad65d46698098b1%3A0x5045675218ce600!2sFlinders%20Street%20Station!5e0!3m2!1sen!2sus!4v1638187161960!5m2!1sen!2sus"
            width="100%"
            height="400"
          />
        </div>
      </div>
    </div>
  );
};

export default Contact;