import React, { useEffect, useState } from 'react';
import { useParams, Link, useNavigate  } from 'react-router-dom';
import axios from 'axios';
import Returnbtn from '../images/back.svg';
import axiosClient from "../axiosClient";


function Todo() {
  const { taskId } = useParams();
  const navigate = useNavigate();
  const userId = localStorage.getItem('userId');
  const [taskDetails, setTaskDetails] = useState({});
  const [isEditing, setIsEditing] = useState(false);
  const [updatedTaskName, setUpdatedTaskName] = useState('');
  const [updatedTaskType, setUpdatedTaskType] = useState('');
  const [updatedDescription, setUpdatedDescription] = useState('');
  const [updatedStartDate, setUpdatedStartDate] = useState('');
  const [updatedEndDate, setUpdatedEndDate] = useState('');
  const [updatedPriority, setUpdatedPriority] = useState(taskDetails.priority || 1);
  const [isLoading, setLoading] = useState(false);
  const [message, setMessage] = useState('');


 const handleGoBack = () => {
    navigate(-1); // This is equivalent to calling window.history.back()
  };
  useEffect(() => {
    const fetchTaskDetails = async () => {
      try {
        const response = await axiosClient.get(`/todo.php?userId=${userId}&taskId=${taskId}`);

        if (response.data.status === 1 && response.data.tasks.length > 0) {
          const fetchedTaskId = response.data.tasks[0].task_id;

          setTaskDetails(response.data.tasks[0] || {});
          setUpdatedTaskName(response.data.tasks[0]?.task_name || '');
          setUpdatedTaskType(response.data.tasks[0]?.task_type || '');
          setUpdatedDescription(response.data.tasks[0]?.description || '');
          setUpdatedStartDate(response.data.tasks[0]?.start_date || '');
          setUpdatedEndDate(response.data.tasks[0]?.end_date || '');
          setUpdatedPriority(response.data.tasks[0]?.priority || '');
        } else {
          // Invalid taskId or no task found
          // You can redirect the user or show an error message
          console.error('Invalid taskId or no task found');
          // Example: Redirect to the dashboard
          navigate('/dashboard');
        }
      } catch (error) {
        console.error('Error fetching task details:', error);
      }
    };

    fetchTaskDetails();
  }, [userId, taskId, navigate]);


  const handleEditClick = () => {
    setIsEditing(true);
  };

  const handleUpdateClick = async () => {
    try {
      setLoading(true);
      const response = await axiosClient.post(`/todo.php?userId=${userId}&taskId=${taskId}`, {
        action: 'updateTask',
        taskId,
        updatedTaskName,
        updatedTaskType,
        updatedDescription,
        updatedPriority,
        updatedStartDate,
        updatedEndDate,
      });

      if (response.data.status === 1) {
        setTaskDetails((prevDetails) => ({
          ...prevDetails,
          task_name: updatedTaskName,
          task_type: updatedTaskType,
          description: updatedDescription,
          priority: updatedPriority,
          start_date: updatedStartDate,
          end_date: updatedEndDate,
        }));
        setIsEditing(false);
        setMessage('Task updated successfully');
        setTimeout(() => {
          setMessage('');
          setLoading(false);
        }, 1000);
      } else {
        console.error('Error updating task:', response.data.message);
        setMessage(`Error: ${response.data.message}`);
        setLoading(false);
      }
    } catch (error) {
      console.error('Error updating task:', error);
      console.error('Response:', error.response);
      setMessage(`Error: ${error.message}`);
      setLoading(false);
    }

  };

  const handleCancelClick = () => {
    setIsEditing(false);
    setUpdatedTaskName(taskDetails.task_name || '');
    setUpdatedTaskType(taskDetails.task_type || '');
    setUpdatedDescription(taskDetails.description || '');
    setUpdatedStartDate(taskDetails.start_date || '');
    setUpdatedEndDate(taskDetails.end_date || '');
    setUpdatedPriority(taskDetails.priority || '');
  };

  const handleDeleteClick = async () => {
    const isConfirmed = window.confirm('Are you sure you want to delete this task?');

    if (isConfirmed) {
      try {
        setLoading(true);
        const response = await axiosClient.post('/todo.php', {
          action: 'deleteTask',
          taskId,
        });

        if (response.data.status === 1) {
          setMessage('Task deleted successfully');
          setTimeout(() => {
            setMessage('');
            setLoading(false);
            navigate('/');
          }, 1000);
        } else {
          console.error('Error deleting task:', response.data.message);
          setMessage(`Error: ${response.data.message}`);
          setLoading(false);
        }
      } catch (error) {
        console.error('Error deleting task:', error);
        setMessage(`Error: ${error.message}`);
        setLoading(false);
      }
    }
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
    <div className='task-details-parent-card'>
      <div onClick={handleGoBack} className='return'><img src={Returnbtn}/></div>

      {isLoading && <div>Loading...</div>}
      {message && <div>{message}</div>}
      <h2>Task Details</h2>

      {isEditing ? (
        <div className='task-details-card'>
          <label htmlFor="updatedTaskName">Updated Task Name:</label>
          <input
            type="text"
            id="updatedTaskName"
            value={updatedTaskName}
            onChange={(e) => setUpdatedTaskName(e.target.value)}
          />

          <label htmlFor="updatedTaskType">Updated Task Type:</label>
          <input
            type="text"
            id="updatedTaskType"
            value={updatedTaskType}
            onChange={(e) => setUpdatedTaskType(e.target.value)}
          />

          <label htmlFor="updatedDescription">Updated Description:</label>
          <input
            type="text"
            id="updatedDescription"
            value={updatedDescription}
            onChange={(e) => setUpdatedDescription(e.target.value)}
          />
          <label htmlFor="updatedPriority">Updated Priority:</label>
          <select
            id="updatedPriority"
            value={updatedPriority}
            onChange={(e) => setUpdatedPriority(e.target.value)}
          >
            <option value={1}>Low</option>
            <option value={2}>Medium</option>
            <option value={3}>High</option>
          </select>

          <label htmlFor="updatedStartDate">Updated Start Date:</label>
          <input
            type="date"
            id="updatedStartDate"
            value={updatedStartDate}
            onChange={(e) => setUpdatedStartDate(e.target.value)}
          />

          <label htmlFor="updatedEndDate">Updated End Date:</label>
          <input
            type="date"
            id="updatedEndDate"
            value={updatedEndDate}
            onChange={(e) => setUpdatedEndDate(e.target.value)}
          />

          <button onClick={handleUpdateClick} className='button1'>Update</button>
          <button onClick={handleCancelClick} className='button2'>Cancel</button>
        </div>
      ) : (
        <div className='task-details-card'>

          <p>Task Name: <span>{taskDetails.task_name}</span></p>
          <p>Task Type: <span>{taskDetails.task_type}</span></p>
          <p>Description:<span> {taskDetails.description}</span></p>
          <p>Start Date: <span>{taskDetails.start_date}</span></p>
          <p>End Date: <span>{taskDetails.end_date}</span></p>
          <p>Priority:  <span className={`priority ${getPriorityClass(taskDetails.priority)}`}>
            {getPriorityLabel(taskDetails.priority)}
          </span></p>

          <br />
          <div className='task-details-buttons'>
            <button onClick={handleEditClick} className='button1'>Edit</button>

            <button onClick={handleDeleteClick} className='button2'>Delete</button>

          </div>

        </div>
      )}
      <br />
    </div>
  );
}

export default Todo;
