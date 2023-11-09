document.addEventListener('DOMContentLoaded', function () {
  const todoList = document.getElementById('todo-list');
  const inProgressList = document.getElementById('in-progress-list');
  const doneList = document.getElementById('done-list');

  const todoCounter = document.getElementById('todo-counter');
  const inProgressCounter = document.getElementById('in-progress-counter');
  const doneCounter = document.getElementById('done-counter');

  const todoTasks = document.querySelectorAll('.todo-task');

  todoCounter.textContent = todoTasks.length;

  todoTasks.forEach(task => {
      task.addEventListener('click', function () {
          
          inProgressList.appendChild(task);
          todoCounter.textContent = document.querySelectorAll('.todo-task').length;
          inProgressCounter.textContent = document.querySelectorAll('.in-progress-task').length;
      });
  });

  const inProgressTasks = document.querySelectorAll('.in-progress-task');

  inProgressCounter.textContent = inProgressTasks.length;

  inProgressTasks.forEach(task => {
      task.addEventListener('click', function () {
          
          doneList.appendChild(task);
          inProgressCounter.textContent = document.querySelectorAll('.in-progress-task').length;
          doneCounter.textContent = document.querySelectorAll('.done-task').length;
      });
  });

  const doneTasks = document.querySelectorAll('.done-task');
  doneCounter.textContent = doneTasks.length;
});
