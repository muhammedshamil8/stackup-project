import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './task-page.css';
import { Link, useNavigate } from 'react-router-dom';

const Todolist = () => {
  const navigate = useNavigate();

  const [tasks, setTasks] = useState([]);
  const userId = localStorage.getItem('userId');

  useEffect(() => {
    const fetchTasks = async () => {
      try {
        const response = await axios.get(`http://localhost:9000/api/getTasks.php?userId=${userId}`);
        setTasks(response.data.tasks || []);
      } catch (error) {
        console.error('Error fetching tasks:', error);
      }
    };

    if (userId) {
      fetchTasks();
    }
  }, [userId]);

  const handleProgressClick = async (taskId) => {
    const isConfirmed = window.confirm('Sure..! Move this task to progress list.');

    if (isConfirmed) {
      try {
        const response = await axios.post('http://localhost:9000/api/getTasks.php', {
          action: 'updateProgress',
          taskId,
          taskProgress: 1,
        });

        if (response.data.status === 1) {
          // Re-fetch tasks after successful update
          const updatedTasks = await axios.get(`http://localhost:9000/api/getTasks.php?userId=${userId}`);
          setTasks(updatedTasks.data.tasks || []);
        } else {
          console.error('Error updating task progress:', response.data.message);
        }
      } catch (error) {
        console.error('Error updating task progress:', error);
      }
    }
  };


  const handleDeleteClick = async (taskId) => {
    const isConfirmed = window.confirm('Are you sure you want to delete this task?');

    if (isConfirmed) {
      try {
        const response = await axios.post('http://localhost:9000/api/getTasks.php', {
          action: 'deleteTask',
          taskId,
        });

        if (response.data.status === 1) {
          setTasks((prevTasks) => prevTasks.filter((task) => task.task_id !== taskId));
        } else {
          console.error('Error deleting task:', response.data.message);
        }
      } catch (error) {
        console.error('Error deleting task:', error);
      }
    }
  };
  const handleOpenClick = (taskId) => {
    // Use the navigate function to go to the "/todo" route with the taskId as a parameter
    navigate(`/todo/${taskId}`);
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
  return (
    <div>
      <h2>Task List</h2>
      {tasks.length > 0 ? (
        <div className='todo-list-card'>
          {tasks.map((task) => (
            <div className='card-child' key={task.task_id}>
              <div className="list-info">
                <div>{task.task_name}</div>
                <div className='list-info-child2'>{task.task_type}</div>
                
              </div>
              
              <div className="list-buttons">
              <div className={`priority ${getPriorityClass(task.priority)}`}>
                  {getPriorityLabel(task.priority)}
                </div>
                <button onClick={() => handleOpenClick(task.task_id)} className='todo-btn open'>Open</button>
                <button onClick={() => handleProgressClick(task.task_id)} className='todo-btn move'>Progress</button>
                <button onClick={() => handleDeleteClick(task.task_id)} className='todo-btn delete'>Delete</button>
              </div>
            </div>
          ))}
        </div>
      ) : (
        <p>No tasks available.</p>
      )}
    </div>
  );

};

export default Todolist;
