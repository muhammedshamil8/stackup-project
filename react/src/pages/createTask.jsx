import React, { useState, useEffect } from 'react';
import { useNavigate ,useOutletContext } from 'react-router-dom';
import axios from 'axios';
import '../CreateTask.css'; // Import your CSS file
import axiosClient from "../axiosClient";

const CreateTask = () => {
  const userId = localStorage.getItem('userId');
  const [darkMode] = useOutletContext();

  const [projectInputs, setProjectInputs] = useState({
    projectName: '',
    projectDescription: '',
  });

  const [projectOptions, setProjectOptions] = useState([]);


  useEffect(() => {
    ProjectData(userId);
  }, [userId]);

  function ProjectData(userId) {
    axiosClient.get(`/createProject.php?userId=${userId}`)
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
  };


  const [inputs, setInputs] = useState({
    title: '',
    startDate: '',
    endDate: '',
    taskType: '',
    priority: '1',
    description: '',
    selectedProject: '',
  });

  const [showTaskForm, setShowTaskForm] = useState(false);
  const [showProjectForm, setShowProjectForm] = useState(false);

  const [errors, setErrors] = useState({});


  const handleChange = (event) => {
    const { name, value } = event.target;

    if (name === 'startDate' || name === 'endDate') {
      setInputs((prevInputs) => ({
        ...prevInputs,
        [name]: value,
      }));
    } else if (name === 'selectedProject') {
      // Handle project input separately
      setInputs((prevInputs) => ({
        ...prevInputs,
        selectedProject: value,
      }));
    } else {
      setInputs((prevInputs) => ({
        ...prevInputs,
        [name]: value,
      }));
    }
  };




  const handleSubmit = (event) => {
    event.preventDefault();
    setErrors({}); // Clear any previous errors

    // Move the API request logic here
    const userId = localStorage.getItem('userId');
    if (userId) {
   ProjectData(userId);
      axiosClient
        .post(`/taskCreate.php?userId=${userId}`, inputs)
        .then((response) => {
          if (response.data.status === 0) {
            setErrors({ message: response.data.message });
          } else {
            setErrors({ success: response.data.message });
            setInputs({
              title: '',
              startDate: '',
              endDate: '',
              taskType: '',
              priority: '1',
              description: '',
              selectedProject: '',
            });
          }
        })
        .catch((error) => {
          console.error(error);
          setErrors({ message: 'An error occurred while creating the task.' });
        });
    }
  };


  const handleProjectSubmit = (event) => {
    event.preventDefault();
    const userId = localStorage.getItem('userId');
    ProjectData(userId);
    setErrors({}); // Clear any previous errors

    // Move the API request logic here
    if (userId) {
      axiosClient
        .post(`/createProject.php?userId=${userId}`, projectInputs)
        .then((response) => {
          if (response.data.status === 0) {
            setErrors({ message: response.data.error });
          } else {
            setErrors({ success: response.data.message });
            projectInputs.projectName = '';
            projectInputs.projectDescription = '';
            //   setTimeout(() => {
            //     window.location.reload();
            // }, 2000);
            // Additional logic for project creation success
          }

        })
        .catch((error) => {
          console.error(error);
          if (error.response && error.response.data && error.response.data.status === 0) {
            setErrors({ message: error.response.data.error });
          } else {
            console.error(error);

            setErrors({ message: 'An error occurred while creating the project.' });
          }
        });
    }
  };


  function handleAddToProject(event) {
    // Prevent the default form submission
    event.preventDefault();

    // Show the project section or perform any other logic you want
    // setCreatingProject(true);
    document.querySelector('.project-section').style.display = 'initial';
  }
  function cancelProject(event) {
    event.preventDefault();

    // setCreatingProject(false);

    document.querySelector('.project-section').style.display = 'none'
  }

  const cancelTask = () => {
    // Reset the form fields to their initial values
    setInputs({
      title: '',
      startDate: '',
      endDate: '',
      taskType: '',
      priority: '1',
      description: '',
      selectedProject: '',
    });

    // Toggle the visibility of the task form
    setShowTaskForm((prevShowTaskForm) => !prevShowTaskForm);

    // Hide the project form
    setShowProjectForm(false);
  };
  const Projectcancel = () => {
    // Reset the form fields to their initial values
    setInputs({

    });

    // Toggle the visibility of the task form
    setShowProjectForm((prevshowProjectForm) => !prevshowProjectForm);

    // Hide the project form
    setShowTaskForm(false);
  };
  return (
    <div className={`cTask-card ${darkMode ? 'dark-mode-task' : ''}`}>
      {/* {errors.message && <div className="error">{errors.message}</div>} */}
      {errors && Object.keys(errors).length > 0 && (
        <div className="error-message">
          {Object.entries(errors).map(([key, value], index) => (
            <p key={index} className={key === 'success' ? 'success-message' : ''}>
              {value}
            </p>
          ))}
        </div>
      )}
      <div className="form-buttons">
        <button className={showTaskForm ? 'create-cancel-btn' : 'add-button task-btn'} onClick={cancelTask}>
          {showTaskForm ? 'Cancel Task' : 'Create Task'}
        </button>
        <button className={showProjectForm ? 'create-cancel-btn' : 'add-button project-btn'} onClick={Projectcancel}>
          {showProjectForm ? 'Cancel project' : 'Create project'}
        </button>
      </div>

      {showTaskForm && (
        <form onSubmit={handleSubmit} className={` ${showTaskForm ? 'active1' : 'hide'} ${darkMode ? 'dark-mode-task' : ''}`}>
          <div className='heading'>
            <h1>Create Task</h1>
          </div>

          <label htmlFor="title" >Task Name</label>
          <input
            type="text"
            id="title"
            name="title"
            value={inputs.title}
            onChange={handleChange}
            placeholder="eg- index"
          />

          <label htmlFor="startDate">Start Date</label>
          <input
            type="date"
            id="startDate"
            name="startDate"
            value={inputs.startDate}
            onChange={handleChange}
            className='date'
          />

          <label htmlFor="endDate">End Date</label>
          <input
            type="date"
            id="endDate"
            name="endDate"
            value={inputs.endDate}
            onChange={handleChange}
            className='date'

          />


          <label htmlFor="taskType" >Task Type</label>
          <input
            type="text"
            id="taskType"
            name="taskType"
            value={inputs.taskType}
            onChange={handleChange}
            placeholder="eg- designing"
          />

          <label htmlFor="priority">Priority</label>
          <select
            id="priority"
            name="priority"
            value={inputs.priority}
            onChange={handleChange}
          >
            <option value="1">Low</option>
            <option value="2">Medium</option>
            <option value="3">High</option>
          </select>


          <label htmlFor="description">Description</label>
          <textarea
            id="description"
            name="description"
            value={inputs.description}
            onChange={handleChange}
            rows="3"
            placeholder="eg- stackup designing ..."
          />

          <button className="add-button" onClick={(e) => handleAddToProject(e)}>
            Add to Project
          </button>


          <div className={`project-section ${darkMode ? 'dark-mode-task' : ''}`}>
            <label htmlFor="selectedProject">Project</label>
            <select
              id="selectedProject"
              name="selectedProject"
              value={inputs.selectedProject}
              onChange={handleChange}
            >
              <option value="">Select a project</option>
              {Array.isArray(projectOptions) && projectOptions.map((project) => (
                <option key={project.project_id} value={project.project_id}>
                  {project.project_name}
                </option>
              ))}
            </select>

            <button className="add-button" onClick={cancelProject}>
              Cancel
            </button>
          </div>
          <br />
          <div className='submit'>

            <button className="add-button submit" type="submit">
              Submit
            </button>
          </div>
        </form>
      )}
      {showProjectForm && (
        <form onSubmit={handleProjectSubmit} className={` ${showProjectForm ? 'active1' : 'hide'} ${darkMode ? 'dark-mode-task' : ''}`}>
          <div className="heading">

          <h1>Create Project</h1>
          </div>

          <div className={`create-project ${darkMode ? 'dark-mode-task' : ''}`}>
            <input
              type="text"
              placeholder="Project Name"
              value={projectInputs.projectName}
              onChange={(e) => setProjectInputs(prevInputs => ({ ...prevInputs, projectName: e.target.value }))}
            />
            <label htmlFor="description">Description</label>
            <textarea
              id="projectDescription"
              name="projectDescription"
              value={projectInputs.projectDescription}
              onChange={(e) => setProjectInputs(prevInputs => ({ ...prevInputs, projectDescription: e.target.value }))}
              rows="3"
              placeholder="eg- stackup project ..."
            />


          </div>

          <h3>You can Add Team members in project page</h3>
          <div className='submit'>
            <button className="add-button " type="submit">
              Submit
            </button>
          </div>

        </form>
      )}
      {!showTaskForm && !showProjectForm && (
        <p>You can Create Task and Project from here!.</p>
      )}
    </div>
  );
};

export default CreateTask;
