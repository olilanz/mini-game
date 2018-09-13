/**
 * Game scores
 * 
 * This scene is shown after the game completes.
 */

import { BaseScene } from './basescene';
import { SoundHelper } from '../helpers/soundhelper';
import __imageMenu from '../assets/images/button_menu.png';
import __imageRetry from '../assets/images/button_retry.png';
import __imageRight from '../assets/images/button_right.png';
import __imageTrophy from '../assets/images/trophy.png';
import __imageTrophyFail from '../assets/images/trophy_fail.png';
import __musicTheme from '../assets/music/theme.mp3';
import __soundBlop from '../assets/sounds/blop.mp3';

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
    let text = [
      'Scores', 
      'The level is completed. Scores are shown here.'
    ];
    this.add.text(16, 16, text, { fontSize: '12px', fill: '#fff' });

    let dims = this.getScreenDimension();
    let margin = dims.width * 0.1;
    let btnsize = dims.width * 0.08;
    let btn = null;

    let trophy = this.add.sprite(dims.width / 2, dims.height / 2, this.success ? 'trophy' : 'trophy_fail') as Phaser.GameObjects.Sprite;
    trophy.setDisplaySize(dims.width / 2, dims.width / 3);

    btn = this.add.sprite(dims.width * 0.3, dims.height - margin, 'menu') as Phaser.GameObjects.Sprite;
    btn.setDisplaySize(btnsize, btnsize);
    btn.setInteractive();
    btn.on('pointerdown', function (this: Scores, pointer: string | symbol) {
      this.sound.play('blop', { loop: false });
      this.navigateToMenu();
    }, this);

    btn = this.add.sprite(dims.width * 0.5, dims.height - margin, 'retry') as Phaser.GameObjects.Sprite;
    btn.setDisplaySize(btnsize, btnsize);
    btn.setInteractive();
    btn.on('pointerdown', function (this: Scores, pointer: string | symbol) {
      this.sound.play('blop', { loop: false });
      this.navigateToNewLevel();
    }, this);

    let navstate = this.getNavigationState();
    if (navstate.currentLevel < navstate.numberOfLevels && this.success) {
      btn = this.add.sprite(dims.width * 0.7, dims.height - margin, 'next') as Phaser.GameObjects.Sprite;
      btn.setDisplaySize(btnsize, btnsize);
      btn.setInteractive();
      btn.on('pointerdown', function (this: Scores, pointer: string | symbol) {
        // todo: not nice to increment level here; move into navigetToNextLevel() instead..
        navstate.currentLevel++;
        this.setNavigationState(navstate);
        this.sound.play('blop', { loop: false });
        this.navigateToNextLevel();
      }, this);
    }

    let music = this.sound.add('theme');
    SoundHelper.playBackgroundMusic(music);

    this.sound.add('blop');
  }

  update(delta: number): void {
  }

  updateLayout(width: number, height: number): void {
  }

  navigateToNewLevel(): void {
    this.scene.start('Level');
  }

  navigateToNextLevel(): void {
    this.scene.start('Level');
  }

  navigateToMenu(): void {
    this.scene.start('Menu');
  }
}


