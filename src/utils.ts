export type ClipRect = { x: number; y: number; w: number; h: number };

export function getRandomArbitrary(min: number, max: number) {
  return Math.random() * (max - min) + min;
}

export function clamp(num: number, min: number, max: number) {
  return Math.min(Math.max(num, min), max);
}

export function valueInRange(value: number, min: number, max: number) {
  return value <= max && value >= min;
}

export function checkRectCollision(A: ClipRect, B: ClipRect) {
  const xOverlap =
    valueInRange(A.x, B.x, B.x + B.w) || valueInRange(B.x, A.x, A.x + A.w);

  const yOverlap =
    valueInRange(A.y, B.y, B.y + B.h) || valueInRange(B.y, A.y, A.y + A.h);
  return xOverlap && yOverlap;
}

export class Point2D {
  x: number;
  y: number;

  constructor(x: number, y: number) {
    this.x = typeof x === "undefined" ? 0 : x;
    this.y = typeof y === "undefined" ? 0 : y;
  }

  set(x: number, y: number) {
    this.x = x;
    this.y = y;
  }
}

export class Rect {
  x: number;
  y: number;
  w: number;
  h: number;

  constructor(x: number, y: number, w: number, h: number) {
    this.x = typeof x === "undefined" ? 0 : x;
    this.y = typeof y === "undefined" ? 0 : y;
    this.w = typeof w === "undefined" ? 0 : w;
    this.h = typeof h === "undefined" ? 0 : h;
  }

  set(x: number, y: number, w: number, h: number) {
    this.x = x;
    this.y = y;
    this.w = w;
    this.h = h;
  }
}
