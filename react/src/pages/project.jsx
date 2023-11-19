import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Link, useNavigate, useParams } from 'react-router-dom';
import './task-page.css';

export default function Project() {
  const { projectId } = useParams();
  const userId = localStorage.getItem('userId');
  const [projectDetails, setProjectDetails] = useState([]);
  const [editMode, setEditMode] = useState(false);
  const [teamcard, setTeamcard] = useState(false);
  const [editedProjectDescription, setEditedProjectDescription] = useState('');
  const [teamInputs, setTeamInputs] = useState({
    selectedTeam: '',
  });
  const [teamSuggestions, setTeamSuggestions] = useState([]);
  const [teamMembers, setTeamMembers] = useState([]);
  const [projectDescription, setProjectDescription] = useState('');
  const navigate = useNavigate();
  const api = axios.create({
    baseURL: 'https://task-managment-app.k.strikerlulu.me',
  });
  //   const api = axios.create({
  //     baseURL: 'http://localhost:9000/api',
  // });

  const handleEdit = () => {
    setEditMode(!editMode);
    setEditedProjectDescription(projectDetails[0]?.project_description || '');
  };
  const handleTeamcard = () => {
    setTeamcard(!teamcard);
  };

  const fetchProject = async () => {
    try {
      const response = await api.get(`/getprojectTasks.php?userId=${userId}&projectId=${projectId}`);

      if (response.data.status === 1) {
        setProjectDetails(response.data.projectDetails);
        setProjectDescription(response.data.projectDetails[0]?.project_description || '');
      } else {
        console.error('Error fetching project tasks. Server response:', response.data);
      }
    } catch (error) {
      console.error('Error fetching project tasks:', error);
    }
  };

  useEffect(() => {
    fetchProject();
  }, []);

  const handleTeamSearch = async (searchTerm) => {
    try {
      const response = await api.get(`/members.php?searchTerm=${searchTerm}`);
      setTeamSuggestions(response.data.teams);
    } catch (error) {
      console.error('Error fetching team suggestions:', error);
    }
  };

  const handleTeamSelect = (selectedTeam) => {
    setTeamInputs({
      ...teamInputs,
      selectedTeam: selectedTeam.name,
    });
    setTeamSuggestions([]); // Clear the team suggestions
    // Add the selected team to the team members list
    setTeamMembers([...teamMembers, selectedTeam]);
  };
  const handleAddTeamMember = async () => {
    alert('Add team member function on process');
    // try {
    //   console.log('Team members:', teamMembers);
    //   // Implement logic to add team members to the project
    // } catch (error) {
    //   console.error('Error adding team member:', error);
    // }
  };

  const handleDeleteProject = async () => {
    const isConfirmed = window.confirm('Are you sure you want to delete this Project?');

    if (isConfirmed) {
      try {
        const response = await api.post('/getprojectTasks.php', {
          action: 'deleteProject',
          projectId: projectId,
        });

        if (response.data.status === 1) {
          console.log('Project deleted successfully');
          navigate('/dashboard');
          // Redirect or perform other actions after deletion
        } else {
          console.error('Error deleting project:', response.data.message);
          alert('Failed to delete project. Please try again.'); // Add a user-friendly alert
        }
      } catch (error) {
        console.error('Error deleting project:', error);
        alert('An unexpected error occurred. Please try again later.'); // Add a user-friendly alert
      }
    }
  };


  const handleUpdateProject = async () => {
    try {
      const response = await api.post('/getprojectTasks.php', {
        action: 'updateProject',
        projectId: projectId,
        projectDescription: editedProjectDescription,
      });

      if (response.data.status === 1) {
        console.log('Project updated successfully');
        setEditMode(false);
        fetchProject(); // Fetch project details again to update the UI
      } else {
        console.error('Error updating project:', response.data.message);
      }
    } catch (error) {
      console.error('Error updating project:', error);
    }
  };




  return (
    <div className="project-page">
      <div className="project-banner">
        <h1>{projectDetails[0]?.project_name}</h1>
      </div>

      <div className="project-details">
        <fieldset className="fieldset-container">
        <legend style={{ wordWrap: 'break-word' }}>
          <strong>Project Description:</strong>
        </legend>
        {editMode ? (
          <div className='project-description-edit'>

            <textarea
              type="text"

              value={editedProjectDescription}
              onChange={(e) => setEditedProjectDescription(e.target.value)}
            />
          </div>

        ) : (
          <div >
            <p className='description-p'>
              {projectDetails[0]?.project_description}

            </p>

          </div>

        )}
        </fieldset>
        <div className="action-buttons">
          {!editMode && <button onClick={handleEdit}>Edit</button>}
          {editMode && (
            <>
              <button onClick={handleUpdateProject}>Update Project</button>
              <button onClick={() => setEditMode(false)}>Cancel</button>
            </>
          )}
          <button onClick={handleDeleteProject}>Delete Project</button>
        </div>
        <hr />
        {/* Add Teams Section */}
        <button onClick={handleAddTeamMember} style={{ margin: '30px' }}className='create-cancel-btn'>Add Teams </button>
        {/* <div className="add-teams-section">
          <input
            type="text"
            value={teamInputs.selectedTeam}
            placeholder="Enter username"
            onChange={(e) => handleTeamSearch(e.target.value)}
          />
          <ul>
            {teamSuggestions.map((team) => (
              <li key={team.id} onClick={() => handleTeamSelect(team)}>
                {team.name}
              </li>
            ))}
          </ul>
          <button onClick={handleAddTeamMember}>Add Team Member</button>
        </div> */}

        {/* <div>
          <h2>Team Members
          <button onClick={handleTeamcard}>show</button></h2>
          {teamcard && (<div>
            card
            <ul>
            {teamMembers.map((member, index) => (
              <li key={index}>{member.name}</li>
            ))}
          </ul>
          <button onClick={() => setTeamcard(false)}>Cancel</button>

          </div>)}
          
        </div> */}

        <div>
          <h2>Project Tasks</h2>

          {/* Navigation Links */}
          <ul className="task-list">
            <li>
              <span className="material-symbols-outlined">format_list_bulleted</span>
              <Link to={`/projectTodolist/${projectId}`} className="list-done">
                Task list
              </Link>
            </li>
            <li>
              <span className="material-symbols-outlined">sync</span>
              <Link to={`/projectTodoprogress/${projectId}`} className="list-done">
                Task progress
              </Link>
            </li>
            <li>
              <span className="material-symbols-outlined">Done</span>
              <Link to={`/projectTododone/${projectId}`} className="list-done">
                Task done
              </Link>
            </li>
          </ul>
        </div>
      </div>

    </div>
  );
}
