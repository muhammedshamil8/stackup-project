import { Link, useNavigate, Outlet } from "react-router-dom";
import React, { useEffect, useState } from 'react';
import axios from "axios";

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

    return (
        <div >
            {isLoading ? (
                <div className="overlay">
                    <div className="loading-spinner">Index...</div>
                </div>
            ) : (
                <div id="defaultLayout">
                    <aside>
                        <Link to="/dashboard">Dashboard</Link>
                        <Link to="/users">Tasks</Link>
                        <Link to="/addtask">Create Task</Link>
                        <Link to="/users">Profile</Link>
                    </aside>
                    <div className="content">
                        <header>
                            <div>
                                Header
                            </div>
                            <div className="header-left-section">
                                <p>{user.username}</p>
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
                </div>
            )}
        </div>
    );
}

