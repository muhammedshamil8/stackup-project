import { Link, useNavigate } from "react-router-dom";
import React, { useEffect, useState } from 'react';
import zeraImage from '../../../zera.jpg';

export default function Index() {
    const Navigate = useNavigate();
    const [isLoading, setLoading] = useState(true); 

  // Simulate loading delay (remove this in production)
  useEffect(() => {
    setTimeout(() => {
        setLoading(false); // Set loading to false after the delay
    }, 1500); // Adjust the delay time as needed
}, []);
    const userId = localStorage.getItem('userId');
    if (userId) {
Navigate('/dashboard')
    }

    return (
      <div className="index">
         {isLoading ? (
            <div className="overlay">
                <div className="loading-spinner">Index...</div>
            </div>
        ) : (
        <div className="index-header">
                    <div className="index-card">
                        <img src={zeraImage} className="index-image"></img>
                        <p>Effortlessy Organize Your Task with<br />Our Task <span>Management App</span></p>

                <button className="index-btn"><Link to="/signup" className="index-btn-child">Get started</Link></button>
                    </div>
                  
                </div>
        )}
      </div>
    );
  }