const form = document.querySelector(".js-form");
const input = form.querySelector("input");
const greetingText = document.querySelector(".js-greetings");
const toDoFormShowing = document.querySelector(".js-toDoForm");

const SHOWING_CN = "showing",
  USER_LS = "userName",
  GREETING_MESSAGES = 5;

function saveName(text) {
  localStorage.setItem(USER_LS, text);
}

function paintingName(text) {
  form.classList.remove(SHOWING_CN);
  greetingText.classList.add(SHOWING_CN);
  toDoFormShowing.classList.add(SHOWING_CN);
  const greetingList = [
    `Hello ${text} `,
    `Hello ${text}, Nice to meet you!`,
    `How are you, ${text}?`,
    `Have a good day ${text}`,
    `${text}, I hope you're doing well.`
  ];
  const ranNum = Math.floor(Math.random() * Date.now()) % GREETING_MESSAGES;
  console.log(ranNum);
  greetingText.innerText = greetingList[ranNum];
}

function submitHandle(event) {
  event.preventDefault();
  const currentValue = input.value;
  console.log(currentValue);
  paintingName(currentValue);
  saveName(currentValue);
}

function askForName() {
  form.classList.add(SHOWING_CN);
  form.addEventListener("submit", submitHandle);
}

function greeting() {
  const currentUser = localStorage.getItem(USER_LS);
  if (currentUser === null) {
    askForName();
  } else {
    paintingName(currentUser);
  }
}

function init() {
  greeting();
}

init();
