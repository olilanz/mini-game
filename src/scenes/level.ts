/**
 * Game Level
 * 
 * Entry page of the game.
 */

import { BaseScene } from './basescene';
import __soundBlop from '../assets/sounds/blop.mp3';

export class Level extends BaseScene {

  readonly DURATION: number = 5000;
  private countdown: number = 0;
  private countdownText!: Phaser.GameObjects.Text;

  constructor() {
    super({
      key: 'Level'
    });

    this.countdown = this.DURATION;
  }

  init(config: object) {
    let navstate = this.getNavigationState();
    this.data.values.level = navstate.currentLevel;
    this.countdown = this.DURATION;
  }

  preload(): void {
    this.load.audio('blop', __soundBlop);
  }

  create(): void {
    let text = [
      'Level', 
      'Here is the game-play'
    ];
    this.add.text(16, 48, text, { fontSize: '12px', fill: '#fff' });

    let dims = this.getScreenDimension();
    this.countdownText = this.add.text(dims.width / 5, dims.height / 2, "#", { fontSize: '72px', fill: '#fff' });
  }

  update(time: number, delta: number): void {
    this.countdown -= delta;
    this.countdownText.setText("Level " + this.data.values.level + "\n+" + (this.countdown / 1000).toFixed(1));
    if (this.countdown < 0) {
      this.countdown = this.DURATION;
      this.sound.play('blop', { loop: false });
      this.countdown = this.DURATION;
    }
  }
}


