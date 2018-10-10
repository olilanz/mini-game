/**
 * Console for server interactions
 * 
 * Provides monitoring and control for the backend
 */

import { BaseScene } from '../basescene';
import { SoundHelper } from '../helpers/soundhelper';
import { ServerConsoleProxy } from '../communication/serverconsoleproxy';
import __imageBack from '../assets/images/button_left.png';

export class ServerConsole extends BaseScene {

  private _server: ServerConsoleProxy = new ServerConsoleProxy("/consolehub");
  private _consoleText: string[] =  [];

  constructor() {
    super({
      key: 'ServerConsole'
    });
  }

  init(config: { success: boolean }) {
    this.attachDefaultHandlers();
    this._server.connect();
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
    this._server.disconnect();
  }

  navigateToMenu(): void {
    this.scene.start('Menu');
  }
}


