const todoInput = document.getElementById('todo-input');
const addButton = document.getElementById('add-button');
const todoList = document.getElementById('todo-list');
const tasksCounter = document.getElementById('tasks-counter');
const clearCompletedBtn = document.getElementById('clear-completed');

let todos = JSON.parse(localStorage.getItem('todos')) || [];

addButton.addEventListener('click', addTodo);
todoInput.addEventListener('keypress', (e) => {
    if (e.key === 'Enter') addTodo();
});
clearCompletedBtn.addEventListener('click', clearCompleted);

function addTodo() {
    const text = todoInput.value.trim();
    if (text) {
        const todo = {
            id: Date.now().toString(),
            text: text,
            completed: false
        };
        todos.push(todo);
        saveTodos();
        render();
        updateStats();
        todoInput.value = '';
    }
}

function deleteTodo(id) {
    todos = todos.filter(todo => todo.id !== id);
    saveTodos();
    render();
    updateStats();
}

function toggleTodo(id) {
    const todo = todos.find(todo => todo.id === id);
    if (todo) {
        todo.completed = !todo.completed;
        saveTodos();
        render();
        updateStats();
    }
}

function clearCompleted() {
    todos = todos.filter(todo => !todo.completed);
    saveTodos();
    render();
    updateStats();
}

function createTodoElement(todo) {
    const li = document.createElement('li');
    li.className = `todo-item ${todo.completed ? 'completed' : ''}`;
    li.innerHTML = `
        <input type="checkbox" ${todo.completed ? 'checked' : ''}>
        <span>${todo.text}</span>
        <button class="delete-btn">Delete</button>
    `;

    const checkbox = li.querySelector('input[type="checkbox"]');
    const deleteBtn = li.querySelector('.delete-btn');

    checkbox.addEventListener('change', () => toggleTodo(todo.id));
    deleteBtn.addEventListener('click', () => deleteTodo(todo.id));

    return li;
}

function render() {
    todoList.innerHTML = '';
    todos.forEach(todo => {
        todoList.appendChild(createTodoElement(todo));
    });
}

function updateStats() {
    tasksCounter.textContent = `Total tasks: ${todos.length}`;
}

function saveTodos() {
    localStorage.setItem('todos', JSON.stringify(todos));
}

render();
updateStats();
