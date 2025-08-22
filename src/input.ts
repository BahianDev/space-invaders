import { LEFT_KEY, RIGHT_KEY } from "./constants";

const keyStates: boolean[] = [];
let prevKeyStates: boolean[] = [];

export function initInput(onTouch: () => void) {
  document.addEventListener("keydown", onKeyDown);
  document.addEventListener("keyup", onKeyUp);

  let touchStart: { x: number; y: number } | null = null;

  document.addEventListener("touchstart", (e) => {
    touchStart = {
      x: e.touches[0].clientX,
      y: e.touches[0].clientY,
    };
    onTouch();
  });

  document.addEventListener("touchmove", (e) => {
    if (!touchStart) return;
    const touchCurrent = {
      x: e.touches[0].clientX,
      y: e.touches[0].clientY,
    };
    const deltaX = touchCurrent.x - touchStart.x;
    if (deltaX > 0) {
      keyStates[RIGHT_KEY] = true;
      keyStates[LEFT_KEY] = false;
    } else if (deltaX < 0) {
      keyStates[LEFT_KEY] = true;
      keyStates[RIGHT_KEY] = false;
    }
  });

  document.addEventListener("touchend", () => {
    keyStates[LEFT_KEY] = false;
    keyStates[RIGHT_KEY] = false;
  });
}

export function onKeyDown(e: KeyboardEvent) {
  e.preventDefault();
  keyStates[e.keyCode] = true;
}

export function onKeyUp(e: KeyboardEvent) {
  e.preventDefault();
  keyStates[e.keyCode] = false;
}

export function isKeyDown(key: number) {
  return keyStates[key];
}

export function wasKeyPressed(key: number) {
  return !prevKeyStates[key] && keyStates[key];
}

export function updateInput() {
  prevKeyStates = keyStates.slice();
}
