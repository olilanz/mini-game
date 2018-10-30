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
    this.add.sprite(0, 0, 'menu')
      .setName('menu')
      .setInteractive()
      .on('pointerdown', function (this: Pause, pointer: string | symbol) {
        this.sound.play('blop', { loop: false });
        this.transitionToMenu();
      }, this);

    this.add.sprite(0, 0, 'resume')
      .setName('resume')
      .setInteractive()
      .on('pointerdown', function (this: Pause, pointer: string | symbol) {
        this.sound.play('blop', { loop: false });
        this.transitionToLevel();
      }, this);

    this.add.sprite(0, 0, 'retry')
      .setName('retry')
      .setInteractive()
      .on('pointerdown', function (this: Pause, pointer: string | symbol) {
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
    let btnsize = width * 0.08;

    (this.children.getByName('menu') as Phaser.GameObjects.Sprite)
      .setPosition(width * 0.3, height / 2)
      .setDisplaySize(btnsize, btnsize);

    (this.children.getByName('retry') as Phaser.GameObjects.Sprite)
      .setPosition(width * 0.5, height / 2)
      .setDisplaySize(btnsize, btnsize);

    (this.children.getByName('resume') as Phaser.GameObjects.Sprite)
      .setPosition(width * 0.7, height / 2)
      .setDisplaySize(btnsize, btnsize);  
  }

  update(time: number, delta: number): void {
  }

  onResize(width: number, height: number) {
    this.updateLayout(width, height);
  }

  transitionToMenu(): void {
    this.scene.stop('Harness'); // shuts the canvas down
    this.scene.start('Menu');
  }

  transitionToLevel(): void {
    this.scene.wake('Harness');
    this.scene.stop('Pause');  
  }

  transitionToNewLevel(): void {
    this.scene.stop('Harness');
    this.scene.start('Harness');
  }
}


