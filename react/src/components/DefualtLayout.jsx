import { Link, useNavigate, Outlet } from "react-router-dom";
import React, { useEffect, useState } from 'react';
import axios from "axios";
import boyImage from '../../public/boy.webp';
import girlImage from '../../public/girl.webp';
import defualtImage from '../../public/defualt.webp';

export default function DefaultLayout() {
    const Navigate = useNavigate();
    const [user, setUser] = useState(null);
    const [error, setError] = useState(null);
    const [isLoading, setLoading] = useState(true); // Initial state: loading is true

    // Simulate loading delay (remove this in production)
    useEffect(() => {
        setTimeout(() => {
            setLoading(false); // Set loading to false after the delay
        }, 1500); // Adjust the delay time as needed
    }, []);
   

    useEffect(() => {
        const userId = localStorage.getItem('userId');
        if (userId) {
            axios.get(`http://localhost:9000/api/home.php?userId=${userId}`)
                .then(function (response) {
                    if (response.data.username) {
                        setUser(response.data);
                       
                        
                    } else {
                        setError("Username not found. Please log in.");
                    }
                })
                .catch(function (error) {
                    console.error("Error: " + error);
                    setError("Server error. Unable to fetch user data. Check the network tab for more details.");
                });
        } else {
            axios.get("http://localhost:9000/api/logout.php")
                .then(function (response) {
                    // Handle logout success
                    localStorage.removeItem('userId'); // Remove 'userId' from localStorage
                    Navigate("/login"); // Redirect to the login page
                })

        }
    }, []);


    function logout() {
        axios.get("http://localhost:9000/api/logout.php")
            .then(function (response) {
                // Handle logout success
                localStorage.removeItem('userId'); // Remove 'userId' from localStorage
                Navigate("/login"); // Redirect to the login page
            })
            .catch(function (error) {
                console.error("Logout error: " + error);
            });
    }
    let nop = "";

    if (user && user.pronounce !== null) {
      if (user.pronounce === 0) {
        nop = defualtImage;
      } else if (user.pronounce === 1) {
        nop = boyImage;
      } else if (user.pronounce === 2) {
        nop = girlImage;
      }
    }
     
    return (
        <div >
            {isLoading ? (
                <div className="overlay">
                    <div className="loading-spinner"></div>
                </div>
            ) : (
                <div id="defaultLayout">
                   
                    <div className="content">
                        <header>
                            <div className="header-right-section">
                                <div>
                                    <img src={nop} className="profile-image"/>
                                </div>
                                <div className="profile-info">
                                    <p>{user.username}</p>
                                    <p>{user.profession}</p>
                                </div>
                            </div>
                            <div className="header-center-section">
                            <Link to="/dashboard" className="center-child">Home</Link>
                        <Link to="/addtask" className="center-child">Create Task</Link>
                        <Link to="/users" className="center-child">Profile</Link>
                        <Link to="/calender" className="center-child">calender</Link>
                            </div>
                            <div className="header-left-section">
                                <button onClick={logout}>
                                    Log Out
                                </button>
                            </div>

                        </header>
                        <main>
                            {user ? (
                                <div>

                                    <Outlet user={user} />


                                    {error && <div className="error">{error}</div>}
                                </div>
                            ) : (
                                <div>
                                    <p>{error || "You are not authenticated. Please log in."}</p>
                                    {logout}
                                </div>
                            )}
                        </main>
                       
                    </div>
                    <footer>
                        <div className="header-center-section">
                            <Link to="/dashboard" className="center-child">Home</Link>
                        <Link to="/addtask" className="center-child">Create Task</Link>
                        <Link to="/calender" className="center-child">calender</Link>
                        <Link to="/users" className="center-child">Profile</Link>
                            </div>
                        </footer>
                </div>
            )}
        </div>
    );
}

