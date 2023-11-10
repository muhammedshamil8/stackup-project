
            document.addEventListener('DOMContentLoaded', function () {
                const taskForm = document.getElementById('task-form');
                const taskList = document.getElementById('task-list');

                taskForm.addEventListener('submit', function (event) {
                    event.preventDefault();

                    // Get form values
                    const title = document.getElementById('title').value;
                    const description = document.getElementById('description').value;
                    const startTime = document.getElementById('start-time').value;
                    const endTime = document.getElementById('end-time').value;
                    const priority = document.getElementById('priority').value;

                    // Create a new task object
                    const task = {
                        title,
                        description,
                        startTime,
                        endTime,
                        priority
                    };

                    // Add the task to the task list
                    addTaskToList(task);

                    // Clear the form fields
                    taskForm.reset();
                });

                function addTaskToList(task) {
                    const taskItem = document.createElement('li');
                    taskItem.innerHTML = `
                        <strong>${task.title}</strong><br>
                        <span>${task.description}</span><br>
                        <span>Start Time: ${task.startTime}</span><br>
                        <span>End Time: ${task.endTime}</span><br>
                        <span>Priority: ${task.priority}</span>
                    `;
                    taskList.appendChild(taskItem);
                }
            });
       
