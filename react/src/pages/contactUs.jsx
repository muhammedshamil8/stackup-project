// ContactUs.js

import React from 'react';
import './contactUsStyles.css';
import { useOutletContext } from "react-router-dom";

export default function ContactUs() {
  const [darkMode] = useOutletContext();

 const submit = () => {
    alert('Thank you for your message!');
  };  
  return (
    <div className="contact-us-container">
      <h1>Contact Us</h1>
      <p>Feel free to reach out to us!</p>
      <div className="contact-form">
        <label htmlFor="name" className='contact-label'>Name:</label>
        <input type="text" id="name" name="name" className='contact-input'/>

        <label htmlFor="email">Email:</label>
        <input type="email" id="email" name="email"  className='contact-input'/>

        <label htmlFor="message">Message:</label>
        <textarea id="message" name="message" rows="4"  className='contact-input'></textarea>

        <button onClick={submit} className='contact-btn'>Submit</button>
      </div>
    </div>
  );
}
