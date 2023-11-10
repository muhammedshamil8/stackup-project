import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import '../CreateTask.css'; // Import your CSS file

export default function CreateTask() {
  const [inputs, setInputs] = useState({
    title: '',
    startDate: '',
    endDate: '',
    taskType: '',
    priority: '1', // Default priority value
    description: '',
  });
  
  //   const [isCreatingProject, setCreatingProject] = useState(false);
  //   const [customTaskType, setCustomTaskType] = useState('');
  //   const [selectedTaskType, setSelectedTaskType] = useState('low');
  //   const [selectedPriority, setSelectedPriority] = useState('low');

  //   function addProject() {
  //     setCreatingProject(true);
  //   }

  //   function cancelProject() {
  //     setCreatingProject(false);
  //   }

  // function createProject() {
  //     document.querySelector('.create-project').style.display = 'initial'
  // }
  // function cancelcreateProject() {
  //     document.querySelector('.create-project').style.display = 'none'
  // }
  // function addProject() {
  //     document.querySelector('.project-section').style.display = 'initial'
  // }
  // function cancelProject() {
  //     document.querySelector('.project-section').style.display = 'none'
  // }
  const Navigate = useNavigate();
  const [errors, setErrors] = useState({});

  const handleChange = (event) => {
    const { name, value } = event.target;

    // Check if the input is the date input
    if (name === 'startDate' || name === 'endDate') {
      // Handle date input separately
      setInputs((prevInputs) => ({
        ...prevInputs,
        [name]: value,
      }));
    } else {
      // Handle other inputs as usual
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
      axios
        .post(`http://localhost:9000/api/taskCreate.php?userId=${userId}`, inputs)
        .then((response) => {
          if (response.data.status === 0) {
            setErrors({ message: response.data.message });
          } else {
            setErrors({ message: response.data.message });
            // Navigate('/addtask');
          }
        })
        .catch((error) => {
          console.error(error);
          setErrors({ message: 'An error occurred while creating the task.' });
        });
    }
  };

  return (
    <div className="cTask-card">
      <h1>Create Task</h1>
      {errors.message && <div className="error">{errors.message}</div>}

      <form onSubmit={handleSubmit}>
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
        />

        <label htmlFor="endDate">End Date</label>
        <input
          type="date"
          id="endDate"
          name="endDate"
          value={inputs.endDate}
          onChange={handleChange}
        />

        {/* <label htmlFor="customTaskType">Task Type</label>
      {isCreatingProject ? (
        <input
          type="text"
          id="customTaskType"
          placeholder="Enter custom task type"
          value={customTaskType}
          onChange={(e) => setCustomTaskType(e.target.value)}
        />
      ) : (
        <select
          id="selectedTaskType"
          value={selectedTaskType}
          onChange={(e) => setSelectedTaskType(e.target.value)}
        >
          <option value="low">Low</option>
          <option value="medium">Medium</option>
          <option value="high">High</option>
        </select>
      )}

      <label htmlFor="priority">Priority</label>
      <select
        id="priority"
        value={selectedPriority}
        onChange={(e) => setSelectedPriority(e.target.value)}
      >
        <option value="low">Low</option>
        <option value="medium">Medium</option>
        <option value="high">High</option>
      </select> */}
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
          placeholder="eg- stackup project ..."
        />

        {/* <button className="add-button" onClick={addProject}>Add to Project</button> */}

        {/* <div className="project-section">
                <input type="search" placeholder="Search Projects" />
                <div className="project-list">
                    <div>Project 1</div>
                    <div>Project 2</div>
                </div>
                <button className="add-button" onClick={createProject}>
                    +
                </button>



                <div className={`create-project`}>
                    <h1>Create Project</h1>
                    <input type="text" placeholder="Project Name" />
                    <button className="add-button" onClick={cancelcreateProject}>
                        Cancel
                    </button>
                </div>

                <h3>Add Teams</h3>
                <input type="search" placeholder="Search Members" />
                <p>Member 1</p>
                <label>+</label>
                <button className="add-button" onClick={cancelProject}>
                    Cancel
                </button>
            </div> */}
        <button className="add-button" type="submit">
          Create Task
        </button>
      </form>
    </div>
  );
}
