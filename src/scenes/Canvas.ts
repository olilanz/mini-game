/**
 * Game canvas
 * 
 * Entry page of the game.
 */

export class Canvas extends Phaser.Scene {
  
  constructor() {
    super({
      key: 'Canvas'
    });
  }

  preload(): void {
  }

  create(): void {
    this.add.text(16, 16, 'Canvas', { fontSize: '12px', fill: '#fff' });

    this.input.keyboard.on('keydown', function(e) {
      if (e.key == '1') {
        this.scene.start('Welcome');
      } else if (e.key == '2') {
        this.scene.start('Menu');
      } else if (e.key == '3') {
        this.scene.start('Canvas');
      } 
    }, this);
  }

  update(delta): void {
  }
}


