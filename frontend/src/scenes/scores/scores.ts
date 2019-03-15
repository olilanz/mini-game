/**
 * Game scores
 * 
 * This scene is shown after the game completes.
 */

import { BaseScene } from '../basescene';
import { SoundHelper } from '../../helpers/soundhelper';

import { Assets } from '../../assets/assets';

export class Scores extends BaseScene {
  
  private success: boolean = true;

  constructor() {
    super({
      key: 'Scores'
    });
  }

  init(config: { success: boolean }) {
    this.success = config.success;
    this.attachDefaultHandlers();
  }

  create(): void {
    this.add.sprite(0, 0, this.success ? Assets.IMAGE_TROPHY : Assets.IMAGE_TROPHY_FAIL)
      .setName('trophy');

    this.addButton('menu', Assets.IMAGE_BTN_MENU, 
      function (this: Scores) {
        this.sound.play('blop', { loop: false });
        this.navigateToMenu();
      }, this);

    this.addButton('retry', Assets.IMAGE_BTN_RETRY,
      function (this: Scores) {
        this.sound.play(Assets.SOUND_BLOP, { loop: false });
        this.navigateToNewLevel();
      }, this);

    let navstate = this.getNavigationState();
    let btn = this.addButton('next', Assets.IMAGE_BTN_RIGHT,
      function (this: Scores) {
        // todo: not nice to increment level here; move into navigetToNextLevel() instead..
        navstate.currentLevel++;
        this.setNavigationState(navstate);
        this.sound.play(Assets.SOUND_BLOP, { loop: false });
        this.navigateToNextLevel();
      }, this);
    let showBtn = (navstate.currentLevel < navstate.numberOfLevels && this.success);
    btn.setVisible(showBtn);

    let dims = this.getScreenDimension();
    this.updateLayout(dims.width, dims.height);

    let music = this.sound.add(Assets.MUSIC_THEME);
    SoundHelper.playBackgroundMusic(music);

    this.sound.add(Assets.SOUND_BLOP);
  }

  updateLayout(width: number, height: number): void {
    let size = Math.min(width, height);
    let margin = size * 0.1;
    let btnsize = size * 0.08;

    (this.children.getByName('trophy') as Phaser.GameObjects.Sprite)
      .setPosition(width / 2, height / 2)
      .setDisplaySize(size / 2, size / 3);

    (this.children.getByName('menu') as Phaser.GameObjects.Sprite)
      .setPosition(width - margin, margin)
      .setDisplaySize(btnsize, btnsize);

    (this.children.getByName('retry') as Phaser.GameObjects.Sprite)
      .setPosition(width - margin, 1.3 * margin + btnsize)
      .setDisplaySize(btnsize, btnsize);

    (this.children.getByName('next') as Phaser.GameObjects.Sprite)
      .setPosition(width - margin, 1.3 * 1.3 * margin + 2 * btnsize)
      .setDisplaySize(btnsize, btnsize);  
  }

  update(time: number, delta: number): void {
  }

  onShutdown() {
    this.detachDefaultHandlers();
  }

  onResize(gameSize: Phaser.Structs.Size, baseSize: Phaser.Structs.Size, displaySize: Phaser.Structs.Size, resolution: number) {
    super.onResize(gameSize, baseSize, displaySize, resolution);
    this.updateLayout(displaySize.width, displaySize.height);
  }

  navigateToNewLevel(): void {
    this.scene.start('Harness');
  }

  navigateToNextLevel(): void {
    this.scene.start('Harness');
  }

  navigateToMenu(): void {
    this.scene.start('Menu');
  }
}


