/**
 * Game-Play
 * 
 * This is the scene that harnesses tyhe actual gameplay. 
 */

import { BaseScene } from '../scenes/basescene';
import __imageMonster from '../assets/images/monster.png';
import __imageCookie from '../assets/images/cookie.png';
import __soundBlop from '../assets/sounds/blop.mp3';

export class GamePlay extends BaseScene {

  private monster!: Phaser.GameObjects.Sprite;

  constructor() {
    super({
      key: 'GamePlay',
    });
  }

  init(config: object) {
    let navstate = this.getNavigationState();
    this.data.values.level = navstate.currentLevel;
  }

  preload(): void {
    this.load.audio('blop', __soundBlop);
    this.load.image('monster', __imageMonster);
    this.load.image('cookie', __imageCookie);
  }

  create(): void {
    let text = [
      'Level ' + this.data.values.level
    ];
    this.add.text(16, 48, text, { fontSize: '16px', fill: '#fff' });

    let dims = this.getScreenDimension();

    this.monster = this.add.sprite(dims.width * 0.5, dims.height * 0.5, 'monster') as Phaser.GameObjects.Sprite;
    this.monster.setDisplaySize(dims.width * 0.1, this.monster.width * (dims.width * 0.1) / this.monster.width);
    this.monster.setInteractive();
    this.monster.on('pointerdown', function (this: GamePlay, pointer: string | symbol) {
      this.sound.play('blop', { loop: false });
      this.complete();
    }, this);

    this.createCookies(this.data.values.level);
  }

  createCookies(count: integer): void {
    for (let i = 0; i < count; i++) {
      let cookie = this.physics.add.sprite(i * Phaser.Math.Between(30, 60), i * Phaser.Math.Between(20, 40), 'cookie');
      cookie.setBounce(0.6);
      cookie.setCollideWorldBounds(true);   
    }
  }

  update(time: number, delta: number): void {
  }

  complete(): void {
    this.scene.get('Level').events.emit('complete');
  }
}


