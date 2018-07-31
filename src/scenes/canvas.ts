/**
 * Game canvas
 * 
 * Entry page of the game.
 */

import imagePause from '../assets/images/button_pause.png';
import imageComplete from '../assets/images/button_right.png';

export class Canvas extends Phaser.Scene {
  
  constructor() {
    super({
      key: 'Canvas'
    });
  }

  preload(): void {
    this.load.image('pause', imagePause);
    this.load.image('complete', imageComplete);
  }

  create(): void {
    this.configureStandardEvents();

    this.add.text(16, 16, 'Canvas', { fontSize: '12px', fill: '#fff' });

    let btn = null;

    btn = this.add.sprite(200, 300, 'pause') as Phaser.GameObjects.Sprite;
    btn.setInteractive();
    btn.on('pointerdown', function (this: Canvas, pointer: string | symbol) {
      this.scene.start('Pause');
    }, this);

    btn = this.add.sprite(600, 300, 'complete') as Phaser.GameObjects.Sprite;
    btn.setInteractive();
    btn.on('pointerdown', function (this: Canvas, pointer: string | symbol) {
      this.scene.start('Scores');
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


