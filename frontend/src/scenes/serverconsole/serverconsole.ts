/**
 * Console for server interactions
 * 
 * Provides monitoring and control for the backend
 */

import { BaseScene } from '../basescene';
import { SoundHelper } from '../../helpers/soundhelper';
import { ConsoleProxy } from '../../communication/consoleproxy';
import { ConnectionState } from '../../communication/abstractconnection';

import __imageBack from '../../assets/images/button_left.png';
import { stat } from 'fs';

export class ServerConsole extends BaseScene {

  private _server: ConsoleProxy = new ConsoleProxy("/consolehub", "anonymous");
  private _consoleText: string[] =  [];

  private readonly MAX_MESSAGES = 50; // milliseconds
  private readonly REFRESH_INTERVAL = 1000; // milliseconds

  private _countdown: integer = 0;          // 

  constructor() {
    super({
      key: 'ServerConsole'
    });
  }

  init(config: { success: boolean }) {
    this.attachDefaultHandlers();

    this._server.onConnectionStateChanged(this.onConnectionStateChanged.bind(this));
    this._server.onSetStats(this.onReceiveStats.bind(this));
    this._server.start();
  }

  preload(): void {
    this.load.image('back', __imageBack);
  }

  create(): void {
    let text = [
      'Console', 
      'Server interactions will be available here.'
    ];

    this.add.text(0, 0, ["..."], { fontSize: '12px', fill: '#fff', backgroundcolor: '#aaa' })
      .setName('consoleText');

    this.add.sprite(0, 0, 'back')
      .setName('back')
      .setInteractive()
      .on('pointerdown', function (this: ServerConsole, pointer: string | symbol) {
        this.sound.play('blop', { loop: false });
        this.navigateToMenu();
      }, this);

    this.add.circle(0, 0, 5, 0, 9)
      .setName('connectionIndicator');

    let dims = this.getScreenDimension();
    this.updateLayout(dims.width, dims.height);

    let music = this.sound.add('theme');
    SoundHelper.playBackgroundMusic(music);

    this.sound.add('blop');

    this.updateConsoleText();
    this.setConnectionStateIndicator(this._server.getConnectionState());
  }

  updateLayout(width: number, height: number): void {
    let margin = width * 0.1;
    let btnsize = width * 0.08;

    (this.children.getByName('consoleText') as Phaser.GameObjects.Text)
      .setPosition(margin, margin);

    (this.children.getByName('back') as Phaser.GameObjects.Sprite)
    .setPosition(width - margin, margin)
    .setDisplaySize(btnsize, btnsize);

    (this.children.getByName('connectionIndicator') as Phaser.GameObjects.Arc)
      .setPosition(margin, margin / 2);
  }

  update(time: number, delta: number): void {
    if (this._server.getConnectionState() == ConnectionState.connected) {
      this._countdown -= delta;
    }
    if (this._countdown <= 0) {
      this._server.requestStats();
      this._countdown = this.REFRESH_INTERVAL;
    }
  }

  setConnectionStateIndicator(state: ConnectionState) {
    let color: number = 0;
    switch (state) {
      case ConnectionState.stopped: {
        color = 0xff0000;
        break;
      }
      case ConnectionState.connecting: {
        color = 0xffff00;        
        break;
      }
      case ConnectionState.connected: {
        color = 0x00ff00;
        break;
      }
    }

    let cirlce = this.children.getByName('connectionIndicator') as Phaser.GameObjects.Arc | null;
    if (cirlce) {
      cirlce.setFillStyle(color, 1);
    }
  }

  updateConsoleText() {
    (this.children.getByName('consoleText') as Phaser.GameObjects.Text)
      .setText(this._consoleText);
  }

  addConsoleMessage(message: string) {
    // insert new messages in front
    this._consoleText.unshift(message);

    // drop last message if too many
    if (this._consoleText.length > this.MAX_MESSAGES) {
      this._consoleText.pop();
    } 
  }

  onResize(width: number, height: number) {
    this.updateLayout(width, height);
  }

  onShutdown(): void {
    this._server.stop();
  }

  onConnectionStateChanged(newState: ConnectionState, oldState: ConnectionState) {
    this.addConsoleMessage(
      "Connection state changed from " + ConnectionState[oldState] + " to " + ConnectionState[newState]);
    this.setConnectionStateIndicator(newState);
  }

  onReceiveStats(stats: string): void {
    this.addConsoleMessage(stats);
    this.updateConsoleText();
  }

  navigateToMenu(): void {
    this.scene.start('Menu');
  }
}


