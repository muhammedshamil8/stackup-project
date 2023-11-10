import { Link, useNavigate, Outlet } from "react-router-dom";
import React, { useEffect, useState } from 'react';
import axios from "axios";
import './task-page.css';


export default function Dashboard() {
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
        } else {
            axios.get("http://localhost:9000/api/logout.php")
                .then(function (response) {
                    // Handle logout success
                    localStorage.removeItem('userId'); // Remove 'userId' from localStorage
                    Navigate("/login"); // Redirect to the login page
                })

        }
    }, []);

       
    // let image = "";

    // if (user && user.pronounce !== null) {
    //   if (user.pronounce === 0) {
    //     image = "hello default";
    //   } else if (user.pronounce === 1) {
    //     image = "hello boy";
    //   } else if (user.pronounce === 2) {
    //     image = "hello girl";
    //   }
    // }
    return (
        <div>
                                {/* <p>{image}</p> */}

            <ul className="task-list">
                <li>
                    <Link to="/taskdone" className="list-done">Task done</Link>
                </li>

                <li>
                    <Link to="/taskonprogress" className="list-done">Task progress</Link>
                </li>

                <li>
                    <Link to="/todolist" className="list-done">Task list</Link>
                </li>

                <li>
                    <Link to="/project" className="list-done">Task project</Link>
                </li>
            </ul>



        </div>
    )
}




