/**
 * Menu class
 * 
 * Select levels here
 */
import { BaseScene } from '../basescene';
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
    this.attachDefaultHandlers();

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
    this.add.text(0, 0, text, { fontSize: '12px', fill: '#fff' }).setName('titleText');

    this.add.sprite(0, 0, 'left')
      .setName('menu').setInteractive()
      .on('pointerdown', function (this: Menu, pointer: string | symbol) {
        this.sound.play('blop', { loop: false });
        this.transitionToWelcome();
      }, this);

    for (let col = 0; col < this.COLS; col++) {
      for (let row = 0; row < this.ROWS; row++) {
        let level: integer = col + 1 + (row * this.COLS);
        this.createMenuButton(level.toString(), level);
      }
    }

    let dims = this.getScreenDimension();
    this.updateLayout(dims.width, dims.height);

    let music = this.sound.add('theme');
    SoundHelper.playBackgroundMusic(music);
  }

  onResize(width: number, height: number) {
    this.updateLayout(width, height);
  }

  update(delta: number): void {
  }

  updateLayout(width: number, height: number): void {
    let margin = width * 0.1;
    let btnsize = width * 0.08;

    (this.children.getByName('titleText') as Phaser.GameObjects.Text)
      .setPosition(16, 16);

    (this.children.getByName('menu') as Phaser.GameObjects.Sprite)
      .setPosition(margin, height / 2)
      .setDisplaySize(btnsize, btnsize);

    let xmargin = width * 0.2;
    let btncellwidth = (width - (2 * xmargin)) / this.COLS;
    let btnspacing = btncellwidth * 0.1;
    let btnwidth = btncellwidth * 0.9;
    let ymargin = (height - (this.ROWS * btnwidth) + ((this.ROWS - 1) * btnspacing)) / 2;

    for (let col = 0; col < this.COLS; col++) {
      for (let row = 0; row < this.ROWS; row++) {
        let level: integer = col + 1 + (row * this.COLS);
        let xpos = xmargin + (col * btnwidth) + (col * btnspacing);
        let ypos = ymargin + (row * btnwidth) + (row * btnspacing);
        (this.children.getByName('btn_' + level) as Phaser.GameObjects.Sprite)
          .setPosition(xpos, ypos)
          .setDisplaySize(btnwidth, btnwidth);
        (this.children.getByName('txt_' + level) as Phaser.GameObjects.Text)
          .setPosition(xpos + (btnwidth / 2), ypos + (btnwidth / 2));    
      }
    }
  }

  createMenuButton(text: string, level: integer): void {
    this.add.sprite(0, 0, 'menulvl')
      .setName('btn_' + text)
      .setOrigin(0, 0)
      .setInteractive()
      .on('pointerdown', function (this: Menu, pointer: string | symbol) {
        this.sound.play('blop', { loop: false });
        this.transitionToLevel(level);
      }, this);

    this.add.text(0, 0, text, { fontSize: '24px', fill: '#000' })
      .setName('txt_' + text);
  }

  transitionToWelcome(): void {
    this.scene.start('Welcome');
  }

  transitionToLevel(level: integer): void {
    let navstate = this.getNavigationState();
    navstate.currentLevel = level;
    this.setNavigationState(navstate);  
    this.scene.start('Level');
  }
}
