//DEFINE  UI Vars
const form = document.querySelector("#task-form");
const taskList = document.querySelector(".collection");
const clearBtn = document.querySelector(".clear-tasks");
const filter = document.querySelector("#filter");
const taskInput = document.querySelector("#task");
const tastField = document.querySelector("#filter");
//load all event listeners
loadEventListeners();

function loadEventListeners() {
  //DOM load event
  document.addEventListener("DOMContentLoaded", getTasks);
  //Add task event
  form.addEventListener("submit", addTask);
  //Remove task event
  taskList.addEventListener("click", removeTask);
  //Clear all tasks
  clearBtn.addEventListener("click", clearTasks);
  //Filter task events
  filter.addEventListener("keyup", filterTasks);
}

//Get Tasks from Local Storage
function getTasks() {
  let tasks;
  if (localStorage.getItem("tasks") === null) {
    tasks = [];
  } else {
    tasks = JSON.parse(localStorage.getItem("tasks"));
  }
  tasks.forEach((task) => {
    console.log(task);
    const li = document.createElement("li");
    li.className = "collection-item";
    //Create text node and append to the li
    li.appendChild(document.createTextNode(task));
    //Create new link element
    const link = document.createElement("a");
    link.className = "delete-item secondary-content"; //To display to the right of a task list item
    //Add icon html
    link.innerHTML = '<i class = "fa fa-remove"></i>';
    //Append link to the LI
    li.appendChild(link);
    //Append the li to teh Ul
    //   console.log(li);

    taskList.append(li);
  });
  //   localStorage.clear();
}
//Add task
function addTask(e) {
  if (taskInput.value === "") {
    alert("Add a task");
  }

  //Create List element
  const li = document.createElement("li");
  li.className = "collection-item";

  //Create text node and append to the li
  li.appendChild(document.createTextNode(taskInput.value));
  //Create new link element
  const link = document.createElement("a");
  link.className = "delete-item secondary-content"; //To display to the right of a task list item
  //Add icon html
  link.innerHTML = '<i class = "fa fa-remove"></i>';
  //Append link to the LI
  li.appendChild(link);
  //Append the li to teh Ul
  //   console.log(li);

  taskList.append(li);

  //Store in Local storage
  storeTaskInLocalStorage(taskInput.value);

  taskInput.value = "";
  //   console.log(li);

  e.preventDefault();
}

function storeTaskInLocalStorage(task) {
  let tasks;
  if (localStorage.getItem("tasks") === null) {
    tasks = [];
  } else {
    tasks = JSON.parse(localStorage.getItem("tasks"));
  }
  tasks.push(task);

  localStorage.setItem("tasks", JSON.stringify(tasks));
}
function removeTask(e) {
  if (e.target.parentElement.classList.contains("delete-item")) {
    if (confirm("Are you sure?")) {
      e.target.parentElement.parentElement.remove();
      //Remove from Local Storage
      removeTaskFromLocalStorage(e.target.parentElement.parentElement);
    }
  }

  //   e.preventDefault();
}
//Remove from Local storage
function removeTaskFromLocalStorage(taskItem) {
  let tasks;
  if (localStorage.getItem("tasks") === null) {
    tasks = [];
  } else {
    tasks = JSON.parse(localStorage.getItem("tasks"));
  }
  tasks.forEach((task, idx) => {
    if (taskItem.textContent === task) {
      tasks.splice(idx, 1);
    }
  });

  localStorage.setItem("tasks", JSON.stringify(tasks));
}
//Clear tasks
function clearTasks(e) {
  //   taskList.innerHTML = "";

  //Faster
  while (taskList.firstChild) {
    taskList.removeChild(taskList.firstChild);
  }
  //Clear tasks from local storage
  clearTasksFromLocalStorage();
}

//Clear Tasks from LS
function clearTasksFromLocalStorage() {
  localStorage.clear();
}
//Filter tasks
function filterTasks(e) {
  const text = e.target.value.toLowerCase();

  document.querySelectorAll(".collection-item").forEach(function (task) {
    const item = task.firstChild.textContent.toLowerCase();
    if (item.indexOf(text) != -1) {
      task.style.display = "block";
    } else {
      task.style.display = "none";
    }
  });
}
