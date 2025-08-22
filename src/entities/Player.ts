import SheetSprite from "./SheetSprite";
import Bullet from "./Bullet";
import { ClipRect, clamp } from "../utils";
import { playShootSound } from "../sound";

export default class Player extends SheetSprite {
  lives: number;
  xVel: number;
  bullets: Bullet[];
  bulletDelayAccumulator: number;
  score: number;
  private canvasWidth: number;
  private canvasHeight: number;
  private bulletImg: HTMLImageElement;
  private isKeyDown: (key: number) => boolean;
  private wasKeyPressed: (key: number) => boolean;
  private keys: { left: number; right: number; shoot: number };

  constructor(
    ctx: CanvasRenderingContext2D,
    spriteSheetImg: HTMLImageElement,
    clipRect: ClipRect,
    canvasWidth: number,
    canvasHeight: number,
    bulletImg: HTMLImageElement,
    isKeyDown: (key: number) => boolean,
    wasKeyPressed: (key: number) => boolean,
    keys: { left: number; right: number; shoot: number },
  ) {
    super(ctx, spriteSheetImg, clipRect, canvasWidth / 2, canvasHeight - 70);
    this.scale.set(0.85, 0.85);
    this.lives = 3;
    this.xVel = 0;
    this.bullets = [];
    this.bulletDelayAccumulator = 0;
    this.score = 0;
    this.canvasWidth = canvasWidth;
    this.canvasHeight = canvasHeight;
    this.bulletImg = bulletImg;
    this.isKeyDown = isKeyDown;
    this.wasKeyPressed = wasKeyPressed;
    this.keys = keys;
  }

  reset() {
    this.lives = 3;
    this.score = 0;
    this.position.set(this.canvasWidth / 2, this.canvasHeight - 70);
  }

  shoot() {
    const bullet = new Bullet(
      this.ctx,
      this.bulletImg,
      this.position.x,
      this.position.y - this.bounds.h / 2,
      1,
      1000,
    );
    this.bullets.push(bullet);
    playShootSound();
  }

  handleInput() {
    if (this.isKeyDown(this.keys.left)) {
      this.xVel = -175;
    } else if (this.isKeyDown(this.keys.right)) {
      this.xVel = 175;
    } else this.xVel = 0;

    if (this.wasKeyPressed(this.keys.shoot)) {
      if (this.bulletDelayAccumulator > 0.5) {
        this.shoot();
        this.bulletDelayAccumulator = 0;
      }
    }
  }

  updateBullets(dt: number) {
    for (let i = this.bullets.length - 1; i >= 0; i--) {
      let bullet = this.bullets[i];
      if (bullet.alive) {
        bullet.update(dt);
      } else {
        this.bullets.splice(i, 1);
        bullet = undefined as any;
      }
    }
  }

  update(dt: number) {
    this.bulletDelayAccumulator += dt;

    this.position.x += this.xVel * dt;

    this.position.x = clamp(
      this.position.x,
      this.bounds.w / 2,
      this.canvasWidth - this.bounds.w / 2,
    );
    this.updateBullets(dt);
  }

  draw(resized: boolean) {
    super.draw(resized);

    for (let i = 0, len = this.bullets.length; i < len; i++) {
      const bullet = this.bullets[i];
      if (bullet.alive) {
        bullet.draw(resized);
      }
    }
  }
}
