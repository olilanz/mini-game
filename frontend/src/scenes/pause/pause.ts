/**
 * Pause Screen
 * 
 * This page is displayed when the game is paused.
 */

import { BaseScene } from '../basescene';
import { SoundHelper } from '../../helpers/soundhelper';

import { Assets } from '../../assets/assets';

export class Pause extends BaseScene {
  
  constructor() {
    super({
      key: 'Pause'
    });
  }

  init(): void {
    this.attachDefaultHandlers();
  }

  create(): void {
    this.addButton('menu', Assets.IMAGE_BTN_MENU,
      function (this: Pause) {
        this.sound.play(Assets.SOUND_BLOP, { loop: false });
        this.transitionToMenu();
      }, this);

    this.addButton('resume', Assets.IMAGE_BTN_RIGHT,
      function (this: Pause) {
        this.sound.play(Assets.SOUND_BLOP, { loop: false });
        this.transitionToLevel();
      }, this);

    this.addButton('retry', Assets.IMAGE_BTN_RETRY,
      function (this: Pause) {
        this.sound.play('blop', { loop: false });
        this.transitionToNewLevel();
      }, this);

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

    (this.children.getByName('resume') as Phaser.GameObjects.Sprite)
      .setPosition(width - margin, margin)
      .setDisplaySize(btnsize, btnsize);

    (this.children.getByName('retry') as Phaser.GameObjects.Sprite)
      .setPosition(width - margin, 1.3 * margin + btnsize)
      .setDisplaySize(btnsize, btnsize);

    (this.children.getByName('menu') as Phaser.GameObjects.Sprite)
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

  transitionToMenu(): void {
    this.scene.stop('Harness');  // shuts the canvas down
    this.scene.start('Menu');
  }

  transitionToLevel(): void {
    this.scene.wake('Harness');  // wake up existing harness
    this.scene.stop('Pause');    // close this scene; resumed harness will take over
  }

  transitionToNewLevel(): void {
    this.scene.stop('Harness');  // stop existing harness
    this.scene.start('Harness'); // close this scene; harness will reboot and take over
  }
}


