import { Todo } from './todo';

let todos: Todo[] = [] // Array of todos

const todoForm = document.getElementById('todo-form') as HTMLFormElement;
const todoInput = document.getElementById('todo-input') as HTMLInputElement;
const todoList = document.querySelector<HTMLUListElement>('#todo-list')!; // Non-null assertion operator


todoForm.addEventListener('submit', (event) => {

  event.preventDefault(); // Prevent the default form submission behavior

  const todoText = todoInput.value.trim(); // Get the value of the input field and trim whitespace
  if (!todoText) return;
  const newTodo: Todo = {
    id: Date.now(),
    text: todoText,
    complete: false
  }

  todos.push(newTodo); // Add the new todo to the array
  todoInput.value = ''; // Clear the input field
  renderTodos(); // Render the updated list of todos

})

function renderTodos() {
  todoList.innerHTML = ''; // Clear the existing list
  todos.forEach((todo) => {
    const li = document.createElement('li'); // Create a new list item
    li.textContent = todo.text; // Set the text content of the list item
    li.className = todo.complete ? 'completed' : ""; // Set the class based on completion status
    li.addEventListener('click', () => {
      todo.complete = !todo.complete; // Toggle the completion status
      renderTodos(); // Re-render the list to reflect the change  
    })

    const delButton = document.createElement('button'); // Create a delete button
    delButton.textContent = 'Delete'; // Set the button text
    delButton.addEventListener('click', () => {
      todos = todos.filter(t => t.id !== todo.id); // Remove the todo from the array
      renderTodos(); // Re-render the list to reflect the change
    })

    li.appendChild(delButton);
    todoList.appendChild(li); // Append the list item to the todo list
  })

}