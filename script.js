const $currentTasks = document.querySelector("#currentTasks");
const $priority = document.querySelectorAll(".form-check-input");
const $btnAddTask = document.querySelector("#add-button");

let priorityValue = "";
$priority.forEach((element) => {
  element.addEventListener("change", (event) => {
    priorityValue = event.target.value;
  });
});

$btnAddTask.addEventListener("click", (event) => {
  event.preventDefault();
  const title = document.querySelector("#inputTitle").value;
  const text = document.querySelector("#inputText").value;
  if (!priorityValue) priorityValue = "Medium";
  console.log(priorityValue);
  console.log(title);
  console.log(text);
  document.querySelector("form").reset();
});

let title = "This title";
// let priority = "High";
let description = "Какой-то текст";

let taskItem = `<li class="list-group-item d-flex w-100 mb-2">
                <div class="w-100 mr-2">
                    <div class="d-flex w-100 justify-content-between">
                        <h5 class="mb-1">${title}</h5>
                        <div>
                            <small class="mr-2">PRIORITY</small>
                            <small>${getDate()}</small>
                        </div>

                    </div>
                    <p class="mb-1 w-100">${description}</p>
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

$currentTasks.insertAdjacentHTML("beforeend", taskItem);

function addTask() {}
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
