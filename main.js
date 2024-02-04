//! Render Tasks From Local Storage
var is_first_task = true;

function RenderTasks() {
  let tasks = JSON.parse(localStorage.getItem("tasks"));
  if (tasks) {
    tasks.forEach((element) => {
      addExistingTasks(element.task_value, element.task_id);
    });
  } else {
  }
}

document.addEventListener("load", RenderTasks());
function addExistingTasks(task_value, id) {
  if (is_first_task) {
    let tasks = document.createElement("div");
    tasks.className = "tasks";
    let container = document.querySelector(".container");
    container.appendChild(tasks);
    is_first_task = false;
  }

  let task = document.createElement("div");
  task.className = "task";
  task.setAttribute("id", id);

  let h4 = document.createElement("h4");
  let task_name = document.createTextNode(task_value);
  h4.appendChild(task_name);

  let delete_button = document.createElement("button");
  delete_button.className = "delete";
  let delete_text = document.createTextNode("Delete");
  delete_button.appendChild(delete_text);

  task.appendChild(h4);
  task.appendChild(delete_button);

  let tasks = document.querySelector(".tasks");
  tasks.appendChild(task);
}

//! Adding Task
let addInput = document.querySelector("#add");
let addButton = document.querySelector(".button");
addButton.onclick = (e) => {
  e.preventDefault();
  let index;
  if (localStorage.getItem("tasks")) {
    index = JSON.parse(localStorage.getItem("tasks")).length;
  } else {
    index = 0;
  }
  let task = addInput.value;
  if (task) {
    addItem(task, index);
    addInput.value = "";
  } else {
    alert("Task Can't Be Empty, Please Add Task...");
  }
};

//! Function To Create A Task And Save In Local Storage
function addItem(task_value, index) {
  if (is_first_task) {
    let tasks = document.createElement("div");
    tasks.className = "tasks";
    let container = document.querySelector(".container");
    container.appendChild(tasks);
    is_first_task = false;
    localStorage.setItem("tasks", JSON.stringify([]));
  }

  let task = document.createElement("div");
  task.className = "task";
  task.setAttribute("id", index);

  let h4 = document.createElement("h4");
  let task_name = document.createTextNode(task_value);
  h4.appendChild(task_name);

  let delete_button = document.createElement("button");
  delete_button.className = "delete";
  let delete_text = document.createTextNode("Delete");
  delete_button.appendChild(delete_text);

  task.appendChild(h4);
  task.appendChild(delete_button);

  let tasks = document.querySelector(".tasks");
  tasks.appendChild(task);

  let arrayString = localStorage.getItem("tasks");
  let TasksArray = JSON.parse(arrayString);
  let newTask = { task_id: index, task_value: task_value };
  TasksArray.push(newTask);
  localStorage.setItem("tasks", JSON.stringify(TasksArray));
}

//! Deleting Task
document.querySelector(".container").addEventListener("click", (e) => {
  if (e.target.classList.contains("delete")) {
    const id = e.target.parentElement.getAttribute("id");
    DeleteItem(id);
  }
});

function DeleteItem(id) {
  let Tasks = JSON.parse(localStorage.getItem("tasks"));
  let new_Tasks = Tasks.filter((element) => {
    return element.task_id != id;
  });
  document.getElementById(id).remove();
  localStorage.setItem("tasks", JSON.stringify(new_Tasks));
  if (new_Tasks.length == 0) {
    document.querySelector(".tasks").remove();
    is_first_task = true;
  }
}
