/**
 * Preloader screen
 * 
 * SHows download progress.
 */

import { BaseScene } from '../basescene';
import { SoundHelper } from '../../helpers/soundhelper';

import __imageLogo from '../../assets/images/gigglingbits_logo.png';
import __musicTheme from '../../assets/music/theme.mp3';
import __soundBlop from '../../assets/sounds/blop.mp3';

export class Preloader extends BaseScene {
  
  constructor() {
    super({
      key: 'Preloader'
    });
  }

  init(): void {
    this.attachDefaultHandlers();
  }

  preload(): void {
    this.load.image('logo', __imageLogo);
    this.load.audio('theme', __musicTheme);
    this.load.audio('blop', __soundBlop);

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

  create(): void {
    this.addButton('logo', 'logo', 
      function (this: Preloader) {
        this.sound.play('blop', { loop: false });
        this.transitionToMenu();
      }, this);

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

    let isFullscreen = this.scale.isFullscreen;

    (this.children.getByName('logo') as Phaser.GameObjects.Sprite)
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

  transitionToMenu(): void {
    this.scene.start('Welcome');
  }
}
