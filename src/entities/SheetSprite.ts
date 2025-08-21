import BaseSprite from "./BaseSprite";
import { ClipRect } from "../utils";

export default class SheetSprite extends BaseSprite {
  clipRect: ClipRect;

  constructor(
    ctx: CanvasRenderingContext2D,
    sheetImg: HTMLImageElement,
    clipRect: ClipRect,
    x: number,
    y: number,
  ) {
    super(ctx, sheetImg, x, y);
    this.clipRect = clipRect;
    this.bounds.set(x, y, this.clipRect.w, this.clipRect.h);
  }

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  update(dt: number, ...args: any[]) {}

  protected _updateBounds() {
    const w = ~~(0.5 + this.clipRect.w * this.scale.x);
    const h = ~~(0.5 + this.clipRect.h * this.scale.y);
    this.bounds.set(this.position.x - w / 2, this.position.y - h / 2, w, h);
  }

  protected _drawImage() {
    this.ctx.save();
    this.ctx.transform(
      this.scale.x,
      0,
      0,
      this.scale.y,
      this.position.x,
      this.position.y,
    );
    this.ctx.drawImage(
      this.img,
      this.clipRect.x,
      this.clipRect.y,
      this.clipRect.w,
      this.clipRect.h,
      ~~(0.5 + -this.clipRect.w * 0.5),
      ~~(0.5 + -this.clipRect.h * 0.5),
      this.clipRect.w,
      this.clipRect.h,
    );
    this.ctx.restore();
  }

  draw(resized: boolean) {
    super.draw(resized);
  }
}
