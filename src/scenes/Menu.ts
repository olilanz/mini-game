export class Menu extends Phaser.Scene {

  private phaserSprite: Phaser.GameObjects.Sprite;
  private titleText: Phaser.GameObjects.Text;

  constructor() {
    super({
      key: 'Menu'
    });
  }

  preload(): void {
    this.load.image('logo2', './assets/images/stars2.png');
  }

  create(): void {
    this.phaserSprite = this.add.sprite(400, 300, 'logo2');

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

    this.titleText = this.add.text(16, 16, 'mytext', { fontSize: '32px', fill: '#fff' });
  }

  update(delta): void {
  }
}
