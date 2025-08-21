import { Point2D, Rect } from "../utils";

export default class BaseSprite {
  protected ctx: CanvasRenderingContext2D;
  img: HTMLImageElement;
  position: Point2D;
  scale: Point2D;
  bounds: Rect;
  doLogic: boolean;

  constructor(
    ctx: CanvasRenderingContext2D,
    img: HTMLImageElement,
    x: number,
    y: number,
  ) {
    this.ctx = ctx;
    this.img = img;
    this.position = new Point2D(x, y);
    this.scale = new Point2D(1, 1);
    this.bounds = new Rect(x, y, this.img.width, this.img.height);
    this.doLogic = true;
  }

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  update(dt: number, ...args: any[]) {}

  protected _updateBounds() {
    this.bounds.set(
      this.position.x,
      this.position.y,
      ~~(0.5 + this.img.width * this.scale.x),
      ~~(0.5 + this.img.height * this.scale.y),
    );
  }

  protected _drawImage() {
    this.ctx.drawImage(this.img, this.position.x, this.position.y);
  }

  draw(resized: boolean) {
    this._updateBounds();
    this._drawImage();
  }
}
