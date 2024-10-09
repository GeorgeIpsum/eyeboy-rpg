import * as ex from "excalibur";

import { BoySheet } from "./resources";

const frameSpeed = 300;
const boySpeed = 32;

export class Boy extends ex.Actor {
  constructor(pos: ex.Vector) {
    super({
      pos,
      width: 16,
      height: 16,
      collisionType: ex.CollisionType.Active,
    });
  }

  onInitialize(engine: ex.Engine): void {
    const boy = ex.SpriteSheet.fromImageSource({
      image: BoySheet,
      grid: {
        spriteHeight: 24,
        spriteWidth: 16,
        rows: 6,
        columns: 8,
      },
    });

    const leftWalk = new ex.Animation({
      frames: [
        { graphic: boy.getSprite(6, 0), duration: frameSpeed },
        { graphic: boy.getSprite(7, 0), duration: frameSpeed },
        { graphic: boy.getSprite(0, 1), duration: frameSpeed },
        { graphic: boy.getSprite(7, 0), duration: frameSpeed },
      ],
    });
    this.graphics.add("leftWalk", leftWalk);

    const rightWalk = new ex.Animation({
      frames: [
        { graphic: boy.getSprite(0, 1), duration: frameSpeed },
        { graphic: boy.getSprite(7, 0), duration: frameSpeed },
        { graphic: boy.getSprite(6, 0), duration: frameSpeed },
        { graphic: boy.getSprite(7, 0), duration: frameSpeed },
      ],
      flipHorizontal: true,
    });
    this.graphics.add("rightWalk", rightWalk);

    const upWalk = new ex.Animation({
      frames: [
        { graphic: boy.getSprite(3, 0), duration: frameSpeed },
        { graphic: boy.getSprite(4, 0), duration: frameSpeed },
        { graphic: boy.getSprite(5, 0), duration: frameSpeed },
        { graphic: boy.getSprite(4, 0), duration: frameSpeed },
      ],
    });
    this.graphics.add("upWalk", upWalk);

    const downWalk = new ex.Animation({
      frames: [
        { graphic: boy.getSprite(0, 0), duration: frameSpeed },
        { graphic: boy.getSprite(1, 0), duration: frameSpeed },
        { graphic: boy.getSprite(2, 0), duration: frameSpeed },
        { graphic: boy.getSprite(1, 0), duration: frameSpeed },
      ],
    });
    this.graphics.add("downWalk", downWalk);
  }

  onPreUpdate(engine: ex.Engine, delta: number): void {
    this.vel = ex.Vector.Zero;

    this.graphics.use("downWalk");
    if (engine.input.keyboard.isHeld(ex.Keys.ArrowRight)) {
      this.vel = ex.vec(boySpeed, 0);
      this.graphics.use("rightWalk");
    }
    if (engine.input.keyboard.isHeld(ex.Keys.ArrowLeft)) {
      this.vel = ex.vec(-boySpeed, 0);
      this.graphics.use("leftWalk");
    }
    if (engine.input.keyboard.isHeld(ex.Keys.ArrowUp)) {
      this.vel = ex.vec(0, -boySpeed);
      this.graphics.use("upWalk");
    }
    if (engine.input.keyboard.isHeld(ex.Keys.ArrowDown)) {
      this.vel = ex.vec(0, boySpeed);
      this.graphics.use("downWalk");
    }
  }
}
