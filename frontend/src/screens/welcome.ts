/**
 * Welcome screen
 * 
 * Entry page of the game.
 */

import { BaseScene } from '../basescene';
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

  init(): void {
    this.attachDefaultHandlers();
  }

  preload(): void {
    this.load.image('title', __imageTitle);
    this.load.audio('theme', __musicTheme);
    this.load.audio('blop', __soundBlop);
  }

  create(): void {
    this.add.text(0, 0, "..", { fontSize: '12px', fill: '#fff' }).
      setName('titleText');

    this.add.sprite(0, 0, 'title')
      .setName('title')
      .setInteractive()
      .on('pointerdown', function (this: Welcome, pointer: string | symbol) {
        this.sound.play('blop', { loop: false });
        this.transitionToMenu();
      }, this);

    let dims = this.getScreenDimension();
    this.updateLayout(dims.width, dims.height);
    this.updateText();

    let music = this.sound.add('theme');
    SoundHelper.playBackgroundMusic(music);

    this.sound.add('blop');
  }

  updateLayout(width: number, height: number): void {
    (this.children.getByName('titleText') as Phaser.GameObjects.Text)
      .setPosition(16, 16);

    (this.children.getByName('title') as Phaser.GameObjects.Sprite)
      .setPosition(width / 2, height / 2)
      .setDisplaySize(width * 0.6, width * 0.75 * 0.6);
  }

  update(time: number, delta: number): void {
  }

  onResize(width: number, height: number) {
    this.updateLayout(width, height);
    this.updateText();
  }

  updateText(): void {
    let text = [
      'Welcome to Mini Game', 
      'Oliver and Noah\'s playground!',
      '',
      'window size: ' + window.innerWidth + 'x' + window.innerHeight,
      'screen size: ' + window.screenX + 'x' + window.screenY,
      'canvas size: ' + this.game.config.width + 'x' + this.game.config.height
    ];

    (this.children.getByName('titleText') as Phaser.GameObjects.Text)
      .setText(text);
  }

  transitionToMenu(): void {
    this.scene.start('Menu');
  }
}
