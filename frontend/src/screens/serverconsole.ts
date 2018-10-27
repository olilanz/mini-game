/**
 * Console for server interactions
 * 
 * Provides monitoring and control for the backend
 */

import { BaseScene } from '../basescene';
import { SoundHelper } from '../helpers/soundhelper';
import { ConsoleProxy } from '../communication/consoleproxy';
import __imageBack from '../assets/images/button_left.png';
import { ConnectionState } from '../communication/abstractconnection';

export class ServerConsole extends BaseScene {

  private _server: ConsoleProxy = new ConsoleProxy("/consolehub", "anonymous");
  private _consoleText: string[] =  [];

  private readonly REFRESH_INTERVAL = 1000; // milliseconds
  private _countdown: integer = 0;          // 

  constructor() {
    super({
      key: 'ServerConsole'
    });
  }

  init(config: { success: boolean }) {
    this.attachDefaultHandlers();

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
    this.add.text(0, 0, text, { fontSize: '12px', fill: '#fff' }).setName('titleText');

    this.add.text(0, 0, ["..."], { fontSize: '12px', fill: '#fff', backgroundcolor: '#aaa' }).setName('consoleText');

    this.add.sprite(0, 0, 'back')
      .setName('back')
      .setInteractive()
      .on('pointerdown', function (this: ServerConsole, pointer: string | symbol) {
        this.sound.play('blop', { loop: false });
        this.navigateToMenu();
      }, this);

    let dims = this.getScreenDimension();
    this.updateLayout(dims.width, dims.height);

    let music = this.sound.add('theme');
    SoundHelper.playBackgroundMusic(music);

    this.sound.add('blop');

    this.updateConsoleText();
  }

  updateLayout(width: number, height: number): void {
    let margin = width * 0.1;
    let btnsize = width * 0.08;

    (this.children.getByName('titleText') as Phaser.GameObjects.Text)
      .setPosition(16, 16);

    (this.children.getByName('consoleText') as Phaser.GameObjects.Text)
      .setPosition(margin + btnsize + margin, margin);

    (this.children.getByName('back') as Phaser.GameObjects.Sprite)
    .setPosition(margin, height / 2)
    .setDisplaySize(btnsize, btnsize);
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

  updateConsoleText() {
    this._consoleText.push("Lallala");

    (this.children.getByName('consoleText') as Phaser.GameObjects.Text)
      .setText(this._consoleText);
  }

  onResize(width: number, height: number) {
    this.updateLayout(width, height);
  }

  onShutdown(): void {
    this._server.stop();
  }

  onReceiveStats(stats: string): void {

  }

  navigateToMenu(): void {
    this.scene.start('Menu');
  }
}


