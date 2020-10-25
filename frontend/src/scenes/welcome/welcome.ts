/**
 * Welcome screen
 * 
 * Entry page of the game.
 */

import { Assets } from '~/assets/assets';
import { BaseScene } from '~/scenes/basescene';
import { SoundHelper } from '~/helpers/soundhelper';
import { GameMode } from '~/externalgameconfig';

export class Welcome extends BaseScene {

  constructor() {
    super({
      key: 'Welcome'
    });
  }

  init(): void {
    this.attachDefaultHandlers();
  }

  create(): void {
    this.addButton('title', Assets.IMAGE_TITLE,
      function (this: Welcome) {
        this.sound.play(Assets.SOUND_BLOP, { loop: false });
        if (GameMode.server == this.getExternalGameConfig().gameMode) {
          this.transitionToServerConsole();
        } else {
          this.transitionToMenu();
        }
      }, this);

    this.addButton('btnFullscreen', Assets.IMAGE_BTN_FULLSCREEN,
      function (this: Welcome) {
        this.setFullscreenMode(true);
      }, this);

    this.addButton('btnWindowed', Assets.IMAGE_BTN_WINDOWED,
      function (this: Welcome) {
        this.setFullscreenMode(false);
      }, this);

    let dims = this.getScreenDimension();
    this.updateLayout(dims.width, dims.height);

    let music = this.sound.add(Assets.MUSIC_THEME);
    SoundHelper.playBackgroundMusic(music);

    this.sound.add(Assets.SOUND_BLOP);
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
  }

  onShutdown() {
    this.detachDefaultHandlers();
  }

  setFullscreenMode(on: boolean) {
    this.sound.play(Assets.SOUND_BLOP, { loop: false });
    if (this.scale.isFullscreen == on) {
      return;
    }
    if (on) {
      this.scale.startFullscreen();
    } else {
      this.scale.stopFullscreen();
    }
  }

  transitionToMenu(): void {
    this.scene.start('Menu');
  }

  transitionToServerConsole(): void {
    this.scene.start('ServerConsole');
  }
}