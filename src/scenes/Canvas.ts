/**
 * Game canvas
 * 
 * Entry page of the game.
 */

import imageLeft from '../assets/images/button_left.png';
import imageRight from '../assets/images/button_retry.png';

export class Canvas extends Phaser.Scene {
  
  constructor() {
    super({
      key: 'Canvas'
    });
  }

  preload(): void {
    this.load.image('left', imageLeft);
    this.load.image('retry', imageRight);
  }

  create(): void {
    this.configureStandardEvents();

    this.add.text(16, 16, 'Canvas', { fontSize: '12px', fill: '#fff' });

    let btn = null;

    btn = this.add.sprite(200, 300, 'left') as Phaser.GameObjects.Sprite;
    btn.setInteractive();
    btn.on('pointerdown', function (this: Canvas, pointer: string | symbol) {
      this.scene.start('Menu');
    }, this);

    btn = this.add.sprite(600, 300, 'retry') as Phaser.GameObjects.Sprite;
    btn.setInteractive();
    btn.on('pointerdown', function (this: Canvas, pointer: string | symbol) {
      this.scene.start('Canvas');
    }, this);
  }

  update(delta: number): void {
  }

  configureStandardEvents(): void {
    this.input.keyboard.on('keydown', function(this: Canvas, e: KeyboardEvent) {
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


