/**
 * Pause Screen
 * 
 * This page is displayed when the game is paused.
 */

import { BaseScene } from '../basescene';
import { SoundHelper } from '../../helpers/soundhelper';

import __imageMenu from '../../assets/images/button_menu.png';
import __imageRetry from '../../assets/images/button_retry.png';
import __imageResume from '../../assets/images/button_right.png';

import __musicTheme from '../../assets/music/theme.mp3';
import __soundBlop from '../../assets/sounds/blop.mp3';

export class Pause extends BaseScene {
  
  constructor() {
    super({
      key: 'Pause'
    });
  }

  init(): void {
    this.attachDefaultHandlers();
  }

  preload(): void {
    this.load.image('menu', __imageMenu);
    this.load.image('retry', __imageRetry);
    this.load.image('resume', __imageResume);
    this.load.audio('theme', __musicTheme);
    this.load.audio('blop', __soundBlop);
  }

  create(): void {
    this.addButton('menu', 'menu',
      function (this: Pause) {
        this.sound.play('blop', { loop: false });
        this.transitionToMenu();
      }, this);

    this.addButton('resume', 'resume',
      function (this: Pause) {
        this.sound.play('blop', { loop: false });
        this.transitionToLevel();
      }, this);

    this.addButton('retry', 'retry',
      function (this: Pause) {
        this.sound.play('blop', { loop: false });
        this.transitionToNewLevel();
      }, this);

    let dims = this.getScreenDimension();
    this.updateLayout(dims.width, dims.height);

    let music = this.sound.add('theme');
    SoundHelper.playBackgroundMusic(music);

    this.sound.add('blop');
  }

  updateLayout(width: number, height: number): void {
    let margin = width * 0.1;
    let btnsize = width * 0.08;

    (this.children.getByName('menu') as Phaser.GameObjects.Sprite)
      .setPosition(width - margin, margin)
      .setDisplaySize(btnsize, btnsize);

    (this.children.getByName('retry') as Phaser.GameObjects.Sprite)
      .setPosition(width - margin, 1.3 * margin + btnsize)
      .setDisplaySize(btnsize, btnsize);

    (this.children.getByName('resume') as Phaser.GameObjects.Sprite)
      .setPosition(width - margin, 1.3 * 1.3 * margin + 2 * btnsize)
      .setDisplaySize(btnsize, btnsize);  
  }

  update(time: number, delta: number): void {
  }

  onShutdown() {
    this.detachDefaultHandlers();
  }

  onResize(width: number, height: number) {
    super.onResize(width, height);
    this.updateLayout(width, height);
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


