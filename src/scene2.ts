import { Assets } from '~/assets/assets';

export class Scene2 extends Phaser.Scene {

  constructor() {
    super({
      key: 'Scene2'
    });
  }

  create(): void {
    this.add.sprite(0, 0, Assets.IMAGE_BTN_LEFT)
      .setName(name)
      .setInteractive()
      .setPosition(50, 50)
      .setDisplaySize(50, 50)
      .on('pointerdown', function (this: Scene2) { this.scene.start('Scene1'); }, this);

    let spine = this.add.spine(200, 300, Assets.SPINE_BOY, "idle", true);
    spine.scale = 0.5;

    spine = this.add.spine(500, 700, Assets.SPINE_BOY, "run", true);
    spine.depth = 2;
    spine.drawDebug = true;
    spine.drawBones = true;
  }
}
