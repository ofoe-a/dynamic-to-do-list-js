document.addEventListener('DOMContentLoaded', () => {
  const addButton = document.getElementById('add-task-btn');
  const taskInput = document.getElementById('task-input');
  const taskList = document.getElementById('task-list');

  // Load tasks from Local Storage on page load
  loadTasks();

  function loadTasks() {
    const storedTasks = JSON.parse(localStorage.getItem('tasks') || '[]');
    storedTasks.forEach(taskText => {
      addTask(taskText, false); // false = don’t save again
    });
  }

  function saveTasks() {
    const tasks = [];
    const items = taskList.querySelectorAll('li');
    items.forEach(item => {
      const text = item.firstChild.textContent.trim(); // just the task text, not the Remove button
      tasks.push(text);
    });
    localStorage.setItem('tasks', JSON.stringify(tasks));
  }

  function addTask(taskText, save = true) {
    if (taskText.trim() === '') {
      alert('Please enter a task.');
      return;
    }

    const li = document.createElement('li');
    li.textContent = taskText;

    const removeButton = document.createElement('button');
    removeButton.textContent = 'Remove';
    removeButton.classList.add('remove-btn');

    removeButton.onclick = () => {
      taskList.removeChild(li);
      saveTasks(); // update local storage after removal
    };

    li.appendChild(removeButton);
    taskList.appendChild(li);

    if (save) {
      saveTasks();
    }

    taskInput.value = '';
  }

  // Add task on button click
  addButton.addEventListener('click', () => {
    addTask(taskInput.value);
  });

  // Add task on Enter key
  taskInput.addEventListener('keypress', event => {
    if (event.key === 'Enter') {
      addTask(taskInput.value);
    }
  });
});