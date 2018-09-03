/**
 * Game canvas
 * 
 * Entry page of the game.
 */

import { BaseScene } from './basescene';
import { SoundHelper } from '../helpers/soundhelper';
import __imagePause from '../assets/images/button_pause.png';
import __musicLevel from '../assets/music/levelsong.mp3';
import __soundBlop from '../assets/sounds/blop.mp3';

export class LevelCanvas extends BaseScene {

  constructor() {
    super({
      key: 'LevelCanvas'
    });
  }

  private music: Phaser.Sound.BaseSound | undefined;

  init(config: object) {
    let navstate = this.getNavigationState();
    this.data.values.level = navstate.currentLevel;

    this.startLevel();

    this.events.on('wake', this.resumeLevel, this);
    this.events.on('sleep', this.pauseLevel, this);
  }

  preload(): void {
    this.load.image('pause', __imagePause);
    this.load.audio('levelsong', __musicLevel);
    this.load.audio('blop', __soundBlop);
  }

  create(): void {
    let text = [
      'LevelCanvas', 
      'Here is the game-play'
    ];
    this.add.text(16, 16, text, { fontSize: '12px', fill: '#fff' });

    let dims = this.getScreenDimension();
    let margin = dims.width * 0.1;
    let btnsize = dims.width * 0.08;
    let btn = null;

    btn = this.add.sprite(dims.width - margin, margin, 'pause') as Phaser.GameObjects.Sprite;
    btn.setDisplaySize(btnsize, btnsize);
    btn.setInteractive();
    btn.on('pointerdown', function (this: LevelCanvas, pointer: string | symbol) {
      this.sound.play('blop', { loop: false });
      this.scene.switch('Pause'); // puts this scene to sleep (no render, no update), and starts the pause scene
      // this.scene.pause('Level');
    }, this);

    this.music = this.sound.add('levelsong');
    SoundHelper.playBackgroundMusic(this.music);
  }

  update(time: number, delta: number): void {
  }

  private startLevel(): void {    
    this.scene.stop('Level');
    this.scene.launch('Level');
  }

  private pauseLevel(): void {
    this.scene.sleep('Level');
  }

  private resumeLevel(): void {
    this.scene.wake('Level');
    SoundHelper.playBackgroundMusic(this.music);
  }
}


