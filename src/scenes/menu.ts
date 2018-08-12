/**
 * Menu class
 * 
 * Select levels here
 */
import __imageLeft from '../assets/images/button_left.png';
import __imageRight from '../assets/images/button_right.png';

export class Menu extends Phaser.Scene {
  constructor() {
    super({
      key: 'Menu'
    });
  }

  preload(): void {
    this.load.image('left', __imageLeft);
    this.load.image('right', __imageRight);
  }

  create(): void {
    this.configureStandardEvents();

    let text = [
      'Menu', 
      'Select a level to enter'
    ];
    this.add.text(16, 16, text, { fontSize: '12px', fill: '#fff' });

    let btn = null;

    btn = this.add.sprite(200, 300, 'left') as Phaser.GameObjects.Sprite;
    btn.setDisplaySize(50, 50);
    btn.setInteractive();
    btn.on('pointerdown', function (this: Menu, pointer: string | symbol) {
      this.scene.start('Welcome');
    }, this);

    btn = this.add.sprite(600, 300, 'right') as Phaser.GameObjects.Sprite;
    btn.setDisplaySize(50, 50);
    btn.setInteractive();
    btn.on('pointerdown', function (this: Menu, pointer: string | symbol) {
      this.scene.start('Canvas');
    }, this);
  }

  update(delta: number): void {
  }

  configureStandardEvents(): void {
    this.input.keyboard.on('keydown', function(this: Menu, e: KeyboardEvent) {
      if (e.key == 'Enter') {
        this.scene.start('Canvas');
      } else if (e.key == 'Escape') {
        this.scene.start('Welcome');
      } 
    }, this);
  }  
}
