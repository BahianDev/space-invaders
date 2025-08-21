import BaseSprite from "./BaseSprite";

export default class Bullet extends BaseSprite {
  direction: number;
  speed: number;
  alive: boolean;

  constructor(
    ctx: CanvasRenderingContext2D,
    img: HTMLImageElement,
    x: number,
    y: number,
    direction: number,
    speed: number,
  ) {
    super(ctx, img, x, y);
    this.direction = direction;
    this.speed = speed;
    this.alive = true;
  }

  update(dt: number) {
    this.position.y -= this.speed * this.direction * dt;

    if (this.position.y < 0) {
      this.alive = false;
    }
  }

  draw(resized: boolean) {
    super.draw(resized);
  }
}
