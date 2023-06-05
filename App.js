const input = document.querySelector(".taskInput");
const addBtn = document.querySelector(".addBtn");
const open = document.querySelector(".openSection");
const hero = document.querySelector("hero");
const openUL = document.querySelector("#openSection-ul");
const modalBox = document.querySelector(".modelBox");
const closeBtn = document.querySelector("#close");
const SaveBtn = document.querySelector("#save");
const review = document.querySelector("#reviewSection-ul");

let tasks = [];

addBtn.addEventListener("click", function () {
  const inputVal = input.value;

  if (inputVal.trim() !== "") {
    // let id = "id" + Math.floor(Math.random() * 100);
    tasks.push({
      key: tasks.length,
      task: inputVal,
      description: "",
      // id: id,
    });
    input.value = "";
    renderTask();
    console.log(tasks);
  }
});

function renderTask() {
  openUL.innerHTML = "";
  tasks.map((tasks) => {
    const li = document.createElement("li");
    let id = "id" + Math.floor(Math.random() * 100);
    li.innerHTML = `<li data-key="${tasks.key}" id="${id}"
     draggable= 'true'  Class = "textBox"
    ondragstart="drag(event)">${tasks.task}
    </li>`;

    li.addEventListener("click", function () {
      openModel(tasks.key);
    });
    openUL.append(li);
  });
}
function drag(ev) {
  ev.stopPropagation();
  ev.dataTransfer.setData("text", ev.target.id);
  // console.log(ev);
  // console.log(ev.target);
}

function allowDrop(ev) {
  ev.stopPropagation();
  ev.preventDefault();

  // console.log("allowDrop");
}
function drop(ev) {
  ev.stopPropagation();

  ev.preventDefault();

  let data = ev.dataTransfer.getData("text");

  ev.target.appendChild(document.getElementById(data));

  console.log(tasks);

  // console.log(ev.target.childNodes[0].id);
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
// console.log(tasks);
// renderTask();
