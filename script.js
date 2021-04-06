const $currentTasks = document.querySelector("#currentTasks");
const $priority = document.querySelectorAll(".form-check-input");
const $form = document.querySelector("form");
const $completedTasks = document.querySelector("#completedTasks");

// form submit and publish task
$form.addEventListener("submit", function (event) {
  event.preventDefault();
  const getData = createTask();
  addTask(getData.title, getData.text, getData.priority, getData.date);
  $form.reset();
});

// add task with nessesary parametrs
function addTask(title, text, priority, date) {
  let taskItem = `<li class="list-group-item d-flex w-100 mb-2">
                <div class="w-100 mr-2">
                    <div class="d-flex w-100 justify-content-between">
                        <h5 class="mb-1">${title}</h5>
                        <input id="task-title" class="col-6" type="text" hidden>
                        <div>
                            <small class="mr-2">${priority} priority</small>
                            <small>${date}</small>
                        </div>

                    </div>
                    <p class="mb-1 w-100">${text}</p>
                    <textarea id="task-desc" class="col-8 mt-2" type="text" hidden></textarea>
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
  // onclick="editTask(event)"

  $currentTasks.insertAdjacentHTML("afterbegin", taskItem);
}

// for buttons edit, delete, completeds
document.body.addEventListener("click", function (event) {
  if (event.target.classList.contains("edit-btn")) editTask(event);
  if (event.target.classList.contains("delete-btn")) deleteTask(event);
  if (event.target.classList.contains("complete-btn")) comletedTask(event);
});

// edit task
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
  //hidden
  const inputTitle = task.querySelector("#task-title");
  const inputDesc = task.querySelector("#task-desc");
  const inputButton = task.querySelector(".confirm-edit");

  return {
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
    element.hidden = element.hidden ? false : true;
  });
}

// delete task
function deleteTask(event) {
  event.target.closest("li").remove();
}

// complete task
function comletedTask(event) {
  let taskItem = event.target.closest("li");
  taskItem.querySelector(".edit-btn").setAttribute("disabled", "disabled");
  taskItem.querySelector(".complete-btn").setAttribute("disabled", "disabled");
  $completedTasks.append(taskItem);
}

// get title, text, priority, date
function createTask() {
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
