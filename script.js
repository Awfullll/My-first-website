const todoList = JSON.parse(localStorage.getItem('todos')) || []; // Load todos from localStorage or start with an empty array

renderTodoList();

function renderTodoList() {
  let todoListHTML = '';

  todoList.forEach(function(todoObject, index) {
    const { name } = todoObject;
    const html = `
        <div class="new-todo">
          <div class="todo-text">${name}</div>
          <button class="todo-delete" data-index="${index}">Delete</button>
        </div>
    `;
    todoListHTML += html;
  });

  document.querySelector('.added-todos').innerHTML = todoListHTML;

  // Add event listener for delete buttons after rendering todos
  document.querySelectorAll('.todo-delete')
    .forEach((deleteButton) => {
      deleteButton.addEventListener('click', (event) => {
        const index = event.target.getAttribute('data-index');
        todoList.splice(index, 1); // Remove the todo from the list
        saveToLocalStorage(); // Save updated todo list to localStorage
        renderTodoList(); // Re-render the list after deletion
      });
    });
}

document.querySelector('.todo-add') // Correct selector for the "Add Todo" button
  .addEventListener('click', () => {
    addTodo();
});

function addTodo() {
  const inputElement = document.querySelector('.todo-name');
  const name = inputElement.value.trim();

  if (name) {
    todoList.push({ name });
    saveToLocalStorage(); // Save updated todo list to localStorage
  }

  inputElement.value = ''; // Clear the input field
  renderTodoList(); // Re-render the list after adding the new todo
}

function saveToLocalStorage() {
  localStorage.setItem('todos', JSON.stringify(todoList)); // Save the todo list to localStorage
}
