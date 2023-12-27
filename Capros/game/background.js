import {
  getCustomProperty,
  incrementCustomProperty,
  setCustomProperty,
} from "./updateCustomProperty.js"

const SPEED = 0.005
const backgroundElems = document.querySelectorAll("[data-background]")

export function setupBackground() {
  setCustomProperty(backgroundElems[0], "--left", 0)
  setCustomProperty(backgroundElems[1], "--left", 100)
}

export function updateBackground(delta, speedScale) {
  backgroundElems.forEach(background => {
    incrementCustomProperty(background, "--left", delta * speedScale * SPEED * -1)
    if (getCustomProperty(background, "--left") <= -100) {
      incrementCustomProperty(background, "--left", 200)
    }
  })
}
