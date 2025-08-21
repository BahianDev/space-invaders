import SheetSprite from "./SheetSprite";
import Bullet from "./Bullet";
import { ClipRect, getRandomArbitrary } from "../utils";

export interface EnemyUpdateOptions {
  alienDirection: number;
  setUpdateAlienLogic: () => void;
  canvasWidth: number;
  reset: () => void;
  alienYDown: number;
}

export default class Enemy extends SheetSprite {
  clipRects: ClipRect[];
  onFirstState: boolean;
  stepDelay: number;
  stepAccumulator: number;
  doShoot: boolean;
  bullet?: Bullet;
  alive: boolean;
  private bulletImg: HTMLImageElement;

  constructor(
    ctx: CanvasRenderingContext2D,
    spriteSheetImg: HTMLImageElement,
    bulletImg: HTMLImageElement,
    clipRects: ClipRect[],
    x: number,
    y: number,
  ) {
    super(ctx, spriteSheetImg, clipRects[0], x, y);
    this.bulletImg = bulletImg;
    this.clipRects = clipRects;
    this.scale.set(0.5, 0.5);
    this.alive = true;
    this.onFirstState = true;
    this.stepDelay = 1;
    this.stepAccumulator = 0;
    this.doShoot = false;
    this.bullet = undefined;
  }

  toggleFrame() {
    this.onFirstState = !this.onFirstState;
    this.clipRect = this.onFirstState ? this.clipRects[0] : this.clipRects[1];
  }

  shoot() {
    this.bullet = new Bullet(
      this.ctx,
      this.bulletImg,
      this.position.x,
      this.position.y + this.bounds.w / 2,
      -1,
      500,
    );
  }

  update(dt: number, opts: EnemyUpdateOptions) {
    this.stepAccumulator += dt;

    if (this.stepAccumulator >= this.stepDelay) {
      if (this.position.x < this.bounds.w / 2 + 20 && opts.alienDirection < 0) {
        opts.setUpdateAlienLogic();
      }
      if (
        opts.alienDirection === 1 &&
        this.position.x > opts.canvasWidth - this.bounds.w / 2 - 20
      ) {
        opts.setUpdateAlienLogic();
      }
      if (this.position.y > opts.canvasWidth - 50) {
        opts.reset();
      }

      const fireTest = Math.floor(Math.random() * (this.stepDelay + 1));
      if (getRandomArbitrary(0, 1000) <= 5 * (this.stepDelay + 1)) {
        this.doShoot = true;
      }
      this.position.x += 10 * opts.alienDirection;
      this.toggleFrame();
      this.stepAccumulator = 0;
    }
    this.position.y += opts.alienYDown;

    if (this.bullet && this.bullet.alive) {
      this.bullet.update(dt);
    } else {
      this.bullet = undefined;
    }
  }

  draw(resized: boolean) {
    super.draw(resized);
    if (this.bullet !== undefined && this.bullet.alive) {
      this.bullet.draw(resized);
    }
  }
}
