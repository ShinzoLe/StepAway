const addForm = document.querySelector(".add");
const list = document.querySelector(".todos");
const search = document.querySelector(".search input");

// Function to validate date
const isValidDate = (dateString) => {
  const date = new Date(dateString);
  const dateComponents = dateString.split("-");
  const year = parseInt(dateComponents[0], 10);
  const month = parseInt(dateComponents[1], 10);
  const day = parseInt(dateComponents[2], 10);

  return (
    date &&
    !isNaN(date.getTime()) &&
    date.getFullYear() === year &&
    date.getMonth() + 1 === month &&
    date.getDate() === day
  );
};

// Function to check if End Date is after Start Date
const isEndDateAfterStartDate = (startDate, endDate) => {
  return new Date(endDate) >= new Date(startDate);
};

// Function to show error message
const showErrorMessage = (message) => {
  const errorDiv = document.createElement('div');
  errorDiv.className = 'alert alert-danger';
  errorDiv.textContent = message;
  addForm.insertBefore(errorDiv, addForm.firstChild);
  setTimeout(() => errorDiv.remove(), 3000); // Remove the error message after 3 seconds
};

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
      <button class="edit btn btn-sm btn-warning">Edit</button>
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

  // Reset styles
  addForm.title.style.borderColor = '';
  addForm.content.style.borderColor = '';
  addForm.start_date.style.borderColor = '';
  addForm.end_date.style.borderColor = '';

  // Validate title and content
  if (!todo.length) {
    showErrorMessage("Vui lòng nhập tiêu đề.");
    addForm.title.style.borderColor = 'red';
    return;
  }
  
  if (!content.length) {
    showErrorMessage("Vui lòng nhập nội dung.");
    addForm.content.style.borderColor = 'red';
    return;
  }

  // Validate dates
  if (!isValidDate(startDate) || !isValidDate(endDate)) {
    showErrorMessage("Vui lòng chọn/nhập giá trị ngày bắt đầu hoặc kết thúc.");
    if (!isValidDate(startDate)) addForm.start_date.style.borderColor = 'red';
    if (!isValidDate(endDate)) addForm.end_date.style.borderColor = 'red';
    return;
  }

  // Check if end date is after start date
  if (!isEndDateAfterStartDate(startDate, endDate)) {
    showErrorMessage("Không thể để ngày kết thúc diễn ra trước ngày bắt đầu, xin nhập lại.");
    addForm.end_date.style.borderColor = 'red';
    return;
  }

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

// edit todos
list.addEventListener("click", (e) => {
  if (e.target.classList.contains("edit")) {
    const todoItem = e.target.parentElement;
    const title = todoItem.querySelector(".todo-title").textContent;
    const content = todoItem.querySelector(".todo-content").textContent;
    const startDate = todoItem.querySelector(".start-time").textContent;
    const endDate = todoItem.querySelector(".end-time").textContent;

    addForm.title.value = title;
    addForm.content.value = content;
    addForm.start_date.value = startDate;
    addForm.end_date.value = endDate;

    todoItem.remove();
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
