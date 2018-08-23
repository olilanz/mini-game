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

    let cols = 4;
    let rows = 3;
    let xmargin = dims.width * 0.2;
    let btncellwidth = (dims.width - (2 * xmargin)) / cols;
    let btnspacing = btncellwidth * 0.1;
    let btnwidth = btncellwidth * 0.9;
    let ymargin = (dims.height - (rows * btnwidth) + ((rows - 1) * btnspacing)) / 2;
    for (let x = 0; x < cols; x++) {
      for (let y = 0; y < rows; y++) {
        this.createMenuButton(
          ((x + 1) * (y + 1)).toString(), 
          xmargin + (x * btnwidth) + (x * btnspacing), 
          ymargin + (y * btnwidth) + (y * btnspacing),
          btnwidth,
          btnwidth);
      }
    }
  }

  update(delta: number): void {
  }

  createMenuButton(text: string, xpos: number, ypos: number, width: number, height: number): void {
      this.add.text(
        xpos, ypos, text,
        { fontSize: '12px', fill: '#fff' }
      );
      let graphics = this.add.graphics();
      graphics.lineStyle(2, 0xFFFFFF, 1);
      graphics.strokeRect(xpos, ypos, width, height);

      graphics.setInteractive();
      graphics.on('pointerdown', function (this: Menu, pointer: string | symbol) {
        this.scene.start('Canvas');
      }, this);
  }

  configureStandardEvents(): void {
    this.input.keyboard.on('keydown', function(this: Menu, e: KeyboardEvent) {
      if (e.key == 'Enter' || e.key == 'ArrowRight') {
        this.scene.start('Canvas');
      } else if (e.key == 'Escape' || e.key == 'ArrowLeft') {
        this.scene.start('Welcome');
      } 
    }, this);
  }  
}
