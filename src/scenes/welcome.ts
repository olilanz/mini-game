/**
 * Welcome screen
 * 
 * Entry page of the game.
 */

import imageTitle from '../assets/images/title.png';

export class Welcome extends Phaser.Scene {
  
  constructor() {
    super({
      key: 'Welcome'
    });
  }

  preload(): void {
    this.load.image('title', imageTitle);
  }

  create(): void {
    this.configureStandardEvents();

    let text = [
      'Welcome to Mini Game', 
      'Oliver and Noah\'s playground'
    ];
    this.add.text(16, 16, text, { fontSize: '12px', fill: '#fff' });

    let title = this.add.sprite(400, 300, 'title') as Phaser.GameObjects.Sprite;
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


