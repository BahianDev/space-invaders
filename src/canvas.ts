import { CANVAS_WIDTH, CANVAS_HEIGHT, IS_CHROME, SPRITE_SHEET_SRC } from "./constants";

export interface CanvasInitOptions {
  selector?: string;
  canvas?: HTMLCanvasElement;
  width?: number;
  height?: number;
}

export function initCanvas(options: CanvasInitOptions = {}) {
  let canvas: HTMLCanvasElement;
  if (options.canvas) {
    canvas = options.canvas;
  } else {
    const selector = options.selector || "#invaders";
    const el = document.querySelector(selector) || document.body;
    canvas = document.createElement("canvas");
    el.appendChild(canvas);
  }

  const width = options.width || CANVAS_WIDTH;
  const height = options.height || CANVAS_HEIGHT;

  canvas.width = width;
  canvas.height = height;
  const ctx = canvas.getContext("2d") as CanvasRenderingContext2D;
  setImageSmoothing(ctx, false);

  const spriteSheetImg = new Image();
  spriteSheetImg.src = SPRITE_SHEET_SRC;

  const bulletImg = preDrawBullet();
  return { canvas, ctx, spriteSheetImg, bulletImg, width, height };
}

function preDrawBullet() {
  const canvas = drawIntoCanvas(2, 8, (ctx) => {
    ctx.fillStyle = "white";
    ctx.fillRect(0, 0, ctx.canvas.width, ctx.canvas.height);
  });
  const img = new Image();
  img.src = canvas.toDataURL();
  return img;
}

export function drawIntoCanvas(
  width: number,
  height: number,
  drawFunc: (ctx: CanvasRenderingContext2D) => void,
) {
  const canvas = document.createElement("canvas");
  canvas.width = width;
  canvas.height = height;
  const ctx = canvas.getContext("2d") as CanvasRenderingContext2D;
  drawFunc(ctx);
  return canvas;
}

export function setImageSmoothing(
  ctx: CanvasRenderingContext2D,
  value: boolean,
) {
  (ctx as any)["imageSmoothingEnabled"] = value;
  (ctx as any)["mozImageSmoothingEnabled"] = value;
  (ctx as any)["oImageSmoothingEnabled"] = value;
  (ctx as any)["webkitImageSmoothingEnabled"] = value;
  (ctx as any)["msImageSmoothingEnabled"] = value;
}

export function resize(
  canvas: HTMLCanvasElement,
  ctx: CanvasRenderingContext2D,
  width: number,
  height: number,
) {
  const w = window.innerWidth;
  const h = window.innerHeight;
  const scaleFactor = Math.min(w / width, h / height);

  if (IS_CHROME) {
    canvas.width = width * scaleFactor;
    canvas.height = height * scaleFactor;
    setImageSmoothing(ctx, false);
    ctx.transform(scaleFactor, 0, 0, scaleFactor, 0, 0);
  } else {
    canvas.style.width = width * scaleFactor + "px";
    canvas.style.height = height * scaleFactor + "px";
  }
}
