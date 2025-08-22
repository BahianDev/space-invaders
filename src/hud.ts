import { CANVAS_HEIGHT, CANVAS_WIDTH, TEXT_BLINK_FREQ } from "./constants";
import Player from "./entities/Player";

export function fillText(
  ctx: CanvasRenderingContext2D,
  text: string,
  x: number,
  y: number,
  color?: string,
  fontSize?: number,
) {
  if (typeof color !== "undefined") ctx.fillStyle = color;
  if (typeof fontSize !== "undefined") ctx.font = fontSize + "px Play";
  ctx.fillText(text, x, y);
}

export function fillCenteredText(
  ctx: CanvasRenderingContext2D,
  text: string,
  x: number,
  y: number,
  color?: string,
  fontSize?: number,
) {
  const metrics = ctx.measureText(text);
  fillText(ctx, text, x - metrics.width / 2, y, color, fontSize);
}

export function fillBlinkingText(
  ctx: CanvasRenderingContext2D,
  text: string,
  x: number,
  y: number,
  blinkFreq: number,
  color?: string,
  fontSize?: number,
) {
  if (~~(0.5 + Date.now() / blinkFreq) % 2) {
    fillCenteredText(ctx, text, x, y, color, fontSize);
  }
}

export function drawBottomHud(
  ctx: CanvasRenderingContext2D,
  spriteSheetImg: HTMLImageElement,
  player: Player,
) {
  ctx.fillStyle = "#02ff12";
  ctx.fillRect(0, CANVAS_HEIGHT - 30, CANVAS_WIDTH, 2);
  fillText(ctx, player.lives + " x ", 10, CANVAS_HEIGHT - 7.5, "white", 20);
  ctx.drawImage(
    spriteSheetImg,
    player.clipRect.x,
    player.clipRect.y,
    player.clipRect.w,
    player.clipRect.h,
    45,
    CANVAS_HEIGHT - 23,
    player.clipRect.w * 0.5,
    player.clipRect.h * 0.5,
  );
  fillText(ctx, "CREDIT: ", CANVAS_WIDTH - 115, CANVAS_HEIGHT - 7.5);
  fillCenteredText(
    ctx,
    "SCORE: " + player.score,
    CANVAS_WIDTH / 2,
    20,
  );
  fillBlinkingText(
    ctx,
    "00",
    CANVAS_WIDTH - 25,
    CANVAS_HEIGHT - 7.5,
    TEXT_BLINK_FREQ,
  );
}

export function drawStartScreen(
  ctx: CanvasRenderingContext2D,
  title: string,
) {
  fillCenteredText(ctx, title, CANVAS_WIDTH / 2, CANVAS_HEIGHT / 2.75, "#FFFFFF", 36);
  fillBlinkingText(
    ctx,
    "Press enter to play!",
    CANVAS_WIDTH / 2,
    CANVAS_HEIGHT / 2,
    500,
    "#FFFFFF",
    36,
  );
}
