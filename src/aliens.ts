import Enemy from "./entities/Enemy";
import Player from "./entities/Player";
import ParticleExplosion from "./entities/ParticleExplosion";
import { ClipRect, checkRectCollision } from "./utils";
import {
  ALIEN_BOTTOM_ROW,
  ALIEN_MIDDLE_ROW,
  ALIEN_TOP_ROW,
  ALIEN_X_MARGIN,
  ALIEN_SQUAD_WIDTH,
  CANVAS_HEIGHT,
  CANVAS_WIDTH,
} from "./constants";

export default class Aliens {
  aliens: Enemy[] = [];
  updateAlienLogic = false;
  alienDirection = -1;
  alienYDown = 0;
  alienCount = 0;
  wave = 1;

  constructor(
    private ctx: CanvasRenderingContext2D,
    private spriteSheetImg: HTMLImageElement,
    private bulletImg: HTMLImageElement,
  ) {}

  setupAlienFormation() {
    this.aliens = [];
    this.alienCount = 0;
    for (let i = 0, len = 5 * 11; i < len; i++) {
      const gridX = i % 11;
      const gridY = Math.floor(i / 11);
      let clipRects: ClipRect[] = [];
      switch (gridY) {
        case 0:
        case 1:
          clipRects = ALIEN_BOTTOM_ROW;
          break;
        case 2:
        case 3:
          clipRects = ALIEN_MIDDLE_ROW;
          break;
        case 4:
          clipRects = ALIEN_TOP_ROW;
          break;
      }
      this.aliens.push(
        new Enemy(
          this.ctx,
          this.spriteSheetImg,
          this.bulletImg,
          clipRects,
          CANVAS_WIDTH / 2 -
            ALIEN_SQUAD_WIDTH / 2 +
            ALIEN_X_MARGIN / 2 +
            gridX * ALIEN_X_MARGIN,
          CANVAS_HEIGHT / 3.25 - gridY * 40,
        ),
      );
      this.alienCount++;
    }
  }

  reset(player: Player) {
    this.setupAlienFormation();
    player.reset();
  }

  update(dt: number, player: Player) {
    if (this.updateAlienLogic) {
      this.updateAlienLogic = false;
      this.alienDirection = -this.alienDirection;
      this.alienYDown = 25;
    }

    for (let i = this.aliens.length - 1; i >= 0; i--) {
      let alien: Enemy | undefined = this.aliens[i];
      if (!alien.alive) {
        this.aliens.splice(i, 1);
        alien = undefined;
        this.alienCount--;
        if (this.alienCount < 1) {
          this.wave++;
          this.setupAlienFormation();
        }
        return;
      }

      alien.stepDelay = (this.alienCount * 20 - this.wave * 10) / 1000;
      if (alien.stepDelay <= 0.05) {
        alien.stepDelay = 0.05;
      }
      alien.update(dt, {
        alienDirection: this.alienDirection,
        setUpdateAlienLogic: () => {
          this.updateAlienLogic = true;
        },
        canvasWidth: CANVAS_WIDTH,
        reset: () => this.reset(player),
        alienYDown: this.alienYDown,
      });

      if (alien.doShoot) {
        alien.doShoot = false;
        alien.shoot();
      }
    }
    this.alienYDown = 0;
  }

  resolveBulletEnemyCollisions(player: Player, particleManager: ParticleExplosion) {
    const bullets = player.bullets;

    for (let i = 0, len = bullets.length; i < len; i++) {
      const bullet = bullets[i];
      for (let j = 0, alen = this.aliens.length; j < alen; j++) {
        const alien = this.aliens[j];
        if (checkRectCollision(bullet.bounds, alien.bounds)) {
          alien.alive = bullet.alive = false;
          particleManager.createExplosion(
            alien.position.x,
            alien.position.y,
            "white",
            70,
            5,
            5,
            3,
            0.15,
            50,
          );
          player.score += 25;
        }
      }
    }
  }

  resolveBulletPlayerCollisions(
    player: Player,
    particleManager: ParticleExplosion,
    onGameOver: () => void,
  ) {
    for (let i = 0, len = this.aliens.length; i < len; i++) {
      const alien = this.aliens[i];
      if (alien.bullet && checkRectCollision(alien.bullet.bounds, player.bounds)) {
        if (player.lives === 0) {
          onGameOver();
        } else {
          alien.bullet.alive = false;
          particleManager.createExplosion(
            player.position.x,
            player.position.y,
            "green",
            100,
            8,
            8,
            6,
            0.001,
            40,
          );
          player.position.set(CANVAS_WIDTH / 2, CANVAS_HEIGHT - 70);
          player.lives--;
          break;
        }
      }
    }
  }

  draw(resized: boolean) {
    for (let i = 0; i < this.aliens.length; i++) {
      const alien = this.aliens[i];
      alien.draw(resized);
    }
  }
}
