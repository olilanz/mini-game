/**
 * Menu class
 * 
 * Select levels here
 */
export class Menu extends Phaser.Scene {

  private phaserSprite: Phaser.GameObjects.Sprite;
  private titleText: Phaser.GameObjects.Text;

  constructor() {
    super({
      key: 'Menu'
    });
  }

  preload(): void {
  }

  create(): void {
    this.input.keyboard.on('keydown', function(e) {
      if (e.key == '1') {
        this.scene.start('Welcome');
      } else if (e.key == '2') {
        this.scene.start('Menu');
      } 
    }, this);

    this.titleText = this.add.text(16, 16, 'mytext', { fontSize: '32px', fill: '#fff' });

    // drawing
    // create a group for our graphics
    let group = this.add.group();

    // created on the world
    let graphics = this.add.graphics(); // adds to the world stage
    graphics.lineStyle(2, 0xFFFFFF, 1);
    graphics.strokeRect(200, 200, 250, 250);
    group.add(graphics) // moves from world stage to group as a child

    // create an instance of graphics, then add it to a group
    let graphics2 = this.add.graphics();
    graphics2.x = 300;
    graphics2.lineStyle(2, 0xFFFFFF, 1);
    graphics2.strokeRect(200, 200, 250, 250);
    group.add(graphics2); // added directly to the group as a child    
  }

  update(delta): void {
  }
}
