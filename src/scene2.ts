/**
 * Menu class
 * 
 * Select levels here
 */
import { BaseScene } from 'basescene';
import { Assets } from '~/assets/assets';

export class Scene2 extends BaseScene {

  constructor() {
    super({
      key: 'Scene2'
    });
  }

  create(): void {
    this.addButton('Scene1', Assets.IMAGE_BTN_LEFT, 
      function (this: Scene2) {
        this.scene.start('Scene1');
      }, this)
      .setPosition(100, 100)
      .setDisplaySize(50, 50);

    let spine = this.add.spine(200, 300, Assets.SPINE_BOY, "idle", true);
    spine.scale = 0.5;

    spine = this.add.spine(500, 700, Assets.SPINE_BOY, "run", true);
    spine.depth = 2;
    spine.drawDebug = true;
    spine.drawBones = true;
  }
}
