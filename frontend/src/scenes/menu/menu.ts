/**
 * Menu class
 * 
 * Select levels here
 */
import { BaseScene } from '~/scenes/basescene';
import { SoundHelper } from '~/helpers/soundhelper';

import { Assets } from '~/assets/assets';

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

  create(): void {
    this.addButton('welcome', Assets.IMAGE_BTN_LEFT, 
      function (this: Menu) {
        this.sound.play(Assets.SOUND_BLOP, { loop: false });
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

    let music = this.sound.add(Assets.MUSIC_THEME);
    SoundHelper.playBackgroundMusic(music);
  }

  onShutdown() {
    this.detachDefaultHandlers();
  }

  onResize(gameSize: Phaser.Structs.Size, baseSize: Phaser.Structs.Size, displaySize: Phaser.Structs.Size, resolution: number) {
    super.onResize(gameSize, baseSize, displaySize, resolution);
    this.updateLayout(displaySize.width, displaySize.height);
  }

  update(delta: number): void {
  }

  updateLayout(width: number, height: number): void {
    let size = Math.min(width, height);
    let margin = size * 0.1;
    let btnsize = size * 0.08;

    (this.children.getByName('welcome') as Phaser.GameObjects.Sprite)
      .setPosition(width - margin, margin)
      .setDisplaySize(btnsize, btnsize);

    // swap dimensions, if portrait orientation
    let cols = width > height ? this.COLS : this.ROWS;
    let rows = width > height ? this.ROWS : this.COLS;

    let xmargin = width * 0.2;
    let btncellwidth = (size - (2 * size * 0.2)) / cols;
    let btnspacing = btncellwidth * 0.1;
    let btnwidth = btncellwidth * 0.9;
    let ymargin = (height - (rows * btnwidth) + ((rows - 1) * btnspacing)) / 2;

    for (let col = 0; col < cols; col++) {
      for (let row = 0; row < rows; row++) {
        let level: integer = col + 1 + (row * cols);
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
    let btn = this.addButton('btn_' + text, Assets.IMAGE_BTN_MENU_LEVEL, 
      function (this: Menu) {
        this.sound.play(Assets.SOUND_BLOP, { loop: false });
        this.transitionToLevel(level);
      }, this);
    btn.setOrigin(0, 0);

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
    this.scene.start('Harness');
  }
}
