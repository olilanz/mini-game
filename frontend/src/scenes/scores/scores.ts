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

    this.add.sprite(0, 0, 'menu')
      .setName('menu')
      .setInteractive()
      .on('pointerdown', function (this: Scores, pointer: string | symbol) {
        this.sound.play('blop', { loop: false });
        this.navigateToMenu();
      }, this);

    this.add.sprite(0, 0, 'retry')
      .setName('retry')
      .setInteractive()
      .on('pointerdown', function (this: Scores, pointer: string | symbol) {
        this.sound.play('blop', { loop: false });
        this.navigateToNewLevel();
      }, this);

    let navstate = this.getNavigationState();
    let btn = this.add.sprite(0, 0, 'next').setName('next') as Phaser.GameObjects.Sprite;
    if (navstate.currentLevel < navstate.numberOfLevels && this.success) {
      btn.setInteractive();
      btn.on('pointerdown', function (this: Scores, pointer: string | symbol) {
        // todo: not nice to increment level here; move into navigetToNextLevel() instead..
        navstate.currentLevel++;
        this.setNavigationState(navstate);
        this.sound.play('blop', { loop: false });
        this.navigateToNextLevel();
      }, this);
    } else {
      btn.setVisible(false);
    }

    let dims = this.getScreenDimension();
    this.updateLayout(dims.width, dims.height);

    let music = this.sound.add('theme');
    SoundHelper.playBackgroundMusic(music);

    this.sound.add('blop');
  }

  updateLayout(width: number, height: number): void {
    let margin = width * 0.1;
    let btnsize = width * 0.08;

    (this.children.getByName('trophy') as Phaser.GameObjects.Sprite)
      .setPosition(width / 2, height / 2)
      .setDisplaySize(width / 2, width / 3);

    (this.children.getByName('menu') as Phaser.GameObjects.Sprite)
      .setPosition(width * 0.3, height - margin)
      .setDisplaySize(btnsize, btnsize);

    (this.children.getByName('retry') as Phaser.GameObjects.Sprite)
      .setPosition(width * 0.5, height - margin)
      .setDisplaySize(btnsize, btnsize);

    (this.children.getByName('next') as Phaser.GameObjects.Sprite)
      .setPosition(width * 0.7, height - margin)
      .setDisplaySize(btnsize, btnsize);  
  }

  update(time: number, delta: number): void {
  }

  onResize(width: number, height: number) {
    this.updateLayout(width, height);
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


