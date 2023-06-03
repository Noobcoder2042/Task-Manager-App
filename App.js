const input = document.querySelector(".taskInput");
const addBtn = document.querySelector(".addBtn");
const open = document.querySelector(".openSection");
const hero = document.querySelector("hero");
const openUL = document.querySelector("#openSection-ul");
const modalBox = document.querySelector(".modelBox");
const closeBtn = document.querySelector("#close");
const SaveBtn = document.querySelector("#save");

let tasks = [];

addBtn.addEventListener("click", function () {
  const inputVal = input.value;

  if (inputVal.trim() !== "") {
    tasks.push({
      key: tasks.length,
      task: inputVal,
      description: "",
    });
    input.value = "";
    renderTask();
  }
});

function renderTask() {
  openUL.innerHTML = "";
  tasks.map((tasks) => {
    const li = document.createElement("li");
    li.className = "textBox";

    li.innerText = tasks.task;
    li.setAttribute("data-key", tasks.key);
    li.setAttribute("draggable", true);

    li.addEventListener("click", function () {
      openModel(tasks.key);
    });

    openUL.append(li);
  });
}

function openModel(key) {
  const taskFound = tasks.find((e) => e.key === key);
  const descriptionInputValue = taskFound.description;
  modalBox.innerHTML = `
  <h2>Task Description</h2>
  <textarea class="inputBox" placeholder="Add Your Task Description">${descriptionInputValue}</textarea>
  <br/>
  <button id="save">Save</button>
  <button id="close">Close</button>
`;

  const closeBtn = document.querySelector("#close");
  closeBtn.addEventListener("click", closeModal);

  const saveBtn = document.querySelector("#save");
  saveBtn.addEventListener("click", function () {
    saveDes(key);
  });

  modalBox.style.display = "block";
}

function closeModal() {
  modalBox.style.display = "none";
}

function saveDes(key) {
  const taskFound = tasks.find((e) => e.key === key);
  const descriptionInput = document.querySelector(".inputBox");
  taskFound.description = descriptionInput.value;
  if (taskFound.description.trim() == "") {
    alert("Can't Save Empty Description");
    taskFound.description = "";
  }

  closeModal();
}
