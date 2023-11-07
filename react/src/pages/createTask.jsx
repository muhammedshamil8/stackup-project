import React, { useState } from 'react';

import '../CreateTask.css'; // Import your CSS file

export default function CreateTask() {
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
    function createProject() {
        document.querySelector('.create-project').style.display = 'initial'
    }
    function cancelcreateProject() {
        document.querySelector('.create-project').style.display = 'none'
    }
    function addProject() {
        document.querySelector('.project-section').style.display = 'initial'
    }
    function cancelProject() {
        document.querySelector('.project-section').style.display = 'none'
    }
    return (
        <div className="cTask-card">
            <h1>Create Task</h1>

            <label htmlFor="title">Task Name</label>
            <input type="text" id="title" />

            <label htmlFor="startDate">Start Date</label>
            <input type="date" id="startDate" />

            <label htmlFor="endDate">End Date</label>
            <input type="date" id="endDate" />

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
            <label htmlFor="taskType">Task Type</label>
            <input type="text" id="taskType" />

            <label htmlFor="priority">Priority</label>
            <select id="priority">
                <option value="low">Low</option>
                <option value="medium">Medium</option>
                <option value="high">High</option>
            </select>


            <label htmlFor="description">Description</label>
            <textarea id="description" rows="3"></textarea>

            <button className="add-button" onClick={addProject}>Add to Project</button>

            <div className="project-section">
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
            </div>
        </div>
    );
}
