/**
 * Welcome screen
 * 
 * Entry page of the game.
 */

import { BaseScene } from './basescene';
import __imageTitle from '../assets/images/title.png';

export class Welcome extends BaseScene {
  
  constructor() {
    super({
      key: 'Welcome'
    });
  }

  preload(): void {
    this.load.image('title', __imageTitle);
  }

  create(): void {
    this.configureStandardEvents();

    let text = [
      'Welcome to Mini Game', 
      'Oliver and Noah\'s playground'
    ];

    let dims = this.getScreenDimension();

    this.add.text(16, 16, text, { fontSize: '12px', fill: '#fff' });

    let title = this.add.sprite(dims.width / 2, dims.height / 2, 'title') as Phaser.GameObjects.Sprite;
    title.setDisplaySize(640, 480);
    title.setInteractive();
    title.on('pointerdown', function (this: Welcome, pointer: string | symbol) {
      this.scene.start('Menu');
    }, this);
  }

  update(time: number, delta: number): void {
  }

  configureStandardEvents(): void {
    this.input.keyboard.on('keydown', function(this: Welcome, e: KeyboardEvent) {
      if (e.key == 'Enter') {
        this.scene.start('Menu');
      } 
    }, this);
  }  
}


