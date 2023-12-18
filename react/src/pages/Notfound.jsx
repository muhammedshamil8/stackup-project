// NotFound.jsx

import React from 'react';
// import smileyImage from '../images/smile-image.png'; // Replace with the actual path

export default function NotFound() {
  return (
    <div className="not-found-page">
      <div className="smiley-container">
        {/* <img src={smileyImage} alt="Smiley" className="smiley-image" /> */}
      </div>
      <div className="error-text">
       <p>
       <span className="oops">Oops!</span>
        </p>
        <br />
        4 {String.fromCodePoint(0x1F62D)} 4  
        <p></p>sorry ,page not found 
      </div>
      <p>The page you requested could not be found</p>
    </div>
  );
}
