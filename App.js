const input = document.querySelector(".taskInput");
const addBtn = document.querySelector(".addBtn");
const openUL = document.querySelector("#openSection-ul");
const modalBox = document.querySelector(".modelBox");

let tasks = [];
let draggedItemId = null;

function drag(ev) {
  ev.stopPropagation();
  ev.dataTransfer.setData("text", ev.target.id);
}

function allowDrop(ev) {
  ev.stopPropagation();
  ev.preventDefault();
}

function drop(ev) {
  ev.stopPropagation();
  ev.preventDefault();

  let data = ev.dataTransfer.getData("text");
  const droppedItem = document.getElementById(data);
  const droppedItemId = droppedItem.getAttribute("data-key");

  ev.target.appendChild(droppedItem);

  // Remove the dropped item from the tasks array
  tasks = tasks.filter((task) => task.key !== parseInt(droppedItemId));

  console.log(tasks);
}

addBtn.addEventListener("click", function () {
  const inputVal = input.value;

  if (inputVal.trim() !== "") {
    let id = Math.floor(Math.random() * 100);
    tasks.push({
      key: id,
      task: inputVal,
      description: "",
    });
    input.value = "";
    renderTask();
    // console.log(tasks);
  }
});

// addBtn.addEventListener("click", function () {
//   const inputVal = input.value;

//   if (inputVal.trim() !== "") {
//     tasks.push({
//       key: tasks.length,
//       task: inputVal,
//       description: "",
//     });
//     input.value = "";
//     setTimeout(renderTask, 100); // Delay the execution of renderTask
//     console.log(tasks);
//   }
// });

function renderTask() {
  openUL.innerHTML = "";
  tasks.map((task) => {
    if (task.key !== parseInt(draggedItemId)) {
      const li = document.createElement("li");
      let id = "id" + Math.floor(Math.random() * 100);
      li.innerHTML = `<li data-key="${task.key}" id="${id}"
       draggable='true' class="textBox"
       ondragstart="drag(event)">${task.task}
      </li>`;

      li.addEventListener("click", function () {
        openModel(task.key);
      });
      openUL.append(li);
    }
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

renderTask();
