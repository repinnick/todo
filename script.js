const $currentTasks = document.querySelector("#currentTasks");
const $priority = document.querySelectorAll(".form-check-input");
const $form = document.querySelector("form");
const $completedTasks = document.querySelector("#completedTasks");

localStorageInit();

// form submit and publish task
$form.addEventListener("submit", function (event) {
  event.preventDefault();
  const getData = createVariablesForTask();
  $currentTasks.insertAdjacentHTML(
    "afterbegin",
    createTemplateForTask(getData)
  );
  localStorage.setItem(getData.id, JSON.stringify(getData));
  $form.reset();
});

// add task with nessesary parametrs
function createTemplateForTask(data) {
  let taskItem = `<li id="${data.id}" class="list-group-item d-flex w-100 mb-2">
                <div class="w-100 mr-2">
                    <div class="d-flex w-100 justify-content-between">
                        <h5 class="mb-1">${data.title}</h5>
                        <input class="col-6 task-title" type="text" hidden>
                        <div>
                            <small class="mr-2">${data.priority} priority</small>
                            <small>${data.date}</small>
                        </div>
                    </div>
                    <p class="mb-1 w-100">${data.text}</p>
                    <textarea class="col-8 mt-2 task-desc" type="text" hidden></textarea>
                    <button class="col-2 confirm-edit" hidden>Submit</button>
                </div>
                <div class="dropdown m-2 dropleft">
                    <button class="btn btn-secondary h-100" type="button" 
                            data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                        <i class="fas fa-ellipsis-v"></i>
                    </button>
                    <div class="dropdown-menu p-2 flex-column">
                        <button type="button" class="btn btn-success w-100 complete-btn">Complete</button>
                        <button type="button" class="btn btn-info w-100 my-2 edit-btn">Edit</button>
                        <button type="button" class="btn btn-danger w-100 delete-btn">Delete</button>
                    </div>
                </div>
            </li>`;

  let taskItemComplete = `<li id="${data.id}" class="list-group-item d-flex w-100 mb-2">
                            <div class="w-100 mr-2">
                                <div class="d-flex w-100 justify-content-between">
                                    <h5 class="mb-1">${data.title}</h5>
                                    <input class="col-6 task-title" type="text" hidden>
                                    <div>
                                        <small class="mr-2">${data.priority} priority</small>
                                        <small>${data.date}</small>
                                    </div>
                                </div>
                                <p class="mb-1 w-100">${data.text}</p>
                                <textarea class="col-8 mt-2 task-desc" type="text" hidden></textarea>
                                <button class="col-2 confirm-edit" hidden>Submit</button>
                            </div>
                            <div class="dropdown m-2 dropleft">
                                <button class="btn btn-secondary h-100" type="button"
                                        data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                                    <i class="fas fa-ellipsis-v"></i>
                                </button>
                                <div class="dropdown-menu p-2 flex-column">
                                    <button type="button" class="btn btn-danger w-100 delete-btn">Delete</button>
                                </div>
                            </div>
                          </li>`;
  if (data.current) {
    return taskItem;
  } else {
    return taskItemComplete;
  }
}

//local storage for current task
function localStorageInit() {
  const keys = Object.keys(localStorage);
  keys.forEach((key) => {
    let item = JSON.parse(localStorage.getItem(key));
    console.log(item.current);
    if (!item.current) {
      $completedTasks.insertAdjacentHTML(
        "afterbegin",
        createTemplateForTask(item)
      );
    } else {
      $currentTasks.insertAdjacentHTML(
        "afterbegin",
        createTemplateForTask(item)
      );
    }
  });
}

// for buttons edit, delete, completeds
document.body.addEventListener("click", function (event) {
  if (event.target.classList.contains("edit-btn")) editTask(event);
  if (event.target.classList.contains("delete-btn")) deleteTask(event);
  if (event.target.classList.contains("complete-btn")) comletedTask(event);
});

//--------- EDIT TASK--------------
function editTask(event) {
  const obj = createDOMTags(event);

  changeHiddenAttr(
    obj.title,
    obj.desc,
    obj.inputTitle,
    obj.inputDesc,
    obj.inputButton
  );

  obj.inputTitle.value = obj.title.textContent;
  obj.inputDesc.value = obj.desc.textContent;
}

// create nessesary DOM elements
function createDOMTags(e) {
  const task = e.target.closest("li");

  const title = task.querySelector("h5");
  const desc = task.querySelector("p");
  const inputTitle = task.querySelector(".task-title");
  const inputDesc = task.querySelector(".task-desc");
  const inputButton = task.querySelector(".confirm-edit");

  return {
    task: task,
    title: title,
    desc: desc,
    inputTitle: inputTitle,
    inputDesc: inputDesc,
    inputButton: inputButton,
  };
}

// button to accept edit changing
$currentTasks.addEventListener("click", function (event) {
  if (!event.target.classList.contains("confirm-edit")) return;
  const obj = createDOMTags(event);

  obj.title.textContent = obj.inputTitle.value;
  obj.desc.textContent = obj.inputDesc.value;

  let variables = JSON.parse(localStorage.getItem(obj.task.id));
  variables.title = obj.title.textContent;
  variables.text = obj.desc.textContent;

  localStorage.setItem(obj.task.id, JSON.stringify(variables));

  changeHiddenAttr(
    obj.title,
    obj.desc,
    obj.inputTitle,
    obj.inputDesc,
    obj.inputButton
  );
});

// delete/add hidden attribute
function changeHiddenAttr(...arr) {
  arr.forEach(function (element) {
    element.hidden = !element.hidden;
  });
}
//---------------------------------

//--------- DELETE TASK------------
// delete task
function deleteTask(event) {
  const li = event.target.closest("li");
  localStorage.removeItem(li.id);
  li.remove();
}
//---------------------------------

//-------- COMPLETE TASK-----------
function comletedTask(event) {
  let taskItem = event.target.closest("li");
  taskItem.querySelector(".edit-btn").remove();
  taskItem.querySelector(".complete-btn").remove();

  let variables = JSON.parse(localStorage.getItem(taskItem.id));
  variables.current = false;
  // variables.template = taskItem.outerHTML;
  localStorage.setItem(taskItem.id, JSON.stringify(variables));

  $completedTasks.append(taskItem);
}
//---------------------------------

// get title, text, priority, date
function createVariablesForTask() {
  const title = document.querySelector("#inputTitle").value;
  const text = document.querySelector("#inputText").value;
  const priorityItems = document.querySelectorAll(".form-check-input");
  const date = getDate();
  let priority = "";

  for (let item of priorityItems) {
    if (item.checked) {
      priority = item.value;
    }
  }

  let obj = {
    title: title,
    text: text,
    priority: priority,
    date: date,
    id: generateId(),
    current: true,
  };

  return obj;
}

// date create
function getDate() {
  const currentDate = new Date();
  const hours = currentDate.getHours();
  const minutes = currentDate.getMinutes();
  const day = currentDate.getDate();
  const month = currentDate.getMonth() + 1;
  const year = currentDate.getFullYear();
  const time = `${validateDate(hours)}:${validateDate(minutes)}`;
  const date = `${validateDate(day)}.${validateDate(month)}.${validateDate(
    year
  )}`;
  return `${time} ${date}`;
}

function validateDate(value) {
  return value < 10 ? "0" + value : value;
}

function generateId() {
  return "_" + Math.random().toString(36).substr(2, 9);
}
