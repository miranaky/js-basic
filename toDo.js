const toDoForm = document.querySelector(".js-toDoForm");
const toDoInput = toDoForm.querySelector("input");
const toDo = document.querySelector(".js-toDoList");
const finished = document.querySelector(".js-finishedToDoList");

const TODO_LS = "toDoList",
  FINISHED_LS = "finishedList";
let toDos = [],
  finisheds = [];

function saveList(localStr, list) {
  localStorage.setItem(localStr, JSON.stringify(list));
}

function removeList(item, ulName, oldList) {
  ulName.removeChild(item);
  const cleanLists = oldList.filter(function(value) {
    return parseInt(value.id) !== parseInt(item.id);
  });
  return cleanLists;
}

function moveHandler(event) {
  const btn = event.target;
  const li = btn.parentNode;
  const span = li.querySelector("span").innerText;
  const id = li.id;
  const listType = li.parentNode.className;
  if (listType === "js-toDoList") {
    const cleanList = removeList(li, toDo, toDos);
    printFinished(span, id);
    toDos = cleanList;
    saveList(TODO_LS, toDos);
  } else if (listType === "js-finishedToDoList") {
    const cleanList = removeList(li, finished, finisheds);
    printToDo(span, id);
    finisheds = cleanList;
    saveList(FINISHED_LS, finisheds);
  }
}
function deleteHandler(event) {
  const btn = event.target;
  const li = btn.parentNode;
  const listType = li.parentNode.className;
  if (listType === "js-toDoList") {
    const cleanList = removeList(li, toDo, toDos);
    toDos = cleanList;
    saveList(TODO_LS, toDos);
  } else if (listType === "js-finishedToDoList") {
    const cleanList = removeList(li, finished, finisheds);
    finisheds = cleanList;
    saveList(FINISHED_LS, finisheds);
  }
}

function printFinished(text, id) {
  const li = document.createElement("li");
  const delBtn = document.createElement("button");
  const backBtn = document.createElement("button");
  const span = document.createElement("span");
  delBtn.innerText = "✘";
  backBtn.innerText = "⬅️";
  delBtn.addEventListener("click", deleteHandler);
  backBtn.addEventListener("click", moveHandler);
  span.innerText = text;
  li.appendChild(span);
  li.appendChild(delBtn);
  li.appendChild(backBtn);
  li.id = id;
  finished.appendChild(li);
  const finishedObj = {
    text: text,
    id: id
  };
  finisheds.push(finishedObj);
  saveList(FINISHED_LS, finisheds);
}

function printToDo(text, id) {
  const li = document.createElement("li");
  const delBtn = document.createElement("button");
  const chkBtn = document.createElement("button");
  const span = document.createElement("span");

  delBtn.innerText = "✘";
  chkBtn.innerText = "✔️";
  delBtn.addEventListener("click", deleteHandler);
  chkBtn.addEventListener("click", moveHandler);
  span.innerText = text;
  li.appendChild(span);
  li.appendChild(delBtn);
  li.appendChild(chkBtn);
  li.id = id;
  toDo.appendChild(li);
  const todoObj = {
    text: text,
    id: id
  };
  toDos.push(todoObj);
  saveList(TODO_LS, toDos);
}

function loadFinished() {
  const loadFinisheds = localStorage.getItem(FINISHED_LS);
  if (loadFinisheds !== null) {
    const parseFinisheds = JSON.parse(loadFinisheds);
    parseFinisheds.forEach(function(value) {
      printFinished(value.text, value.id);
    });
  }
}

function loadToDo() {
  const loadToDos = localStorage.getItem(TODO_LS);
  if (loadToDos !== null) {
    const parseToDos = JSON.parse(loadToDos);
    parseToDos.forEach(function(value) {
      printToDo(value.text, value.id);
    });
  }
  //   printToDo();
}

function submitHandler(event) {
  event.preventDefault();
  const taskValue = toDoInput.value;
  if (taskValue !== "") {
    const newId = Date.now();
    printToDo(taskValue, newId);
    toDoInput.value - "";
  } else {
    //pass
  }
}
function getToDo() {
  toDoForm.addEventListener("submit", submitHandler);
}

function init() {
  loadToDo();
  loadFinished();
  getToDo();
}

init();
