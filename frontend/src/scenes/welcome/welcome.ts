/**
 * Welcome screen
 * 
 * Entry page of the game.
 */

import { BaseScene } from '../basescene';
import { SoundHelper } from '../../helpers/soundhelper';

import __imageTitle from '../../assets/images/title.png';
import __musicTheme from '../../assets/music/theme.mp3';
import __soundBlop from '../../assets/sounds/blop.mp3';

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
    this.addButton('title', 'title', 
      function (this: Welcome) {
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
    let size = Math.min(width, height);

    (this.children.getByName('title') as Phaser.GameObjects.Sprite)
      .setPosition(width / 2, height / 2)
      .setDisplaySize(size * 0.6, size * 0.75 * 0.6);
  }

  update(time: number, delta: number): void { 
  }

  onResize(width: number, height: number) {
    super.onResize(width, height);
    this.updateLayout(width, height);
    this.updateText();
  }

  onShutdown() {
    this.detachDefaultHandlers();
  }

  updateText(): void {
    let text = [
      'Welcome to Mini Game', 
      ''
    ];

    let config = this.getExternalGameConfig();
    text.push("Player: " + config.playerName);
  }

  transitionToMenu(): void {
    this.scene.start('Menu');
  }
}
