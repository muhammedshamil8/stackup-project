import { Link, useNavigate, Outlet } from "react-router-dom";
import React, { useEffect, useState } from 'react';
import axios from "axios";

export default function DefaultLayout() {
    const Navigate = useNavigate();
    const [user, setUser] = useState(null);
    const [error, setError] = useState(null);

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
        }else{
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
        <div id="defaultLayout">
            <aside>
                <Link to="/dashboard">Dashboard</Link>
                <Link to="/users">Users</Link>
            </aside>
            <div className="content">
                <header>
                    <div>
                        Header
                    </div>
                    <button onClick={logout}>
                        Log Out
                    </button>
                </header>
                <main>
                    {user ? (
                        <div>
                            <h1>Welcome, {user.username}!</h1>
                            {/* Display other user information */}
                            {error && <div className="error">{error}</div>}
                        </div>
                    ) : (
                        <div>
                            <p>{error || "You are not authenticated. Please log in."}</p>
                            {/* Implement redirection or login link */}
                        </div>
                    )}
                    <Outlet />
                </main>
            </div>
        </div>
    )
}
