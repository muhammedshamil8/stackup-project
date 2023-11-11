import { NavLink, useNavigate, useLocation, Outlet } from "react-router-dom";
import React, { useEffect, useState } from 'react';
import axios from "axios";
import boyImage from '../../public/boy.webp';
import girlImage from '../../public/girl.webp';
import defualtImage from '../../public/defualt.webp';
import home from '../../public/home.svg';
import calender from '../../public/calender.svg';
import profile from '../../public/profile.svg';
import addTask from '../../public/add.svg';
import LodingImg from '../../public/logo@2x.png'
export default function DefaultLayout() {
    const Navigate = useNavigate();
    const location = useLocation();
    const [user, setUser] = useState(null);
    const [error, setError] = useState(null);
    const [isLoading, setLoading] = useState(true);
    const [showCard, setShowCard] = useState(false);
    const [darkMode, setDarkMode] = useState(false);

    const toggleCard = () => {
        setShowCard(!showCard);
    };

    const toggleDarkMode = () => {
        setDarkMode(!darkMode);
        const body = document.body;

        if (darkMode) {
            // If dark mode is currently active, switch to light mode
            body.style.backgroundColor = '#fff'; // Change to your light mode background color
            body.style.color = '#333'; // Change to your light mode text color
        } else {
            // If dark mode is not active, switch to dark mode
            body.style.backgroundColor = '#333'; // Change to your dark mode background color
            body.style.color = '#fff'; // Change to your dark mode text color
        }
    };

    useEffect(() => {
        setTimeout(() => {
            setLoading(false);
        }, 1500);
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
                    localStorage.removeItem('userId');
                    Navigate("/login");
                })

        }
    }, []);


    function logout() {
        axios.get("http://localhost:9000/api/logout.php")
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
                <div id="defaultLayout">

                    <div className="content">
                        <header>
                            <div className="header-right-section">
                                <div>
                                    <img src={nop} className="profile-image" />
                                </div>
                                <div className="profile-info">
                                    <p>{user.username}</p>
                                    <p>{user.profession}</p>
                                </div>
                            </div>
                            <div className="header-center-section">
                                <NavLink to="/dashboard" className={`center-child ${location.pathname === '/dashboard' ? 'active-link' : ''}`}>
                                    Home
                                </NavLink>
                                <NavLink to="/addtask" className={`center-child ${location.pathname === '/addtask' ? 'active-link' : ''}`}>
                                    Create Task
                                </NavLink>
                                <NavLink to="/users" className={`center-child ${location.pathname === '/users' ? 'active-link' : ''}`}>
                                    Profile
                                </NavLink>
                                <NavLink to="/calender" className={`center-child ${location.pathname === '/calender' ? 'active-link' : ''}`}>
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
                                        <button className="nav-button-child"> About us</button>
                                        <button className="nav-button-child">Connect us</button>
                                        <button className="nav-button-child" onClick={logout}>Log out </button>
                                    </div>
                                )}
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
                        <div className="header-center-section-mobile">
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

