import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './task-page.css';

export default function Onprogress() {
    const [tasks, setTasks] = useState([]);
    const userId = localStorage.getItem('userId'); // Assuming you store user ID in localStorage

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



    return (
        <div>
            <h2>Your Task List</h2>
            <div className='todo-list-card'>
                {tasks.map(task => (
                    <div className='card-child' key={task.task_id}>
                        <div>{task.task_name}</div>
                        <div>{task.task_type}</div>
                        <button>DOne</button>
                    </div>
                ))}

            </div>
        </div>
    );
}
