/**
 * Welcome screen
 * 
 * Entry page of the game.
 */

export class Welcome extends Phaser.Scene {
  
/*
  private bgSprite: Phaser.GameObjects.Sprite;
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
    /*
    this.load.image('logo', './assets/images/stars.png');
    this.load.image('bg', './assets/images/background.png');
    this.load.image('bg_stars', './assets/images/background_stars.png');
    this.load.image('bg_stars_far', './assets/images/background_stars_far.png');
    */
  }

  create(): void {
    var text = [
      'Welcomem to Mini Game', 
      'Oliver and Noah\'s playground',
      'Type "2" to switch scene.'
    ];
    this.add.text(16, 16, text, { fontSize: '32px', fill: '#fff' });

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


