/**
 * Menu class
 * 
 * Select levels here
 */
import { BaseScene } from './basescene';
import { SoundHelper } from '../helpers/soundhelper';
import __imageLeft from '../assets/images/button_left.png';
import __imageMenu from '../assets/images/button_menu_level.png';
import __musicTheme from '../assets/music/theme.mp3';
import __soundBlop from '../assets/sounds/blop.mp3';

export class Menu extends BaseScene {

  readonly COLS: integer = 4;
  readonly ROWS: integer = 3;

  constructor() {
    super({
      key: 'Menu'
    });
  }

  init(): void {
    let navstate = this.getNavigationState();
    navstate.numberOfLevels = this.COLS * this.ROWS;
    this.setNavigationState(navstate);
  }

  preload(): void {
    this.load.image('left', __imageLeft);
    this.load.image('menulvl', __imageMenu);
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

    let xmargin = dims.width * 0.2;
    let btncellwidth = (dims.width - (2 * xmargin)) / this.COLS;
    let btnspacing = btncellwidth * 0.1;
    let btnwidth = btncellwidth * 0.9;
    let ymargin = (dims.height - (this.ROWS * btnwidth) + ((this.ROWS - 1) * btnspacing)) / 2;
    for (let col = 0; col < this.COLS; col++) {
      for (let row = 0; row < this.ROWS; row++) {
        let level = col + 1 + (row * this.COLS);
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
    let btn = this.add.sprite(xpos, ypos, 'menulvl') as Phaser.GameObjects.Sprite;
    btn.setOrigin(0, 0);
    btn.setDisplaySize(width, height);
    btn.setInteractive();
    btn.on('pointerdown', function (this: Menu, pointer: string | symbol) {
      this.sound.play('blop', { loop: false });

      let navstate = this.getNavigationState();
      navstate.currentLevel = level;
      this.setNavigationState(navstate);  

      this.scene.start('LevelCanvas');
    }, this);

    let tx = this.add.text(
      xpos + (width / 2), ypos + (height / 2), text,
      { fontSize: '24px', fill: '#000' }
    );
  }
}
