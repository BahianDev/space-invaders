// Based on original source from https://codepen.io/adelciotto/pen/WNzRYy
// By Anthony Del Ciotto <https://github.com/adelciotto>

import Player from "./entities/Player";
import ParticleExplosion from "./entities/ParticleExplosion";
import { LEFT_KEY, RIGHT_KEY, SHOOT_KEY, PLAYER_CLIP_RECT } from "./constants";
import { initCanvas, resize } from "./canvas";
import {
  initInput,
  isKeyDown,
  wasKeyPressed,
  updateInput,
} from "./input";
import { drawBottomHud, drawStartScreen } from "./hud";
import Aliens from "./aliens";

export interface InvadersOptions {
  selector?: string;
  canvas?: HTMLCanvasElement;
  width?: number;
  height?: number;
  autoPlay?: boolean;
  title?: string;
}

export class Game {
  canvas: HTMLCanvasElement;
  ctx: CanvasRenderingContext2D;
  spriteSheetImg: HTMLImageElement;
  bulletImg: HTMLImageElement;
  width: number;
  height: number;

  player: Player;
  aliens: Aliens;
  particleManager: ParticleExplosion;
  lastTime = 0;
  hasGameStarted = false;
  title: string;

  constructor(private options: InvadersOptions = {}) {
    const init = initCanvas(options);
    this.canvas = init.canvas;
    this.ctx = init.ctx;
    this.spriteSheetImg = init.spriteSheetImg;
    this.bulletImg = init.bulletImg;
    this.width = init.width;
    this.height = init.height;
    this.title = options.title || "Space Invaders";

    this.player = new Player(
      this.ctx,
      this.spriteSheetImg,
      PLAYER_CLIP_RECT,
      this.width,
      this.height,
      this.bulletImg,
      isKeyDown,
      wasKeyPressed,
      { left: LEFT_KEY, right: RIGHT_KEY, shoot: SHOOT_KEY },
    );
    this.particleManager = new ParticleExplosion(this.ctx);
    this.aliens = new Aliens(this.ctx, this.spriteSheetImg, this.bulletImg);
    this.aliens.setupAlienFormation();

    initInput(() => {
      if (this.hasGameStarted) {
        this.player.shoot();
      } else {
        this.initGame();
        this.hasGameStarted = true;
      }
    });

    window.addEventListener("resize", () => resize(this.canvas, this.ctx, this.width, this.height));
    this.resize();
    this.animate();

    if (options.autoPlay) {
      this.initGame();
      this.hasGameStarted = true;
    }
  }

  initGame() {
    this.player.reset();
    this.aliens.setupAlienFormation();
    drawBottomHud(this.ctx, this.spriteSheetImg, this.player);
  }

  resize() {
    resize(this.canvas, this.ctx, this.width, this.height);
  }

  update(dt: number) {
    this.player.handleInput();
    updateInput();
    this.player.update(dt);
    this.aliens.update(dt, this.player);
    this.aliens.resolveBulletEnemyCollisions(this.player, this.particleManager);
    this.aliens.resolveBulletPlayerCollisions(this.player, this.particleManager, () => {
      this.hasGameStarted = false;
    });
  }

  draw(resized: boolean) {
    this.player.draw(resized);
    this.aliens.draw(resized);
    this.particleManager.draw();
    drawBottomHud(this.ctx, this.spriteSheetImg, this.player);
  }

  animate = () => {
    const now = window.performance.now();
    let dt = now - this.lastTime;
    if (dt > 100) dt = 100;
    if (wasKeyPressed(13) && !this.hasGameStarted) {
      this.initGame();
      this.hasGameStarted = true;
    }

    if (this.hasGameStarted) {
      this.update(dt / 1000);
    }

    this.ctx.fillStyle = "black";
    this.ctx.fillRect(0, 0, this.width, this.height);
    if (this.hasGameStarted) {
      this.draw(false);
    } else {
      drawStartScreen(this.ctx, this.title);
    }
    this.lastTime = now;
    requestAnimationFrame(this.animate);
  };
}

export function startGame(options: InvadersOptions = {}) {
  new Game(options);
}
