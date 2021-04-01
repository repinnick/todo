const $currentTasks = document.querySelector("#currentTasks");
const $priority = document.querySelectorAll(".form-check-input");
const $btnAddTask = document.querySelector("#add-button");

// get title, text, priority
$btnAddTask.addEventListener("click", (event) => {
  event.preventDefault();
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
  addTask(title, text, priority, date);
  document.querySelector("form").reset();
});

// add task with nessesary parametrs
function addTask(title, text, priority, date) {
  let taskItem = `<li class="list-group-item d-flex w-100 mb-2">
                <div class="w-100 mr-2">
                    <div class="d-flex w-100 justify-content-between">
                        <h5 class="mb-1">${title}</h5>
                        <div>
                            <small class="mr-2">${priority} priority</small>
                            <small>${date}</small>
                        </div>

                    </div>
                    <p class="mb-1 w-100">${text}</p>
                </div>
                <div class="dropdown m-2 dropleft">
                    <button class="btn btn-secondary h-100" type="button" id="dropdownMenuItem1" 
                            data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                        <i class="fas fa-ellipsis-v"></i>
                    </button>
                    <div class="dropdown-menu p-2 flex-column" aria-labelledby="dropdownMenuItem1">
                        <button type="button" class="btn btn-success w-100">Complete</button>
                        <button type="button" class="btn btn-info w-100 my-2">Edit</button>
                        <button type="button" class="btn btn-danger w-100">Delete</button>
                    </div>
                </div>
            </li>`;

  $currentTasks.insertAdjacentHTML("afterbegin", taskItem);
}

function createTask() {}

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
