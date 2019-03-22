/**
 * Welcome screen
 * 
 * Entry page of the game.
 */

import { Asset, Assets } from '../../assets/assets';
import { BaseScene } from '../basescene';
import { SoundHelper } from '../../helpers/soundhelper';
import { GameMode } from '../../externalgameconfig';

export class Welcome extends BaseScene {

  private __loadCompleted = false;

  private __progressBox!: Phaser.GameObjects.Graphics;
  private __progressBar!: Phaser.GameObjects.Graphics;
  private __loadingText!: Phaser.GameObjects.Text;
  private __percentText!: Phaser.GameObjects.Text;

  constructor() {
    super({
      key: 'Welcome'
    });
  }

  init(): void {
    this.attachDefaultHandlers();
  }

  preload(): void {
    if (!this.__loadCompleted) {
      this.initProgressBar();
      Assets.getInstance().forEach(this.loadAsset.bind(this));
    }
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

  initProgressBar() {
    // progress bar
    this.__progressBar = this.add.graphics();
    this.__progressBox = this.add.graphics();
    this.__progressBox.fillStyle(0x222222, 0.8);
    this.__progressBox.fillRect(240, 270, 320, 50);

    // loading text
    let width = this.cameras.main.width;
    let height = this.cameras.main.height;
    this.__loadingText = this.make.text({
      x: width / 2,
      y: height / 2 - 50,
      text: 'Loading...',
      style: {
        font: '20px monospace',
        fill: '#ffffff'
      }
    });
    this.__loadingText.setOrigin(0.5, 0.5);

    // percentage text
    this.__percentText = this.make.text({
      x: width / 2,
      y: height / 2 - 5,
      text: '0%',
      style: {
        font: '18px monospace',
        fill: '#ffffff'
      }
    });
    this.__percentText.setOrigin(0.5, 0.5);

    // event handlers
    this.load.on('progress', this.onProgress.bind(this));
    this.load.on('complete', this.onLoadCompleted.bind(this));
  }

  private destroyProgressBar() {
    this.__progressBar.destroy();
    this.__progressBox.destroy();
    this.__loadingText.destroy();
    this.__percentText.destroy();
  }

  private onProgress(value: number) {
    this.__progressBar.clear();
    this.__progressBar.fillStyle(0xffffff, 1);
    this.__progressBar.fillRect(250, 280, 300 * value, 30);

    this.__percentText.setText(value * 100 + '%');
  }

  private onLoadCompleted() {
    this.__loadCompleted = true;
    this.destroyProgressBar();
  }

  private loadAsset(asset: Asset, key: string, map: Assets) {
    if (asset.kind == "image") {
      this.load.image(key, asset.url);
    } else if (asset.kind == "music") {
      this.load.audio(key, asset.url);
    } else if (asset.kind == "sound") {
      this.load.audio(key, asset.url);
    } else if (asset.kind == "spine") {
      // spine assets load the spritesheets implicitly, which is why
      // the loader needs to know the base location og the spritesheet
      this.load.setPath(asset.url);
      // and since the parcel bundler does not handle paths in atlas files, 
      // the bundled files cannot be used for loading atlas. this could
      // be fixed later via parcel plugin that provied apine support.
      // insted, for now, the file names generated by parcel are
      // reversed to the original names, so that they can be loaded
      // from the static folder instead. RRR
      let base = (asset.url2 ? asset.url2 : '').split('.').shift();
      let skeleton: string = base + '.skeleton';
      let atlas: string = base + '.atlas';

      // @ts-ignore
      this.load.spine(key, skeleton, atlas);
      //this.load.setPath(path);
    } else {
      throw "Unhandled asset type " + asset.kind + " from " + asset.url;
    }
  }
}
