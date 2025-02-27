const todoList = JSON.parse(localStorage.getItem('todos')) || []; 

renderTodoList();

function renderTodoList() {
  let todoListHTML = '';

  todoList.forEach(function(todoObject, index) {
    const { name,date } = todoObject;
    const html = `
        <div class="new-todo">
          <div class="todo-text">${name}</div>
          <div class="todo-date">${date}</div>         
          <button class="todo-delete" data-index="${index}">Delete</button>
        </div>
    `;
    todoListHTML += html;
  });

  document.querySelector('.added-todos').innerHTML = todoListHTML;

  
  document.querySelectorAll('.todo-delete')
    .forEach((deleteButton) => {
      deleteButton.addEventListener('click', (event) => {
        const index = event.target.getAttribute('data-index');
        todoList.splice(index, 1);
        saveToLocalStorage(); 
        renderTodoList(); 
      });
    });
}

document.querySelector('.todo-add') 
  .addEventListener('click', () => {
    addTodo();
});

function addTodo() {
  const inputName = document.querySelector('.todo-name');
  const inputDate = document.querySelector('.todo-date');
  const name = inputName.value.trim();
  let date = inputDate.value.trim();

    if (date==='') {
      const today = new Date().toISOString().split('T')[0];
      date = today;
    }

    if (name === '') {
      alert('Please enter a todo name');
      return;
    }

    todoList.push({ name, date });
    saveToLocalStorage(); 
  

  inputName.value = ''; 
  renderTodoList();
}

function saveToLocalStorage() {
  localStorage.setItem('todos', JSON.stringify(todoList)); 
}
