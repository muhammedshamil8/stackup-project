import { Link, useNavigate, Outlet } from "react-router-dom";
import React, { useEffect, useState } from 'react';
import axios from "axios";
import './task-page.css';
import SearchIcon from '../../public/search icon.png'
import BGImage from '../../public/photon.svg'
export default function Dashboard() {
  const userId = localStorage.getItem('userId');
  const Navigate = useNavigate();
  const [user, setUser] = useState(null);
  const [error, setError] = useState(null);
  const [projectOptions, setProjectOptions] = useState([]);

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


  useEffect(() => {

    axios.get(`http://localhost:9000/api/createProject.php?userId=${userId}`)
      .then((response) => {
        if (Array.isArray(response.data.projects)) {
          setProjectOptions(response.data.projects);
        } else {
          console.error('Invalid projects format in the response:', response.data.projects);
        }
      })
      .catch((error) => {
        console.error('Error fetching projects:', error);
      });
  }, [userId]);


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
  const projectColors = ['#0fb62b', '#007bff', '#e44d26', '#ffcc29', '#673ab7'];
  return (
    <div className="dashboard">

      {/* <p>{image}</p> */}
      <div  className="search">
      <input type="search" placeholder="Search Task" className="search-bar"/>
      <button className="search-btn"><img src={SearchIcon} className="searchIcon"/></button>
      </div>
      
      <div className="parent-card">
    {Array.isArray(projectOptions) && projectOptions.map((project, index) => (
        <Link to="/project" className="project-card" key={project.project_id} style={{
          background: `linear-gradient(45deg, ${projectColors[index % projectColors.length]}, ${projectColors[index % projectColors.length]})`,
      }}>
            <div className="project-open" >
                <div>
                    <p style={{ color: '#fff', margin: 0 }}>{project.project_name}</p>
                </div>
            </div>
        </Link>
    ))}
</div>

<div className="task-card">
  
<p className="task-p">My Tasks</p>
<ul className="task-list">

        <li>
        <span class="material-symbols-outlined">
                           Done
                           </span>
          <Link to="/taskdone" className="list-done">Task done</Link>
        </li>

        <li>
        <span class="material-symbols-outlined">
                           sync
                           </span>
          <Link to="/taskonprogress" className="list-done">Task progress</Link>
        </li>

        <li>
        <span class="material-symbols-outlined">
                           format_list_bulleted
                           </span>
                           
          <Link to="/todolist" className="list-done">Task list</Link>
        </li>

      </ul>

</div>
     

                  

               </div>

  )
}




