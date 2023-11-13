import { Link, useNavigate, Outlet } from "react-router-dom";
import React, { useEffect, useState } from 'react';
import axios from "axios";
import './task-page.css';
import SearchIcon from '../../public/search icon.png'
import tasklist from '../../public/todo.svg';
import taskdone from '../../public/tododone.svg';
import taskprogress from '../../public/todoprogress.svg';

export default function Dashboard() {
  const userId = localStorage.getItem('userId');
  const Navigate = useNavigate();
  const [user, setUser] = useState(null);
  const [error, setError] = useState(null);
  const [projectOptions, setProjectOptions] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [searchResults, setSearchResults] = useState([]);
  const [darkMode, setDarkMode] = useState(false);

  const api = axios.create({
    baseURL: 'https://test.shamil.strikerlulu.me',
  });
  //   const api = axios.create({
  //     baseURL: 'http://localhost:9000/api',
  // });

  const toggleDarkMode = () => {
    setDarkMode(!darkMode);
    const body = document.body;
    const header = document.body.querySelector('header');
   
};
  useEffect(() => {
    const userId = localStorage.getItem('userId');
    if (userId) {
      api.get(`/home.php?userId=${userId}`)
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
      api.get("/logout.php")
        .then(function (response) {
          // Handle logout success
          localStorage.removeItem('userId'); // Remove 'userId' from localStorage
          Navigate("/login"); // Redirect to the login page
        })

    }
  }, []);


  useEffect(() => {

    api.get(`/createProject.php?userId=${userId}`)
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

  const handleSearch = () => {
    // Check if the search term is empty
    if (searchTerm.trim() !== '') {
      // Make a request to search for tasks based on the searchTerm
      api.get(`/tasks.php?userId=${userId}&searchTerm=${searchTerm}`)
        .then((response) => {
          if (response.data.status === 1 && Array.isArray(response.data.tasks)) {
            setSearchResults(response.data.tasks);
          } else {
            // Handle no results found
            setSearchResults([]);
          }
        })
        .catch((error) => {
          setError('Error fetching projects. Please try again later.');
        });
    } else {
      // If the search term is empty, clear the search results
      setSearchResults([]);
    }
  };


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
  const handleOpenClick = (taskId) => {
    // Use the navigate function to go to the "/todo" route with the taskId as a parameter
    Navigate(`/todo/${taskId}`);
  };
  const clearSearchResults = () => {
    setSearchTerm(''); // Clear the search term
    setSearchResults([]); // Clear the search results
  };
  const getPriorityClass = (priority) => {
    switch (priority) {
      case 1:
        return "low";
      case 2:
        return "medium";
      case 3:
        return "high";
      default:
        return "";
    }
  };

  const getPriorityLabel = (priority) => {
    switch (priority) {
      case 1:
        return "Low";
      case 2:
        return "Medium";
      case 3:
        return "High";
      default:
        return "";
    }
  };

  const projectColors = ['#0fb62b', '#007bff', '#e44d26', '#ffcc29', '#673ab7'];

  //   if (searchTerm === '') {
  //     setSearchResults([]);
  // }


  return (
    <div className="dashboard">

      <div className="search">
        <input
          type="search"
          placeholder="Search Task"
          className={`search-bar ${darkMode ? 'dark-mode' : ''}`}
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          onKeyUp={handleSearch}
        />

        <button className="search-btn" onClick={handleSearch}>
          <img src={SearchIcon} className="searchIcon" alt="Search Icon" />
        </button>
      </div>



      {searchResults.length > 0 && (

        <div className="search-results">
          <button className="clear-search-btn" onClick={clearSearchResults}>
            Clear Search Results
          </button>
          {searchResults.length === 0 && searchTerm.trim() !== '' && (
            <p>No results found. Please try a different search term.</p>
          )}
          <h2 className="head-search">Matches Tasks</h2>
          <ol className="search-ol">
            {searchResults.map((result) => (
              <div key={result.task_id}>
                <li className="search-li">{result.task_name}&nbsp;<span className={`priority ${getPriorityClass(result.priority)}`}>
                  {getPriorityLabel(result.priority)}
                </span> <Link to={`/todo/${result.task_id}`} className="search-open">Details</Link></li>
                <li className="search-li-mobile">{result.task_name}&nbsp;<span><span className={`priority ${getPriorityClass(result.priority)}`}>
                  {getPriorityLabel(result.priority)}
                </span> <Link to={`/todo/${result.task_id}`} className="search-open">Details</Link></span></li>

              </div>
            ))}
          </ol>

        </div>
      )}
      {/* why i dont know above user friendly message not dispalying that why dublicate it .. */}
      {searchResults.length === 0 && searchTerm.trim() !== '' && (
        <p>No results found. Please try a different search term.</p>
      )}

      <div >
        <div className="project-p">
          <h2 >Projects</h2>

        </div>
        <div className="parent-card">
          {Array.isArray(projectOptions) && projectOptions.length > 0 ? (
            projectOptions.map((project, index) => (
              <Link
              to={`/project/${project.project_id}`} 
                className="project-card"
                key={project.project_id}
                style={{
                  backgroundColor: projectColors[index % projectColors.length],

                  // background: `linear-gradient(45deg, ${projectColors[index % projectColors.length]}, ${projectColors[index % projectColors.length]})`,

                }}
              >
                <div className="project-card-banner">10 days</div>
                <div className="project--name">
                  <p >{project.project_name}</p>
                </div>
                <div className="project-card-bar">
                  <div className="project-bar-child1">Progress</div>
                  <div className="progress-bar">
                    <div className="progress"></div>
                  </div>
                  <div className="project-bar-child3">70%</div>
                </div>

              </Link>
            ))

          ) : (


            <div>No project data avialable</div>
          )}
        </div>

      </div>


      <div className={`task-card ${darkMode ? 'dark-mode' : ''}`}>

        <h2 className="task-p">My Tasks</h2>
        <ul className="task-list">

        <li>
            <span class="material-symbols-outlined">
              format_list_bulleted
            </span>
            {/* <img src={tasklist} className="task-logo"/> */}

            <Link to="/todolist" className="list-done">Task list</Link>
          </li>

          <li>
            <span class="material-symbols-outlined">
              sync
            </span>
            {/* <img src={taskprogress} className="task-logo"/> */}

            <Link to="/taskonprogress" className="list-done">Task progress</Link>
          </li>

        
          <li>
            <span class="material-symbols-outlined">
              Done
            </span>
            {/* <img src={taskdone} className="task-logo"/> */}

            <Link to="/taskdone" className="list-done">Task done</Link>
          </li>

        </ul>

      </div>




    </div >

  )
}




