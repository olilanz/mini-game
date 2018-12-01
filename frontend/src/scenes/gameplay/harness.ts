/**
 * Game canvas
 * 
 * Entry page of the game.
 */

import { BaseScene } from '../basescene';
import { Canvas } from './canvas';
import { InputController } from './inputcontroller';
import { SoundHelper } from '../../helpers/soundhelper';

import __imagePause from '../../assets/images/button_pause.png';
import __musicLevel from '../../assets/music/levelsong.mp3';
import __soundBlop from '../../assets/sounds/blop.mp3';

export class Harness extends BaseScene {

  private lastFps: integer = 0;
  private lastCookieCount: integer = 0;
  private statusText!: Phaser.GameObjects.Text;

  private music: Phaser.Sound.BaseSound | undefined;

  private _inputController: InputController = new InputController;
  private _canvas: Canvas | undefined;

  constructor() {
    super({
      key: 'Harness'
    });
  }

  init(config: object) {
    this.attacheEventHandlers();
    this.startCanvas();

    let navstate = this.getNavigationState();
    this.data.values.level = navstate.currentLevel;
  }

  preload(): void {
    this.load.image('pause', __imagePause);
    this.load.audio('levelsong', __musicLevel);
    this.load.audio('blop', __soundBlop);
  }

  create(): void {
    this.statusText = this.add.text(0, 0, [], { fontSize: '24px', fill: '#fff' })
      .setName("statusText");
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

    (this.children.getByName('statusText') as Phaser.GameObjects.Text)
      .setPosition(16, 16);

    (this.children.getByName('pause') as Phaser.GameObjects.Sprite)
      .setPosition(width - margin, margin)
      .setDisplaySize(btnsize, btnsize);
  }

  update(time: number, delta: number): void {
    this.updateFpsText(this.game.loop.actualFps);
    this.updateCookieCountText(this.getCookieCount());
  }

  updateFpsText(actualFps: number) {
    let fps: integer = Math.trunc(actualFps);
    if (this.lastFps != fps) {
      this.lastFps = fps;
      this.updateText();
    }
  }

  updateCookieCountText(actualCookieCount: integer) {
    if (this.lastCookieCount != actualCookieCount) {
      this.lastCookieCount = actualCookieCount;
      this.updateText();
    }
  }

  updateText(): void {
    let text = [
      `Level ${this.data.values.level}`,
      `Cookie count: ${this.lastCookieCount}`,
      `FPS: ${this.lastFps}` 
    ];
    this.statusText.setText(text);
  }

  private getCookieCount(): integer {
    if (this._canvas)  {
      return this._canvas.getCookieCount();
    }
    return 0;
  }

  private attacheEventHandlers() {
    this.attachDefaultHandlers();
    this.events.on('wake', this.resumeCanvas, this);
    this.events.on('conclude', this.transitionToScores, this);
  }

  private detacheEventHandlers() {
    this.events.off('conclude', this.transitionToScores, this, false);
    this.events.off('wake', this.resumeCanvas, this, false);
    this.detachDefaultHandlers();
  }

  protected onShutdown() {
    this.detacheEventHandlers();
    this.stopCanvas();
  }

  private startCanvas(): void {    
    this.scene.launch('Canvas');
    this._canvas = this.scene.get('Canvas') as Canvas;
    this._inputController.attach(this._canvas);
  }

  private stopCanvas(): void {
    this._inputController.detach();
    this.scene.stop('Canvas');
    this._canvas = undefined;
  }

  private resumeCanvas(): void {
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


