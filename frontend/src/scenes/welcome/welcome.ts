/**
 * Welcome screen
 * 
 * Entry page of the game.
 */

import { BaseScene } from '../basescene';
import { SoundHelper } from '../../helpers/soundhelper';

import __imageTitle from '../../assets/images/title.png';
import __imageFullscreen from '../../assets/images/button_fullscreen.png';
import __imageWindowed from '../../assets/images/button_windowed.png';
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
    this.load.image('btnFullscreen', __imageFullscreen);
    this.load.image('btnWindowed', __imageWindowed);
    this.load.audio('theme', __musicTheme);
    this.load.audio('blop', __soundBlop);

    this.load.setPath('assets/spine/spineboy')

    // @ts-ignore
    this.load.spine('boy', 'spineboy.json', 'spineboy.atlas');
  }

  create(): void {
    this.addButton('title', 'title', 
      function (this: Welcome) {
        this.sound.play('blop', { loop: false });
        this.transitionToMenu();
      }, this);

      this.addButton('btnFullscreen', 'btnFullscreen', 
      function (this: Welcome) {
        this.setFullscreenMode(true);
     }, this);

     this.addButton('btnWindowed', 'btnWindowed', 
     function (this: Welcome) {
       this.setFullscreenMode(false);
    }, this);

    let dims = this.getScreenDimension();
    this.updateLayout(dims.width, dims.height);
    this.updateText();

    let music = this.sound.add('theme');
    SoundHelper.playBackgroundMusic(music);

    this.sound.add('blop');

    // @ts-ignore
    this.add.spine(dims.width / 5, dims.height, 'boy', 'idle', true);   
  }

  updateLayout(width: number, height: number): void {
    let size = Math.min(width, height);
    let margin = size * 0.1;
    let btnsize = size * 0.08;

    let isFullscreen = this.scale.isFullscreen;

    (this.children.getByName('btnFullscreen') as Phaser.GameObjects.Sprite)
      .setPosition(width - margin, margin)
      .setDisplaySize(btnsize, btnsize)
      .setActive(!isFullscreen)
      .setVisible(!isFullscreen);

    (this.children.getByName('btnWindowed') as Phaser.GameObjects.Sprite)
      .setPosition(width - margin, margin)
      .setDisplaySize(btnsize, btnsize)
      .setActive(isFullscreen)
      .setVisible(isFullscreen);

    (this.children.getByName('title') as Phaser.GameObjects.Sprite)
      .setPosition(width / 2, height / 2)
      .setDisplaySize(size * 0.6, size * 0.75 * 0.6);
  }

  update(time: number, delta: number): void { 
  }

  onResize(gameSize: Phaser.Structs.Size, baseSize: Phaser.Structs.Size, displaySize: Phaser.Structs.Size, resolution: number) {
    super.onResize(gameSize, baseSize, displaySize, resolution);
    this.updateLayout(displaySize.width, displaySize.height);
    this.updateText();
  }

  onShutdown() {
    this.detachDefaultHandlers();
  }

  setFullscreenMode(on: boolean) {
    this.sound.play('blop', { loop: false });
    if (this.scale.isFullscreen == on) {
      return;
    }
    if (on) {
      this.scale.startFullscreen();
    } else {
      this.scale.stopFullscreen();
    }
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
