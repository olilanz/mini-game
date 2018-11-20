/**
 * Game canvas
 * 
 * Entry page of the game.
 */

import { BaseScene } from '../basescene';
import { SoundHelper } from '../../helpers/soundhelper';

import __imagePause from '../../assets/images/button_pause.png';
import __musicLevel from '../../assets/music/levelsong.mp3';
import __soundBlop from '../../assets/sounds/blop.mp3';

export class Harness extends BaseScene {

  private cookieCount: integer = 0;
  private lastFps: integer = 0;
  private statusText!: Phaser.GameObjects.Text;

  private music: Phaser.Sound.BaseSound | undefined;

  constructor() {
    super({
      key: 'Harness'
    });
  }

  init(config: object) {
    this.attachDefaultHandlers();

    this.attacheEventHandlers();
    this.startLevelStage();

    let navstate = this.getNavigationState();
    this.data.values.level = navstate.currentLevel;

    this.cookieCount = 0;
  }

  preload(): void {
    this.load.image('pause', __imagePause);
    this.load.audio('levelsong', __musicLevel);
    this.load.audio('blop', __soundBlop);
  }

  create(): void {
    this.statusText = this.add.text(16, 16, [], { fontSize: '24px', fill: '#fff' });
    this.updateText();
    
    
    this.addButton('pause', 'pause',
      function (this: Harness) {
        this.sound.play('blop', { loop: false });
        this.transitionToPause();
      }, this);

    let dims = this.getScreenDimension();
    this.updateLayout(dims.width, dims.height);

    this.music = this.sound.add('levelsong');
    SoundHelper.playBackgroundMusic(this.music);

    this.updateText();
  }

  onResize(width: number, height: number) {
    this.updateLayout(width, height);
  }

  updateLayout(width: number, height: number): void {
    let margin = width * 0.1;
    let btnsize = width * 0.08;

    (this.children.getByName('pause') as Phaser.GameObjects.Sprite)
      .setPosition(width - margin, margin)
      .setDisplaySize(btnsize, btnsize);
  }

  update(time: number, delta: number): void {
    this.updateFpsText(this.game.loop.actualFps);
  }

  updateFpsText(actualFps: number) {
    let fps: integer = Math.trunc(actualFps);
    if (this.lastFps != fps) {
      this.lastFps = fps;
      this.updateText();
    }
  }

  updateText(): void {
    let text = [
      `Level ${this.data.values.level}`,
      `Cookie count: ${this.cookieCount}`,
      `FPS: ${this.lastFps}` 
    ];
    this.statusText.setText(text);
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
    this.scene.launch('Canvas');
  }

  private stopLevelStage(): void {
    this.scene.stop('Canvas');
  }

  private resumeLevelStage(): void {
    this.music = this.sound.add('levelsong');
    SoundHelper.playBackgroundMusic(this.music);

    this.scene.wake('Canvas');
  }

  private transitionToPause(): void {
    this.scene.sleep('Canvas');
    this.scene.switch('Pause'); 
  }

  private transitionToScores(success: boolean): void {
    SoundHelper.playBackgroundMusic(this.music);
    this.scene.start('Scores', { success });
  }
}


