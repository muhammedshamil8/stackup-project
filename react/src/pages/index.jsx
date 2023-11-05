import { Link, useNavigate } from "react-router-dom";
import React, { useEffect, useState } from 'react';

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
        <header className="index-header">
                    <div>
                <button><Link to="/dashboard">Dashboard</Link></button>
                <button><Link to="/dashboard">Dashboard</Link></button>
                    </div>
                  
                </header>
        )}
      </div>
    );
  }