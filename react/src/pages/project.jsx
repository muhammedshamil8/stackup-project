import { Link, useNavigate, Outlet } from "react-router-dom";
import React, { useEffect, useState } from 'react';
import axios from "axios";
import './task-page.css';

export default function Project(){
  const Navigate = useNavigate();

//      const [teamInputs, setTeamInputs] = useState({
//     selectedTeam: '',
//   });
//   const [teamSuggestions, setTeamSuggestions] = useState([]);
//  const handleTeamSearch = async (searchTerm) => {
//     // Implement the logic to fetch team suggestions based on the searchTerm
//     // Update the teamSuggestions state with the fetched suggestions
//     setTeamInputs({
//       ...teamInputs,
//       selectedTeam: searchTerm,
//     });
//   };

//   const handleTeamSelect = (team) => {
//     setTeamInputs({
//       ...teamInputs,
//       selectedTeam: team.name,
//     });
//     setTeamSuggestions([]); // Clear the team suggestions
//   };
    return (
        <div className="project-page">
        Task project

        <p>Not completed this project stuff adding members and all things are balance/uncompleted...! </p>


        <button>Add Teams</button>
        <button>Delete</button>
        <button>Update</button>
        <br />
        <br />
        <br />
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

            </ul>
        </div>
    )
}