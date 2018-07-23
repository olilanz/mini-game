/**
 * Welcome screen
 * 
 * Entry page of the game.
 */

import imageTitle from '../assets/images/title.png';

export class Welcome extends Phaser.Scene {
  
/*
  private spriteTitle: Phaser.GameObjects.Sprite;
  private bgSpriteStars: Phaser.GameObjects.Sprite;
  private bgSpriteStarsFar: Phaser.GameObjects.Sprite;
  private phaserSprite: Phaser.GameObjects.Sprite;
*/

  constructor() {
    super({
      key: 'Welcome'
    });
  }

  preload(): void {
    this.load.image('title', imageTitle);
    /*
    this.load.image('bg', './assets/images/background.png');
    this.load.image('bg_stars', './assets/images/background_stars.png');
    this.load.image('bg_stars_far', './assets/images/background_stars_far.png');
    */
  }

  create(): void {
    let text = [
      'Welcomem to Mini Game', 
      'Oliver and Noah\'s playground'
    ];
    this.add.text(16, 16, text, { fontSize: '12px', fill: '#fff' });

    let title = this.add.sprite(400, 300, 'title') as Phaser.GameObjects.Sprite;
    title.setInteractive();
    title.on('pointerdown', function (pointer) {
      this.scene.start('Menu');
      console.log("click"); 
      console.log(pointer); 
    }, this);

/*
    this.bgSprite = this.add.sprite(400, 300, 'bg');
    this.bgSpriteStars = this.add.sprite(400, 300, 'bg_stars');
    this.bgSpriteStarsFar = this.add.sprite(400, 300, 'bg_stars_far');

    this.phaserSprite = this.add.sprite(400, 300, 'logo');

    this.tweens.add({
      targets: this.phaserSprite,
      y: 450,
      duration: 1000,
      ease: 'Power2',
      yoyo: true,
      loop: -1
    });
*/

    this.input.keyboard.on('keydown', function(e) {
      if (e.key == '1') {
        this.scene.start('Welcome');
      } else if (e.key == '2') {
        this.scene.start('Menu');
      } 
    }, this);
  }

  update(delta): void {
  }
}


