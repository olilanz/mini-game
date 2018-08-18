/**
 * Game scores
 * 
 * This scene is shown after the game completes.
 */

import { BaseScene } from './basescene';
import __imageLeft from '../assets/images/button_left.png';
import __imageRetry from '../assets/images/button_retry.png';
import __imageRight from '../assets/images/button_right.png';
import __imageTrophy from '../assets/images/trophy.png';

export class Scores extends BaseScene {
  
  constructor() {
    super({
      key: 'Scores'
    });
  }

  preload(): void {
    this.load.image('left', __imageLeft);
    this.load.image('retry', __imageRetry);
    this.load.image('next', __imageRight);
    this.load.image('trophy', __imageTrophy);
  }

  create(): void {
    this.configureStandardEvents();

    let text = [
      'Scores', 
      'The level is completed. Scores are shown here.'
    ];
    this.add.text(16, 16, text, { fontSize: '12px', fill: '#fff' });

    let dims = this.getScreenDimension();
    let margin = dims.width * 0.1;
    let btnsize = dims.width * 0.08;
    let btn = null;

    let trophy = this.add.sprite(dims.width / 2, dims.height / 2, 'trophy') as Phaser.GameObjects.Sprite;
    trophy.setDisplaySize(dims.width / 2, dims.width / 2);

    btn = this.add.sprite(dims.width * 0.3, dims.height - margin, 'left') as Phaser.GameObjects.Sprite;
    btn.setDisplaySize(btnsize, btnsize);
    btn.setInteractive();
    btn.on('pointerdown', function (this: Scores, pointer: string | symbol) {
      this.scene.start('Menu');
    }, this);

    btn = this.add.sprite(dims.width * 0.5, dims.height - margin, 'retry') as Phaser.GameObjects.Sprite;
    btn.setDisplaySize(btnsize, btnsize);
    btn.setInteractive();
    btn.on('pointerdown', function (this: Scores, pointer: string | symbol) {
      this.scene.start('Canvas');
    }, this);

    btn = this.add.sprite(dims.width * 0.7, dims.height - margin, 'next') as Phaser.GameObjects.Sprite;
    btn.setDisplaySize(btnsize, btnsize);
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


