// ContactUs.js

import React from 'react';
import './contactUsStyles.css';

export default function ContactUs() {
  return (
    <div className="contact-us-container">
      <h1>Contact Us</h1>
      <p>Feel free to reach out to us!</p>
      <div className="contact-form">
        <label htmlFor="name">Name:</label>
        <input type="text" id="name" name="name" />

        <label htmlFor="email">Email:</label>
        <input type="email" id="email" name="email" />

        <label htmlFor="message">Message:</label>
        <textarea id="message" name="message" rows="4"></textarea>

        <button onClick={alert('cooming soon!')}>Submit</button>
      </div>
    </div>
  );
}
