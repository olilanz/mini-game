/**
 * Console for server interactions
 * 
 * Provides monitoring and control for the backend
 */

import { BaseScene } from '../basescene';
import { SoundHelper } from '../helpers/soundhelper';
import __imageBack from '../assets/images/button_left.png';

export class ServerConsole extends BaseScene {
  
  constructor() {
    super({
      key: 'ServerConsole'
    });
  }

  init(config: { success: boolean }) {
    this.attachDefaultHandlers();
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
  }

  updateLayout(width: number, height: number): void {
    let margin = width * 0.1;
    let btnsize = width * 0.08;

    (this.children.getByName('titleText') as Phaser.GameObjects.Text)
      .setPosition(16, 16);

    (this.children.getByName('back') as Phaser.GameObjects.Sprite)
    .setPosition(margin, height / 2)
    .setDisplaySize(btnsize, btnsize);
  }

  update(time: number, delta: number): void {
  }

  onResize(width: number, height: number) {
    this.updateLayout(width, height);
  }

  navigateToMenu(): void {
    this.scene.start('Menu');
  }
}


