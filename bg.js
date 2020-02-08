const body = document.querySelector("body");

const NUMBEROFIMAGES = 5;

function paintImage(imgNumber) {
  const image = new Image();
  image.src = `./images/${imgNumber + 1}.jpg`;
  image.classList.add("bgImage");
  body.prepend(image);
}

function genRandom() {
  return Math.floor(Math.random() * NUMBEROFIMAGES);
}

function init() {
  const randomNumber = genRandom();
  paintImage(randomNumber);
}

init();
