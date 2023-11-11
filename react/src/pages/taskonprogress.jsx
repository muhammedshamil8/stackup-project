import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './task-page.css';
import { Link, useNavigate } from 'react-router-dom';

export default function Onprogress() {
  const [tasks, setTasks] = useState([]);
  const userId = localStorage.getItem('userId');
  const navigate = useNavigate();
  useEffect(() => {
    const fetchTasks = async () => {
      try {
        const response = await axios.get(`http://localhost:9000/api/progressTasks.php?userId=${userId}`);
        // console.log('Response from API:', response.data);
        setTasks(response.data.tasks ? response.data.tasks : []);
      } catch (error) {
        console.error('Error fetching tasks:', error);
      }
    };

    if (userId) {
      fetchTasks();
    }
  }, [userId]);
  const handleDoneClick = async (taskId) => {
    const isConfirmed = window.confirm('Sure..! Move this task to Completed list.');

    if (isConfirmed) {
      try {
        const response = await axios.post('http://localhost:9000/api/progressTasks.php', {
          action: 'updateProgress',
          taskId,
          taskDone: 1,
          taskProgress: 0,
        });

        if (response.data.status === 1) {
          // Re-fetch tasks after successful update
          const updatedTasks = await axios.get(`http://localhost:9000/api/progressTasks.php?userId=${userId}`);
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
      <h2>Task Progress List</h2>
      {tasks.length > 0 ? (
        <div className='todo-list-card'>
          {tasks.map(task => (
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
                <button onClick={() => handleDoneClick(task.task_id)} className='todo-btn move'>Done</button>
                <button onClick={() => handleDeleteClick(task.task_id)} className='todo-btn delete'>Delete</button>

              </div>

            </div>
          ))}

        </div>
      ) : (
        <p>No progress tasks available.</p>
      )}
    </div>
  );
}
