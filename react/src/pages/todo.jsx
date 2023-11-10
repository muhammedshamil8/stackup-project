import React, { useEffect, useState } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import axios from 'axios';

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
  const [isLoading, setLoading] = useState(false);
  const [message, setMessage] = useState('');

  useEffect(() => {
    const fetchTaskDetails = async () => {
      try {
        const response = await axios.get(`http://localhost:9000/api/todo.php?userId=${userId}&taskId=${taskId}`);
        setTaskDetails(response.data.tasks[0] || {});
        setUpdatedTaskName(response.data.tasks[0]?.task_name || '');
        setUpdatedTaskType(response.data.tasks[0]?.task_type || '');
        setUpdatedDescription(response.data.tasks[0]?.description || '');
        setUpdatedStartDate(response.data.tasks[0]?.start_date || '');
        setUpdatedEndDate(response.data.tasks[0]?.end_date || '');
      } catch (error) {
        console.error('Error fetching task details:', error);
      }
    };

    fetchTaskDetails();
  }, [userId, taskId]);

  const handleEditClick = () => {
    setIsEditing(true);
  };

  const handleUpdateClick = async () => {
    try {
      setLoading(true);
      const response = await axios.post(`http://localhost:9000/api/todo.php?userId=${userId}&taskId=${taskId}`, {
        action: 'updateTask',
        taskId,
        updatedTaskName,
        updatedTaskType,
        updatedDescription,
        updatedStartDate,
        updatedEndDate,
      });

      if (response.data.status === 1) {
        setTaskDetails((prevDetails) => ({
          ...prevDetails,
          task_name: updatedTaskName,
          task_type: updatedTaskType,
          description: updatedDescription,
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
  };

  const handleDeleteClick = async () => {
    const isConfirmed = window.confirm('Are you sure you want to delete this task?');

    if (isConfirmed) {
      try {
        setLoading(true);
        const response = await axios.post('http://localhost:9000/api/todo.php', {
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
    <div>
      {isLoading && <div>Loading...</div>}
      {message && <div>{message}</div>}
      <h2>Task Details</h2>

      {isEditing ? (
        <>
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

          <button onClick={handleUpdateClick}>Update</button>
          <button onClick={handleCancelClick}>Cancel</button>
        </>
      ) : (
        <>
          <p>Task Name: {taskDetails.task_name}</p>
          <p>Task Type: {taskDetails.task_type}</p>
          <p>Description: {taskDetails.description}</p>
          <p>Start Date: {taskDetails.start_date}</p>
          <p>End Date: {taskDetails.end_date}</p>
          <p>Priority:  <div className={`priority ${getPriorityClass(taskDetails.priority)}`}>
            {getPriorityLabel(taskDetails.priority)}
          </div></p>

          <br />
          <button onClick={handleEditClick}>Edit</button>
        </>
      )}
      <button onClick={handleDeleteClick}>Delete</button>
      <br />
      <Link to="/dashboard">Back to Tasks</Link>
    </div>
  );
}

export default Todo;
