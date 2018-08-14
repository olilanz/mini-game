/**
 * Game canvas
 * 
 * Entry page of the game.
 */

import { BaseScene } from './basescene';
import __imagePause from '../assets/images/button_pause.png';
import __imageComplete from '../assets/images/button_right.png';

export class Canvas extends BaseScene {

  private contdown: integer = 20000;
  private contdownText!: Phaser.GameObjects.Text;

  constructor() {
    super({
      key: 'Canvas'
    });
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

    this.contdownText = this.add.text(400, 300, "#", { fontSize: '72px', fill: '#fff' });

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
    this.contdown -= delta;
    this.contdownText.setText("+" + this.contdown);
  }

  configureStandardEvents(): void {
    this.input.keyboard.on('keydown', function(this: Canvas, e: KeyboardEvent) {
      if (e.key == 'Escape') {
        this.scene.start('Pause');
      } else if (e.key == 'Enter') {
        this.scene.start('Scores');
      } 
    }, this);
  }  
}


