import { NavLink, useNavigate, useLocation, Outlet } from "react-router-dom";
import React, { useEffect, useState } from 'react';
import axios from "axios";
import boyImage from '../images/boy.webp';
import girlImage from '../images/girl.webp';
import defualtImage from '../images/defualt.webp';
import home from '../images/home.svg';
import calender from '../images/calender.svg';
import profile from '../images/profile.svg';
import addTask from '../images/add.svg';
import LodingImg from '../images/logo@2x.png'
import axiosClient from "../axiosClient";


export default function DefaultLayout() {
    const Navigate = useNavigate();
    const location = useLocation();
    const [user, setUser] = useState(null);
    const [error, setError] = useState(null);
    const [isLoading, setLoading] = useState(true);
    const [showCard, setShowCard] = useState(false);
    const [darkMode, setDarkMode] = useState(
        localStorage.getItem('darkMode') === 'true'
    );

    const toggleCard = () => {
        setShowCard(!showCard);
    };


    const toggleDarkMode = () => {
        const appContainer = document.getElementById('defaultLayout');
        appContainer.classList.toggle('dark-mode');
      // Toggle darkMode and update state
  const newDarkModeValue = !darkMode;
  setDarkMode(newDarkModeValue);

  // Save darkMode preference to local storage
  localStorage.setItem('darkMode', JSON.stringify(newDarkModeValue));
        const body = document.body;
        const header = document.body.querySelector('header');
        if (darkMode) {
            body.style.backgroundColor = '#fff';
            body.style.color = '#1a1a1a';
            header.style.backgroundColor = '#fff';
            header.style.color = '#fff';
        } else {
            body.style.backgroundColor = '#333';
            body.style.color = '#fff';
            header.style.backgroundColor = '#1a1a1a';
            header.style.color = '#fff';
        }
    };

    useEffect(() => {
        setTimeout(() => {
            setLoading(false);
        }, 1500);
    }, []);


    useEffect(() => {
        getUser();
    }, []);

    const getUser = () => {
        const userId = localStorage.getItem('userId');
        if (userId) {
            axiosClient.get(`/home.php?userId=${userId}`)
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
                    alert("Server error. Unable to fetch user data. Check the network tab for more details. i think backend is down")
                    localStorage.removeItem('userId');
                    Navigate("/login");
                });
        } else {
            axiosClient.get("/logout.php")
                .then(function (response) {
                    localStorage.removeItem('userId');
                    Navigate("/login");
                })

        }
    };

    function about() {
        Navigate("/about");

    }
    function contact() {
        Navigate("/contact");

    }

    function logout() {
        axiosClient.get("/logout.php")
            .then(function (response) {
                localStorage.removeItem('userId');
                Navigate("/login");
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
                <div className="loading-container">
                    <img src={LodingImg} className="loading-spinner" />
                </div>
            ) : (
                <div id="defaultLayout" >

                    <div className="content">
                        <header className={`${darkMode ? 'dark-mode' : ''}`}>
                            <div className="header-right-section">
                                <div>
                                    <img src={nop} className="profile-image" />
                                </div>
                                <div className={`profile-info ${darkMode ? 'dark-mode' : ''} `}>
                                    <p className={`${darkMode ? 'dark-mode' : ''}`}>{user.username}</p>
                                    <p className={`${darkMode ? 'dark-mode-down' : ''}`}>{user.profession}</p>
                                </div>
                            </div>
                            <div className={`header-center-section ${darkMode ? 'dark-mode' : ''}`}>
                                <NavLink to="/dashboard" className={`center-child ${location.pathname === '/dashboard' ? 'active-link' : ''} ${darkMode ? 'dark-mode' : ''}`}>
                                    Home
                                </NavLink>
                                <NavLink to="/addtask" className={`center-child ${location.pathname === '/addtask' ? 'active-link' : ''} ${darkMode ? 'dark-mode' : ''}`}>
                                    Create Task
                                </NavLink>
                                <NavLink to="/users" className={`center-child ${location.pathname === '/users' ? 'active-link' : ''} ${darkMode ? 'dark-mode' : ''}`}>
                                    Profile
                                </NavLink>
                                <NavLink to="/calender" className={`center-child ${location.pathname === '/calender' ? 'active-link' : ''} ${darkMode ? 'dark-mode' : ''}`}>
                                    Calendar
                                </NavLink>
                            </div>
                            {/* <div className="header-left-section"> */}



                            {/* </div> */}

                            <div className={`your-component ${darkMode ? 'dark-mode' : ''}`}>
                                <button className={`nav-button ${showCard ? 'active' : ''}`} onClick={toggleCard}>
                                    <span className="line"></span>
                                    <span className="line middle-line"></span>
                                    <span className="line"></span>
                                </button>



                                {showCard && (
                                    <div className="card">
                                        <button className="nav-button-child" onClick={toggleDarkMode}>
                                            {darkMode ? 'Light Mode' : 'Dark Mode'}
                                        </button>
                                        <button className="nav-button-child" onClick={about}> About us</button>
                                        <button className="nav-button-child" onClick={contact}>Connect us</button>
                                        <button className="nav-button-child" onClick={logout}>Log out </button>
                                    </div>
                                )}
                            </div>


                        </header>

                        <main className={`${darkMode ? 'dark-mode-body' : 'light-mode-body'}`}>
                            {user ? (
                                <div className="main-body">

                                    <Outlet  context={[darkMode]} />


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
                        <div className={`header-center-section-mobile ${darkMode ? 'dark-mode' : ''}`}>
                            <NavLink to="/dashboard" className={`center-child-mobile ${location.pathname === '/dashboard' ? 'active-link-mobile' : ''}`}>
                                <img src={home} />
                            </NavLink>

                            <NavLink to="/addtask" className={`center-child-mobile ${location.pathname === '/addtask' ? 'active-link-mobile' : ''}`}>
                                <img src={addTask} />

                            </NavLink>
                            <NavLink to="/calender" className={`center-child-mobile ${location.pathname === '/calender' ? 'active-link-mobile' : ''}`}>
                                <img src={calender} />

                            </NavLink>

                            <NavLink to="/users" className={`center-child-mobile ${location.pathname === '/users' ? 'active-link-mobile' : ''}`}>
                                <img src={profile} />

                            </NavLink>

                        </div>
                    </footer>
                </div>

            )}
        </div>
    );
}

