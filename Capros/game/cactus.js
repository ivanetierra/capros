import {
  setCustomProperty,
  incrementCustomProperty,
  getCustomProperty,
} from "./updateCustomProperty.js"

const SPEED = 0.04
const CACTUS_INTERVAL_MIN = 700
const CACTUS_INTERVAL_MAX = 2000
const worldElem = document.querySelector("[data-world]")

let nextCactusTime
export function setupCactus() {
  nextCactusTime = CACTUS_INTERVAL_MIN
  document.querySelectorAll("[data-cactus]").forEach(cactus => {
    cactus.remove()
  })
}

export function updateCactus(delta, speedScale) {
  document.querySelectorAll("[data-cactus]").forEach(cactus => {
    incrementCustomProperty(cactus, "--left", delta * speedScale * SPEED * -1)
    if (getCustomProperty(cactus, "--left") <= -100) {
      cactus.remove()
    }
  })

  if (nextCactusTime <= 0) {
    if(randomNumberBetween(1,4)==1){
      createCactus()
    }else if(randomNumberBetween(1,4)==2){
      createSkater()
    }else if(randomNumberBetween(1,4)==3){
      createPlumber()
    }else if(randomNumberBetween(1,4)==3){
      createPidgeon()
    }else{
      createSagrada()
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
  cactus.src = "imgs/cactus.png"
  cactus.classList.add("cactus")
  setCustomProperty(cactus, "--left", 100)
  worldElem.append(cactus)
}

function createSagrada() {
  const cactus = document.createElement("img")
  cactus.dataset.cactus = true
  cactus.src = "imgs/sagrada.png"
  cactus.classList.add("sagrada")
  setCustomProperty(cactus, "--left", 100)
  worldElem.append(cactus)

}
function createPlumber() {
  const cactus = document.createElement("img")
  cactus.dataset.cactus = true
  cactus.src = "imgs/plumber-modified.png"
  cactus.classList.add("plumber")
  setCustomProperty(cactus, "--left", 100)
  worldElem.append(cactus)
}
function createSkater() {
  const cactus = document.createElement("img")
  cactus.dataset.cactus = true
  cactus.src = "imgs/skater.png"
  cactus.classList.add("skater")
  setCustomProperty(cactus, "--left", 100)
  worldElem.append(cactus)
}
function createPidgeon() {
  const cactus = document.createElement("img")
  cactus.dataset.cactus = true
  cactus.src = "imgs/pidgeon.png"
  cactus.classList.add("pidgeon")
  setCustomProperty(cactus, "--left", 100)
  worldElem.append(cactus)
}

function randomNumberBetween(min, max) {
  return Math.floor(Math.random() * (max - min + 1) + min)
}


