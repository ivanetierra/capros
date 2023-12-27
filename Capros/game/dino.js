import {
  incrementCustomProperty,
  setCustomProperty,
  getCustomProperty,
} from "./updateCustomProperty.js"

const dinoElem = document.querySelector("[data-dino]")
const JUMP_SPEED = 0.45
const GRAVITY = 0.0015
const DINO_FRAME_COUNT = 2
const FRAME_TIME = 100

let isJumping
let dinoFrame
let currentFrameTime
let yVelocity
export function setupDino() {
  isJumping = false
  dinoFrame = 0
  currentFrameTime = 0
  yVelocity = 0
  setCustomProperty(dinoElem, "--bottom", 0)
  document.removeEventListener("keydown", onJump)
  document.addEventListener("keydown", onJump)
  document.removeEventListener('click', onJump);
  document.addEventListener('click', onJump);
}

export function updateDino(delta, speedScale) {
  handleRun(delta, speedScale)
  handleJump(delta)
}

export function getDinoRect() {
  return dinoElem.getBoundingClientRect()
}

export function setDinoLose() {
  dinoElem.classList.remove('running');
  dinoElem.style.backgroundImage = 'url(imgs/alien-dead.png)';
  dinoElem.style.backgroundSize = '100%';
    dinoElem.style.width = '8.4%';
}

function handleRun(delta, speedScale) {
  if (isJumping) {
    dinoElem.style.backgroundImage = 'url(imgs/alien-jump.png)';
    dinoElem.style.backgroundSize = '100%';
    dinoElem.style.width = '8.4%';
    dinoElem.classList.remove('running');
    return;
  }

  dinoElem.style.backgroundImage = 'url(imgs/css_sprites.png)';
  dinoElem.style.backgroundSize = '200%'; 
  dinoElem.style.width = '7.5%';
  dinoElem.classList.add('running');
  currentFrameTime += delta * speedScale;
}

function handleJump(delta) {
  if (!isJumping) return

  incrementCustomProperty(dinoElem, "--bottom", yVelocity * delta)

  if (getCustomProperty(dinoElem, "--bottom") <= 0) {
    setCustomProperty(dinoElem, "--bottom", 0)
    isJumping = false
  }

  yVelocity -= GRAVITY * delta
}

function onJump(e) {
  if (e.type !== "click" && e.code !== "Space" || isJumping) return

  yVelocity = JUMP_SPEED
  isJumping = true
}
