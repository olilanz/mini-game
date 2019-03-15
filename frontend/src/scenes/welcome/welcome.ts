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

  constructor() {
    super({
      key: 'Welcome'
    });
  }

  init(): void {
    this.attachDefaultHandlers();
  }

  preload(): void {
    this.initProgressBar();
    Assets.getInstance().forEach(this.loadAsset.bind(this));
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
    var progressBar = this.add.graphics();
    var progressBox = this.add.graphics();
    progressBox.fillStyle(0x222222, 0.8);
    progressBox.fillRect(240, 270, 320, 50);

    // loading text
    var width = this.cameras.main.width;
    var height = this.cameras.main.height;
    var loadingText = this.make.text({
      x: width / 2,
      y: height / 2 - 50,
      text: 'Loading...',
      style: {
        font: '20px monospace',
        fill: '#ffffff'
      }
    });
    loadingText.setOrigin(0.5, 0.5);

    // percentage text
    var percentText = this.make.text({
      x: width / 2,
      y: height / 2 - 5,
      text: '0%',
      style: {
        font: '18px monospace',
        fill: '#ffffff'
      }
    });
    percentText.setOrigin(0.5, 0.5);

    // asset text
    var assetText = this.make.text({
      x: width / 2,
      y: height / 2 + 50,
      text: '',
      style: {
        font: '18px monospace',
        fill: '#ffffff'
      }
    });
    assetText.setOrigin(0.5, 0.5);

    // event handlers
    this.load.on('progress', function (value: number) {
      console.log(value);
      progressBar.clear();
      progressBar.fillStyle(0xffffff, 1);
      progressBar.fillRect(250, 280, 300 * value, 30);

      percentText.setText(value * 100 + '%');
    });

    this.load.on('fileprogress', function (file: any) {
      console.log(file.src);

      assetText.setText('Loading asset \'' + file.key + '\' from \'' + file.src + '\'');
    });

    this.load.on('complete', function () {
      console.log('complete');
      progressBar.destroy();
      progressBox.destroy();
      loadingText.destroy();
      percentText.destroy();
      assetText.destroy();
    });
  }

  private loadAsset(asset: Asset, key: string, map: Assets) {
    if (asset.kind == "image") {
      this.load.image(key, asset.url);
    } else if (asset.kind == "music") {
      this.load.audio(key, asset.url);
    } else if (asset.kind == "sound") {
      this.load.audio(key, asset.url);
    } else {
      throw "Unhandled asset type " + asset.kind + " from " + asset.url;
    }
  }
}
