import {
  setCustomProperty,
  incrementCustomProperty,
  getCustomProperty,
} from "./updateCustomProperty.js"


const SPEED = 0.04
const CACTUS_INTERVAL_MIN = 800
const CACTUS_INTERVAL_MAX = 2000
const worldElem = document.querySelector("[data-world]")

let nextCactusTime
export function setupCactus() {
  nextCactusTime = CACTUS_INTERVAL_MIN
  document.querySelectorAll("[data-cactus]").forEach(cactus => {
    cactus.remove()
  })
}
let primaveraCreated = false;

export function updateCactus(delta, speedScale, score) {
  document.querySelectorAll("[data-cactus]").forEach(cactus => {
    incrementCustomProperty(cactus, "--left", delta * speedScale * SPEED * -1)
    
    if (getCustomProperty(cactus, "--left") <= -100) {
      cactus.remove()
    }
   
  })
  if (score <= 15 && !primaveraCreated) {
    // Create new obstacle
    createPrimavera();
    primaveraCreated = true;

  }

  if (nextCactusTime <= 0 && score>35) {
    const randomNumber = randomNumberBetween(1,10);
    if(randomNumber == 1){
      createTaxi();
    } else if(randomNumber == 2){
      createSkater();
    } else if(randomNumber == 3){
      createPlumber();
    } else if(randomNumber == 4){
      createPidgeon();
    } else if(randomNumber == 5){
      createCactus();
    } else if(randomNumber == 6){
      createUmbrella();
    } else if(randomNumber == 7){
      createDrunk();
    } else if(randomNumber == 8){
      createTourist();
    } else if(randomNumber == 9){
      createTourist2();
    } else {
      createSagrada();
    }
    nextCactusTime =
      randomNumberBetween(CACTUS_INTERVAL_MIN, CACTUS_INTERVAL_MAX) / speedScale
  }
  nextCactusTime -= delta
}

export function getCactusRects() {
  return [...document.querySelectorAll("[data-cactus]")].map(cactus => {
    return cactus.getBoundingClientRect()
  })
}

function createCactus() {
  const cactus = document.createElement("img")
  cactus.dataset.cactus = true
  cactus.src = "game/imgs/cactus.png"
  cactus.classList.add("cactus")
  setCustomProperty(cactus, "--left", 100)
  worldElem.append(cactus)
}

function createSagrada() {
  const cactus = document.createElement("img")
  cactus.dataset.cactus = true
  cactus.src = "game/imgs/sagrada.png"
  cactus.classList.add("sagrada")
  setCustomProperty(cactus, "--left", 100)
  worldElem.append(cactus)

}
function createPlumber() {
  const cactus = document.createElement("img")
  cactus.dataset.cactus = true
  cactus.src = "game/imgs/plumber-modified.png"
  cactus.classList.add("plumber")
  setCustomProperty(cactus, "--left", 100)
  worldElem.append(cactus)
}
function createSkater() {
  const cactus = document.createElement("img")
  cactus.dataset.cactus = true
  cactus.src = "game/imgs/skater.png"
  cactus.classList.add("skater")
  setCustomProperty(cactus, "--left", 100)
  worldElem.append(cactus)
}
function createPidgeon() {
  const cactus = document.createElement("img")
  cactus.dataset.cactus = true
  cactus.src = "game/imgs/pidgeon.png"
  cactus.classList.add("pidgeon")
  setCustomProperty(cactus, "--left", 100)
  worldElem.append(cactus)
}
function createTaxi() {
  const cactus = document.createElement("img")
  cactus.dataset.cactus = true
  cactus.src = "game/imgs/taxi.png"
  cactus.classList.add("taxi")
  setCustomProperty(cactus, "--left", 100)
  worldElem.append(cactus)
}
function createPrimavera() {
  const primavera = document.createElement("img");
  primavera.dataset.cactus = true;
  primavera.src = "game/imgs/primavera.gif";
  primavera.classList.add("primavera");
  setCustomProperty(primavera, "--left", 100);
  worldElem.append(primavera);
}

function createUmbrella() {
  const primavera = document.createElement("img");
  primavera.dataset.cactus = true;
  primavera.src = "game/imgs/umbrella.png";
  primavera.classList.add("umbrella");
  setCustomProperty(primavera, "--left", 100);
  worldElem.append(primavera);
}

function createDrunk() {
  const primavera = document.createElement("img");
  primavera.dataset.cactus = true;
  primavera.src = "game/imgs/drunk.png";
  primavera.classList.add("drunk");
  setCustomProperty(primavera, "--left", 100);
  worldElem.append(primavera);
}

function createTourist() {
  const primavera = document.createElement("img");
  primavera.dataset.cactus = true;
  primavera.src = "game/imgs/tourist.png";
  primavera.classList.add("drunk");
  setCustomProperty(primavera, "--left", 100);
  worldElem.append(primavera);
}

function createTourist2() {
  const primavera = document.createElement("img");
  primavera.dataset.cactus = true;
  primavera.src = "game/imgs/tourist2.png";
  primavera.classList.add("drunk");
  setCustomProperty(primavera, "--left", 100);
  worldElem.append(primavera);
}

function randomNumberBetween(min, max) {
  return Math.floor(Math.random() * (max - min + 1) + min)
}


