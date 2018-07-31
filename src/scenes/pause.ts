/**
 * Pause Screen
 * 
 * This page is displayed when the game is paused.
 */

import imageQuit from '../assets/images/button_left.png';
import imageRetry from '../assets/images/button_retry.png';
import imageResume from '../assets/images/button_right.png';

export class Pause extends Phaser.Scene {
  
  constructor() {
    super({
      key: 'Pause'
    });
  }

  preload(): void {
    this.load.image('quit', imageQuit);
    this.load.image('retry', imageRetry);
    this.load.image('resume', imageResume);
  }

  create(): void {
    this.configureStandardEvents();

    this.add.text(16, 16, 'Pause', { fontSize: '12px', fill: '#fff' });

    let btn = null;

    btn = this.add.sprite(200, 150, 'quit') as Phaser.GameObjects.Sprite;
    btn.setInteractive();
    btn.on('pointerdown', function (this: Pause, pointer: string | symbol) {
      this.scene.start('Menu');
    }, this);

    btn = this.add.sprite(400, 150, 'retry') as Phaser.GameObjects.Sprite;
    btn.setInteractive();
    btn.on('pointerdown', function (this: Pause, pointer: string | symbol) {
      this.scene.start('Canvas');
    }, this);

    btn = this.add.sprite(600, 150, 'resume') as Phaser.GameObjects.Sprite;
    btn.setInteractive();
    btn.on('pointerdown', function (this: Pause, pointer: string | symbol) {
      this.scene.start('Canvas');
    }, this);
  }

  update(delta: number): void {
  }

  configureStandardEvents(): void {
    this.input.keyboard.on('keydown', function(this: Pause, e: KeyboardEvent) {
      if (e.key == '1') {
        this.scene.start('Welcome');
      } else if (e.key == '2') {
        this.scene.start('Menu');
      } else if (e.key == '3') {
        this.scene.start('Canvas');
      } 
    }, this);
  }  
}


