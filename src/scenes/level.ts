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

export class Level extends BaseScene {

  private music: Phaser.Sound.BaseSound | undefined;

  constructor() {
    super({
      key: 'Level'
    });
  }

  init(config: object) {
    this.attacheEventHandlers();
    this.startLevelStage();

    let navstate = this.getNavigationState();
    this.data.values.level = navstate.currentLevel;
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
    btn.on('pointerdown', function (this: Level, pointer: string | symbol) {
      this.sound.play('blop', { loop: false });
      this.transitionToPause();
    }, this);

    this.music = this.sound.add('levelsong');
    SoundHelper.playBackgroundMusic(this.music);
  }

  update(time: number, delta: number): void {
  }

  private attacheEventHandlers() {
    this.events.on('shutdown', this.shutdown, this);
    this.events.on('wake', this.resumeLevelStage, this);
    this.events.on('conclude', this.transitionToScores, this);
  }

  private detacheEventHandlers() {
    this.events.off('shutdown', this.stopLevelStage, this, false);
    this.events.off('wake', this.resumeLevelStage, this, false);
    this.events.off('conclude', this.transitionToScores, this, false);
  }

  private shutdown() {
    this.detacheEventHandlers();
    this.stopLevelStage();
  }

  private startLevelStage(): void {    
    this.scene.launch('GamePlay');
  }

  private stopLevelStage(): void {
    this.scene.stop('GamePlay');
  }

  private resumeLevelStage(): void {
    this.scene.wake('GamePlay');
  }

  private transitionToPause(): void {
    this.scene.sleep('GamePlay');
    this.scene.switch('Pause'); 
  }

  private transitionToScores(success: boolean): void {
    SoundHelper.playBackgroundMusic(this.music);
    this.scene.start('Scores', { success });
  }
}


