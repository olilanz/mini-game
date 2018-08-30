/**
 * Menu class
 * 
 * Select levels here
 */
import { BaseScene } from './basescene';
import { CanvasConfig } from '../scenes/canvas';
import { SoundHelper } from '../helpers/soundhelper';
import __imageLeft from '../assets/images/button_left.png';
import __imageRight from '../assets/images/button_right.png';
import __imageMenu from '../assets/images/button_menu.png';
import __musicTheme from '../assets/music/theme.mp3';
import __soundBlop from '../assets/sounds/blop.mp3';

export class Menu extends BaseScene {
  constructor() {
    super({
      key: 'Menu'
    });
  }

  preload(): void {
    this.load.image('left', __imageLeft);
    this.load.image('right', __imageRight);
    this.load.image('menu', __imageMenu);
    this.load.audio('theme', __musicTheme);
    this.load.audio('blop', __soundBlop);
  }

  create(): void {
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
      this.sound.play('blop', { loop: false });
      this.scene.start('Welcome');
    }, this);

    btn = this.add.sprite(dims.width - margin, dims.height / 2, 'right') as Phaser.GameObjects.Sprite;
    btn.setDisplaySize(btnsize, btnsize);
    btn.setInteractive();
    btn.on('pointerdown', function (this: Menu, pointer: string | symbol) {
      this.sound.play('blop', { loop: false });
      this.scene.start('Canvas');
    }, this);

    let cols = 4;
    let rows = 3;
    let xmargin = dims.width * 0.2;
    let btncellwidth = (dims.width - (2 * xmargin)) / cols;
    let btnspacing = btncellwidth * 0.1;
    let btnwidth = btncellwidth * 0.9;
    let ymargin = (dims.height - (rows * btnwidth) + ((rows - 1) * btnspacing)) / 2;
    for (let col = 0; col < cols; col++) {
      for (let row = 0; row < rows; row++) {
        let level = col + 1 + (row * cols);
        this.createMenuButton(
          level.toString(), 
          level,
          xmargin + (col * btnwidth) + (col * btnspacing), 
          ymargin + (row * btnwidth) + (row * btnspacing),
          btnwidth,
          btnwidth);
      }
    }

    let music = this.sound.add('theme');
    SoundHelper.playBackgroundMusic(music);
  }

  update(delta: number): void {
  }

  createMenuButton(text: string, level: number, xpos: number, ypos: number, width: number, height: number): void {
    let btn = this.add.sprite(xpos, ypos, 'menu') as Phaser.GameObjects.Sprite;
    btn.setOrigin(0, 0);
    btn.setDisplaySize(width, height);
    btn.setInteractive();
    btn.on('pointerdown', function (this: Menu, pointer: string | symbol) {
      this.sound.play('blop', { loop: false });
      this.scene.start('Canvas', { level: level } as CanvasConfig);
    }, this);

    let tx = this.add.text(
      xpos + (width / 2), ypos + (height / 2), text,
      { fontSize: '24px', fill: '#000' }
    );
  }
}
