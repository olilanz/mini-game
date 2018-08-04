/**
 * Game scores
 * 
 * This scene is shown after the game completes.
 */

import imageLeft from '../assets/images/button_left.png';
import imageRetry from '../assets/images/button_retry.png';
import imageRight from '../assets/images/button_right.png';
import imageTrophy from '../assets/images/trophy.png';

export class Scores extends Phaser.Scene {
  
  constructor() {
    super({
      key: 'Scores'
    });
  }

  preload(): void {
    this.load.image('left', imageLeft);
    this.load.image('retry', imageRetry);
    this.load.image('next', imageRight);
    this.load.image('trophy', imageTrophy);
  }

  create(): void {
    this.configureStandardEvents();

    let text = [
      'Scores', 
      'The level is completed. Scores are shown here.'
    ];
    this.add.text(16, 16, text, { fontSize: '12px', fill: '#fff' });

    this.add.sprite(400, 300, 'trophy') as Phaser.GameObjects.Sprite;

    let btn = null;

    btn = this.add.sprite(200, 400, 'left') as Phaser.GameObjects.Sprite;
    btn.setDisplaySize(50, 50);
    btn.setInteractive();
    btn.on('pointerdown', function (this: Scores, pointer: string | symbol) {
      this.scene.start('Menu');
    }, this);

    btn = this.add.sprite(400, 400, 'retry') as Phaser.GameObjects.Sprite;
    btn.setDisplaySize(50, 50);
    btn.setInteractive();
    btn.on('pointerdown', function (this: Scores, pointer: string | symbol) {
      this.scene.start('Canvas');
    }, this);

    btn = this.add.sprite(600, 400, 'next') as Phaser.GameObjects.Sprite;
    btn.setDisplaySize(50, 50);
    btn.setInteractive();
    btn.on('pointerdown', function (this: Scores, pointer: string | symbol) {
      this.scene.start('Canvas');
    }, this);
  }

  update(delta: number): void {
  }

  configureStandardEvents(): void {
    this.input.keyboard.on('keydown', function(this: Scores, e: KeyboardEvent) {
      if (e.key == 'Enter') {
        this.scene.start('Canvas'); // next
      } else if (e.key == 'r') {
        this.scene.start('Canvas'); // retry
      } else if (e.key == 'Escape') {
        this.scene.start('Menu');
      } 
    }, this);
  }  
}


