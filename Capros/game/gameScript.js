import { updateGround, setupGround } from "./ground.js"
import { updateDino, setupDino, getDinoRect, setDinoLose, setDinoWin } from "./dino.js"
import { updateCactus, setupCactus, getCactusRects } from "./cactus.js"
import { updateBackground, setupBackground } from "./background.js"


const WORLD_WIDTH = 100
const WORLD_HEIGHT = 35
const SPEED_SCALE_INCREASE = 0.00001

const worldElem = document.querySelector("[data-world]")
const startScreenElem = document.querySelector("[data-start-screen]")
const winScreenElem = document.querySelector("[data-win-screen]")
const infoBoxElem = document.querySelector("[data-info-box]")
const winBox = document.getElementById('win-box');
const backButton = document.getElementById('go-back');

const loseSound = new Audio('game/sounds/lose.mp3')
const winSound = new Audio('game/sounds/win.mp3');
const startSound = new Audio('game/sounds/bcn8bit.mp3');

setPixelToWorldScale()
window.addEventListener("resize", setPixelToWorldScale)
document.addEventListener("keydown", handleStart, { once: true })
document.addEventListener('click', handleStart, { once: true });

let lastTime
let speedScale
let score
let gameRunning = false;

document.addEventListener('visibilitychange', () => {
  if (document.hidden) {
    gameRunning = false;
  } else {
    gameRunning = true;
    lastTime = null
    window.requestAnimationFrame(update);
  }
});

function update(time) {
  if (!gameRunning) return;

  if (lastTime == null) {
    lastTime = time
    window.requestAnimationFrame(update)
    return
  }
  const delta = time - lastTime

  updateBackground(delta, speedScale)
  updateGround(delta, speedScale)
  updateDino(delta, speedScale)
  updateCactus(delta, speedScale, score)
  updateSpeedScale(delta)
  updateScore(delta)

  if (checkLose()) {
    loseSound.play();
    return handleLose()
  }

  lastTime = time
  window.requestAnimationFrame(update)
}

function checkLose() {
  const dinoRect = getDinoRect()
  return getCactusRects().some(rect => isCollision(rect, dinoRect))
}

function isCollision(rect1, rect2) {
  const bufferPercent = 0.2; // 20% buffer
  const bufferX = rect1.width * bufferPercent;
  const bufferY = rect1.height * bufferPercent;

  return (
    (rect1.left + bufferX) < rect2.right &&
    (rect1.top + bufferY) < rect2.bottom && 
    (rect1.right - bufferX) > rect2.left &&
    rect1.bottom > rect2.top
  );
}

function updateSpeedScale(delta) {
  speedScale += delta * SPEED_SCALE_INCREASE
}



function updateScore(delta) {
  score -= delta * 0.01
  score = Math.max(score, 0); // ensure score doesn't go below 0
  infoBoxElem.textContent = `Meta en: ${Math.floor(score)}m`

  if (score === 0) {
    
    handleWin();
  }
}

function handleStart(event) {
  if (event.code === 'Space') {
    event.preventDefault();
  }
  gameRunning = true;
  startSound.currentTime = 0;
  startSound.loop = true;
  startSound.volume = 0.7;
  startSound.play();

  lastTime = null
  speedScale = 1
  score = 500
  setupBackground()
  setupGround()
  setupDino()
  setupCactus()
  startScreenElem.classList.add("hide")
  infoBoxElem.classList.remove("hide")
  window.requestAnimationFrame(update)
}

function handleLose() {
  startSound.pause();
  setDinoLose()
  setTimeout(() => {
    document.addEventListener("keydown", handleStart, { once: true })
    document.addEventListener('click', handleStart, { once: true });
    infoBoxElem.classList.add("hide")
    startScreenElem.classList.remove("hide")
  }, 300)
}

function handleWin() {
  winSound.play();
  gameRunning = false;
  setDinoWin()
  infoBoxElem.classList.add("hide")
  winScreenElem.classList.remove("hide")
  setTimeout(() => {
    
    winBox.classList.add('show'); // Add the 'show' class
  }, 500); // 500ms delay

  //alert('You won the game!');
}

backButton.addEventListener('click', () => {
  window.location.href = 'index.html';
});

function setPixelToWorldScale() {
  let worldToPixelScale
  if (window.innerWidth / window.innerHeight < WORLD_WIDTH / WORLD_HEIGHT) {
    worldToPixelScale = window.innerWidth / WORLD_WIDTH
  } else {
    worldToPixelScale = window.innerHeight / WORLD_HEIGHT
  }

  worldElem.style.width = `${WORLD_WIDTH * worldToPixelScale}px`
  worldElem.style.height = `${WORLD_HEIGHT * worldToPixelScale}px`
}
