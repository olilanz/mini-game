/**
 * Menu class
 * 
 * Select levels here
 */
import { BaseScene } from '~/scenes/basescene';

import { Assets } from '~/assets/assets';

export class Menu extends BaseScene {

  readonly COLS: integer = 4;
  readonly ROWS: integer = 3;

  constructor() {
    super({
      key: 'Menu'
    });
  }

  init(): void {
    this.attachDefaultHandlers();
  }

  create(): void {
    this.addButton('welcome', Assets.IMAGE_BTN_LEFT, 
      function (this: Menu) {
        this.transitionToWelcome();
      }, this);

    let dims = this.getScreenDimension();
    this.updateLayout(dims.width, dims.height);

    let spine = this.add.spine(200, 300, Assets.SPINE_BOY, "idle", true);
    spine.scale = 0.5;

    spine = this.add.spine(500, 700, Assets.SPINE_BOY, "run", true);
    spine.depth = 2;
    spine.drawDebug = true;
    spine.drawBones = true;
  }

  onShutdown() {
    this.detachDefaultHandlers();
  }

  onResize(gameSize: Phaser.Structs.Size, baseSize: Phaser.Structs.Size, displaySize: Phaser.Structs.Size, resolution: number) {
    super.onResize(gameSize, baseSize, displaySize, resolution);
    this.updateLayout(displaySize.width, displaySize.height);
  }

  update(delta: number): void {
  }

  updateLayout(width: number, height: number): void {
    let size = Math.min(width, height);
    let margin = size * 0.1;
    let btnsize = size * 0.08;

    (this.children.getByName('welcome') as Phaser.GameObjects.Sprite)
      .setPosition(width - margin, margin)
      .setDisplaySize(btnsize, btnsize);
  }

  transitionToWelcome(): void {
    this.scene.start('Welcome');
  }
}
