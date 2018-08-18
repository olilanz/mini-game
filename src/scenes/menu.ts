/**
 * Menu class
 * 
 * Select levels here
 */
import { BaseScene } from './basescene';
import __imageLeft from '../assets/images/button_left.png';
import __imageRight from '../assets/images/button_right.png';

export class Menu extends BaseScene {
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

    let dims = this.getScreenDimension();
    let margin = dims.width * 0.1;
    let btnsize = dims.width * 0.08;
    let btn = null;

    btn = this.add.sprite(margin, dims.height / 2, 'left') as Phaser.GameObjects.Sprite;
    btn.setDisplaySize(btnsize, btnsize);
    btn.setInteractive();
    btn.on('pointerdown', function (this: Menu, pointer: string | symbol) {
      this.scene.start('Welcome');
    }, this);

    btn = this.add.sprite(dims.width - margin, dims.height / 2, 'right') as Phaser.GameObjects.Sprite;
    btn.setDisplaySize(btnsize, btnsize);
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
