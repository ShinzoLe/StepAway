const addForm = document.querySelector(".add");
const list = document.querySelector(".todos");
const search = document.querySelector(".search input");

// add new todos
const generateTemplate = (todo, content, startDate, endDate) => {
  const html = `
    <li class="list-group-item">
      <h6 class="todo-title">${todo}</h6>
      <p class="todo-content">${content}</p>
      <div class="time-info">
        <span>Start:</span> <span class="start-time">${startDate}</span>
        <span class="separator">|</span>
        <span>End:</span> <span class="end-time">${endDate}</span>
      </div>
      <i class="far fa-trash-alt delete"></i>
    </li>
    `;
  list.innerHTML += html;
};

// clear todo text box input and prevent inputs with unnecessary white space
addForm.addEventListener("submit", (e) => {
  e.preventDefault();
  const todo = addForm.title.value.trim();
  const content = addForm.content.value.trim();
  const startDate = addForm.start_date.value;
  const endDate = addForm.end_date.value;
  if (todo.length && content.length && startDate && endDate) {
    generateTemplate(todo, content, startDate, endDate);
    addForm.reset();
  }
});

// delete todos
list.addEventListener("click", (e) => {
  if (e.target.classList.contains("delete")) {
    e.target.parentElement.remove();
  }
});

// toggle content visibility
list.addEventListener("click", (e) => {
  if (e.target.classList.contains("todo-title")) {
    const content = e.target.nextElementSibling;
    content.style.display = content.style.display === 'none' ? 'block' : 'none';
  }
});

const filterTodos = (term) => {
  Array.from(list.children)
    .filter((todo) => !todo.textContent.toLowerCase().includes(term))
    .forEach((todo) => todo.classList.add("filtered"));

  Array.from(list.children)
    .filter((todo) => todo.textContent.toLowerCase().includes(term))
    .forEach((todo) => todo.classList.remove("filtered"));
};

// keyup event
search.addEventListener("keyup", () => {
  const term = search.value.trim().toLowerCase();
  filterTodos(term);
});
