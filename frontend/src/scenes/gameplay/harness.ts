/**
 * Game canvas
 * 
 * Entry page of the game.
 */

import Phaser from 'phaser';

import { BaseScene } from '../../scenes/basescene';
import { Canvas, ICanvasStats } from './canvas';
import { SoundHelper } from '../../helpers/soundhelper';

import { Assets } from '../../assets/assets';

interface IHarnessStats extends ICanvasStats {
  harnessFps: integer;
}

export class Harness extends BaseScene {
  private _lastStats: IHarnessStats;
  private _infoText!: Phaser.GameObjects.Text;

  private _canvas: Canvas | undefined;

  private _music: Phaser.Sound.BaseSound | undefined;


  constructor() {
    super({
      key: 'Harness'
    });

    this._lastStats = this.getDefaultHarnessStats();
  }

  init(config: object) {
    this.attacheEventHandlers();

    let navstate = this.getNavigationState();
    this.data.values.level = navstate.currentLevel;
  }

  create(): void {
    this._infoText = this.add.text(0, 0, [], { fontSize: '24px', fill: '#fff' })
      .setName("infoText");
    this.updateInfoText();
    
    this.addButton('pause', Assets.IMAGE_BTN_PAUSE,
      function (this: Harness) {
        this.sound.play(Assets.SOUND_BLOP, { loop: false });
        this.transitionToPause();
      }, this);

    let dims = this.getScreenDimension();
    this.updateLayout(dims.width, dims.height);

    this._music = this.sound.add(Assets.MUSIC_LEVEL);
    SoundHelper.playBackgroundMusic(this._music);

    this.updateInfoText();

    // harness ready.. start the game
    this.startCanvas();
  }

  onResize(gameSize: Phaser.Structs.Size, baseSize: Phaser.Structs.Size, displaySize: Phaser.Structs.Size, resolution: number) {
    super.onResize(gameSize, baseSize, displaySize, resolution);
    this.updateLayout(displaySize.width, displaySize.height);
  }

  updateLayout(width: number, height: number): void {
    let size = Math.min(width, height);
    let margin = size * 0.1;
    let btnsize = size * 0.08;

    (this.children.getByName('infoText') as Phaser.GameObjects.Text)
      .setPosition(16, 16);

    (this.children.getByName('pause') as Phaser.GameObjects.Sprite)
      .setPosition(width - margin, margin)
      .setDisplaySize(btnsize, btnsize);
  }

  update(time: number, delta: number): void {
    this.updateInfoText();
  }

  updateInfoText(): void {
    let stats: IHarnessStats = this.getHarnessStats();
    // todo: Really? Hardcoded fomratting? Make a bit more dynamic...
    if (stats.cookieCount == this._lastStats.cookieCount
      && stats.cameraZoom == this._lastStats.cameraZoom
      && stats.harnessFps == this._lastStats.harnessFps) {
        return;
    }

    let text = [
      `Level ${this.data.values.level}` 
    ];
    // todo: Really? Hardcoded fomratting? Make a bit more dynamic...
    text.push('Cookie count: ' + stats.cookieCount);
    text.push('Player count: ' + (stats.opponentCount + 1));
    text.push('FPS: ' + stats.harnessFps);
    text.push('Zoom: ' + stats.cameraZoom);
    this._infoText.setText(text);

    this._lastStats = stats;
  }

  private getDefaultHarnessStats(): IHarnessStats {
    return {
      opponentCount: -1,
      cookieCount: -1,
      cameraZoom: 0.0,
      harnessFps: 0
    };
  }

  private getHarnessStats(): IHarnessStats {
    let stats: IHarnessStats = this.getDefaultHarnessStats();
    stats.harnessFps = Math.trunc(this.game.loop.actualFps);

    let canvasStats = this.getCanvasStats();
    if (canvasStats) {
      stats = Object.assign(stats, canvasStats);
    }

    return stats;
  }

  private getCanvasStats(): ICanvasStats | undefined {
    if (this._canvas)  {
      return this._canvas.getCanvasStats();
    }
    return undefined;
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
    this._canvas.scene.sendToBack();
  }

  private stopCanvas(): void {
    this.scene.stop('Canvas');
    this._canvas = undefined;
  }

  private pauseCanvas() {
    let canvas = this._canvas as Canvas;
    canvas.pause();
  }

  private resumeCanvas(): void {
    this._music = this.sound.add(Assets.MUSIC_LEVEL);
    SoundHelper.playBackgroundMusic(this._music);

    let canvas = this._canvas as Canvas;
    canvas.resume();
  }

  private transitionToPause(): void {
    this.pauseCanvas();
    this.scene.switch('Pause'); 
  }

  private transitionToScores(success: boolean): void {
    SoundHelper.playBackgroundMusic(this._music);
    this.scene.start('Scores', { success });
  }
}


