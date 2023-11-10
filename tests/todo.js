
    function addTask() {
        var taskInput = document.getElementById('task-input');
        var taskList = document.getElementById('task-list');

        if (taskInput.value.trim() !== '') {
            var newTask = document.createElement('li');
            newTask.className = 'task-item';
            newTask.innerHTML = taskInput.value + '<button class="delete-btn" onclick="removeTask(this)">Delete</button>';
            taskList.appendChild(newTask);
            taskInput.value = '';
        }
    }

    function removeTask(btn) {
        var taskList = document.getElementById('task-list');
        var taskItem = btn.parentNode;
        taskList.removeChild(taskItem);
    }
