/**
 * Welcome screen
 * 
 * Entry page of the game.
 */

import { BaseScene } from './basescene';
import { SoundHelper } from '../helpers/soundhelper';
import __imageTitle from '../assets/images/title.png';
import __musicTheme from '../assets/music/theme.mp3';
import __soundBlop from '../assets/sounds/blop.mp3';

export class Welcome extends BaseScene {
  
  constructor() {
    super({
      key: 'Welcome'
    });
  }

  preload(): void {
    this.load.image('title', __imageTitle);
    this.load.audio('theme', __musicTheme);
    this.load.audio('blop', __soundBlop);
  }

  create(): void {
    let text = [
      'Welcome to Mini Game', 
      'Oliver and Noah\'s playground!'
    ];

    let dims = this.getScreenDimension();

    this.add.text(16, 16, text, { fontSize: '12px', fill: '#fff' });

    let title = this.add.sprite(dims.width / 2, dims.height / 2, 'title') as Phaser.GameObjects.Sprite;
    title.setDisplaySize(dims.width * 0.6, dims.width * 0.75 * 0.6);
    title.setInteractive();
    title.on('pointerdown', function (this: Welcome, pointer: string | symbol) {
      this.sound.play('blop', { loop: false });
      this.scene.start('Menu');
    }, this);

    let music = this.sound.add('theme');
    SoundHelper.playBackgroundMusic(music);

    this.sound.add('blop');
  }

  update(time: number, delta: number): void {
  }
}