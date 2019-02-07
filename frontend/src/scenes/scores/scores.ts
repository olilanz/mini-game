/**
 * Game scores
 * 
 * This scene is shown after the game completes.
 */

import { BaseScene } from '../basescene';
import { SoundHelper } from '../../helpers/soundhelper';

import __imageMenu from '../../assets/images/button_menu.png';
import __imageRetry from '../../assets/images/button_retry.png';
import __imageRight from '../../assets/images/button_right.png';
import __imageTrophy from '../../assets/images/trophy.png';
import __imageTrophyFail from '../../assets/images/trophy_fail.png';

import __musicTheme from '../../assets/music/theme.mp3';
import __soundBlop from '../../assets/sounds/blop.mp3';

export class Scores extends BaseScene {
  
  private success: boolean = true;

  constructor() {
    super({
      key: 'Scores'
    });
  }

  init(config: { success: boolean }) {
    this.success = config.success;
    this.attachDefaultHandlers();
  }

  preload(): void {
    this.load.image('menu', __imageMenu);
    this.load.image('retry', __imageRetry);
    this.load.image('next', __imageRight);
    this.load.image('trophy', __imageTrophy);
    this.load.image('trophy_fail', __imageTrophyFail);
    this.load.audio('theme', __musicTheme);
    this.load.audio('blop', __soundBlop);
  }

  create(): void {
    this.add.sprite(0, 0, this.success ? 'trophy' : 'trophy_fail')
      .setName('trophy');

    this.addButton('menu', 'menu', 
      function (this: Scores) {
        this.sound.play('blop', { loop: false });
        this.navigateToMenu();
      }, this);

    this.addButton('retry', 'retry',
      function (this: Scores) {
        this.sound.play('blop', { loop: false });
        this.navigateToNewLevel();
      }, this);

    let navstate = this.getNavigationState();
    let btn = this.addButton('next', 'next',
      function (this: Scores) {
        // todo: not nice to increment level here; move into navigetToNextLevel() instead..
        navstate.currentLevel++;
        this.setNavigationState(navstate);
        this.sound.play('blop', { loop: false });
        this.navigateToNextLevel();
      }, this);
    let showBtn = (navstate.currentLevel < navstate.numberOfLevels && this.success);
    btn.setVisible(showBtn);

    let dims = this.getScreenDimension();
    this.updateLayout(dims.width, dims.height);

    let music = this.sound.add('theme');
    SoundHelper.playBackgroundMusic(music);

    this.sound.add('blop');
  }

  updateLayout(width: number, height: number): void {
    let size = Math.min(width, height);
    let margin = size * 0.1;
    let btnsize = size * 0.08;

    (this.children.getByName('trophy') as Phaser.GameObjects.Sprite)
      .setPosition(width / 2, height / 2)
      .setDisplaySize(size / 2, size / 3);

    (this.children.getByName('menu') as Phaser.GameObjects.Sprite)
      .setPosition(width - margin, margin)
      .setDisplaySize(btnsize, btnsize);

    (this.children.getByName('retry') as Phaser.GameObjects.Sprite)
      .setPosition(width - margin, 1.3 * margin + btnsize)
      .setDisplaySize(btnsize, btnsize);

    (this.children.getByName('next') as Phaser.GameObjects.Sprite)
      .setPosition(width - margin, 1.3 * 1.3 * margin + 2 * btnsize)
      .setDisplaySize(btnsize, btnsize);  
  }

  update(time: number, delta: number): void {
  }

  onShutdown() {
    this.detachDefaultHandlers();
  }

  onResize(gameSize: Phaser.Structs.Size, baseSize: Phaser.Structs.Size, displaySize: Phaser.Structs.Size, resolution: number) {
    super.onResize(gameSize, baseSize, displaySize, resolution);
    this.updateLayout(displaySize.width, displaySize.height);
  }

  navigateToNewLevel(): void {
    this.scene.start('Harness');
  }

  navigateToNextLevel(): void {
    this.scene.start('Harness');
  }

  navigateToMenu(): void {
    this.scene.start('Menu');
  }
}


