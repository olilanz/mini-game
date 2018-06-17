export class Welcome extends Phaser.Scene {
  
  private phaserSprite: Phaser.GameObjects.Sprite;

  constructor() {
    super({
      key: 'Welcome'
    });
  }

  preload(): void {
    this.load.image('logo', './assets/images/stars.png');
  }

  create(): void {
    this.phaserSprite = this.add.sprite(400, 300, 'logo');

    this.tweens.add({
      targets: this.phaserSprite,
      y: 450,
      duration: 1000,
      ease: 'Power2',
      yoyo: true,
      loop: -1
    });

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


