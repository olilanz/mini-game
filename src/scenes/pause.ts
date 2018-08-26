/**
 * Pause Screen
 * 
 * This page is displayed when the game is paused.
 */

import { BaseScene } from './basescene';
import __imageQuit from '../assets/images/button_left.png';
import __imageRetry from '../assets/images/button_retry.png';
import __imageResume from '../assets/images/button_right.png';
import __imagePause from '../assets/images/pause.png';
import __musicTheme from '../assets/music/theme.mp3';
import __soundBlop from '../assets/sounds/blop.mp3';

export class Pause extends BaseScene {
  
  constructor() {
    super({
      key: 'Pause'
    });
  }

  preload(): void {
    this.load.image('quit', __imageQuit);
    this.load.image('retry', __imageRetry);
    this.load.image('resume', __imageResume);
    this.load.image('pausestub', __imagePause);
    this.load.audio('theme', [__musicTheme]);
    this.load.audio('blop', __soundBlop);
  }

  create(): void {
    this.configureStandardEvents();

    let text = [
      'Pause', 
      'The game is paused'
    ];
    this.add.text(16, 16, text, { fontSize: '12px', fill: '#fff' });

    let dims = this.getScreenDimension();
    let margin = dims.width * 0.1;
    let btnsize = dims.width * 0.08;
    let btn = null;

    let pause = this.add.sprite(dims.width / 2, dims.height / 2, 'pausestub') as Phaser.GameObjects.Sprite;
    pause.setDisplaySize(dims.width / 2, dims.width * 0.75 / 2);

    btn = this.add.sprite(dims.width * 0.3, dims.height - margin, 'quit') as Phaser.GameObjects.Sprite;
    btn.setDisplaySize(btnsize, btnsize);
    btn.setInteractive();
    btn.on('pointerdown', function (this: Pause, pointer: string | symbol) {
      this.sound.play('blop', { loop: false });
      this.scene.start('Menu');
    }, this);

    btn = this.add.sprite(dims.width * 0.5, dims.height - margin, 'retry') as Phaser.GameObjects.Sprite;
    btn.setDisplaySize(btnsize, btnsize);
    btn.setInteractive();
    btn.on('pointerdown', function (this: Pause, pointer: string | symbol) {
      this.sound.play('blop', { loop: false });
      this.scene.start('Canvas');
    }, this);

    btn = this.add.sprite(dims.width * 0.7, dims.height - margin, 'resume') as Phaser.GameObjects.Sprite;
    btn.setDisplaySize(btnsize, btnsize);
    btn.setInteractive();
    btn.on('pointerdown', function (this: Pause, pointer: string | symbol) {
      this.sound.play('blop', { loop: false });
      this.scene.start('Canvas');
    }, this);

    // this.sound.stopAll();
    this.sound.add('theme');
    this.sound.play('theme', {});

    this.sound.add('blop');
  }

  update(delta: number): void {
  }

  configureStandardEvents(): void {
    this.input.keyboard.on('keydown', function(this: Pause, e: KeyboardEvent) {
      if (e.key == 'Enter' || e.key == 'ArrowRight') {
        this.sound.play('blop', { loop: false });
        this.scene.start('Canvas'); // next
      } else if (e.key == 'r' || e.key == 'ArrowDown') {
        this.sound.play('blop', { loop: false });
        this.scene.start('Canvas'); // retry
      } else if (e.key == 'Escape' || e.key == 'ArrowLeft') {
        this.sound.play('blop', { loop: false });
        this.scene.start('Menu');
      } 
    }, this);
  }  
}


