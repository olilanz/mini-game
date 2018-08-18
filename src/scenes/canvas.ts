/**
 * Game canvas
 * 
 * Entry page of the game.
 */

import { BaseScene } from './basescene';
import __imagePause from '../assets/images/button_pause.png';
import __imageComplete from '../assets/images/button_right.png';

export class Canvas extends BaseScene {

  readonly DURATION: integer = 5000;
  private countdown: integer = 0;
  private countdownText!: Phaser.GameObjects.Text;

  constructor() {
    super({
      key: 'Canvas'
    });

    this.countdown = this.DURATION;
  }

  preload(): void {
    this.load.image('pause', __imagePause);
    this.load.image('complete', __imageComplete);
  }

  create(): void {
    this.configureStandardEvents();

    let text = [
      'Canvas', 
      'Here is the game-play'
    ];
    this.add.text(16, 16, text, { fontSize: '12px', fill: '#fff' });

    this.countdownText = this.add.text(400, 300, "#", { fontSize: '72px', fill: '#fff' });

    let btn = null;

    btn = this.add.sprite(700, 100, 'pause') as Phaser.GameObjects.Sprite;
    btn.setDisplaySize(50, 50);
    btn.setInteractive();
    btn.on('pointerdown', function (this: Canvas, pointer: string | symbol) {
      this.scene.start('Pause');
    }, this);

    btn = this.add.sprite(700, 150, 'complete') as Phaser.GameObjects.Sprite;
    btn.setDisplaySize(50, 50);
    btn.setInteractive();
    btn.on('pointerdown', function (this: Canvas, pointer: string | symbol) {
      this.scene.start('Scores');
    }, this);
  }

  update(time: number, delta: number): void {
    this.countdown -= delta;
    this.countdownText.setText("+" + this.countdown);
    if (this.countdown < 0) {
      this.countdown = this.DURATION;
      this.scene.start('Scores');
    }
  }

  configureStandardEvents(): void {
    this.input.keyboard.on('keydown', function(this: Canvas, e: KeyboardEvent) {
      if (e.key == 'Escape' || e.key == 'ArrowLeft' || e.key == 'ArrowUp') {
        this.scene.start('Pause');
      } else if (e.key == 'Enter' || e.key == 'ArrowRight') {
        this.scene.start('Scores');
      } 
    }, this);
  }  
}


