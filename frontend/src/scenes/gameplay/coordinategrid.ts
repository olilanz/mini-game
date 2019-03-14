/**
 * Displays a coordinate grid in teh scene
 * 
 * This can be useful for construction and design of game elements. 
 */

export class CoordinateGrid extends Phaser.GameObjects.Group {

  constructor(scene: Phaser.Scene, posx: number, posy: number, width: number, height: number) {
    super(scene);
    this.populate(scene, posx, posy, width, height);
  }

  private populate(scene: Phaser.Scene, posx: number, posy: number, width: number, height: number) {
    this.clear();

    const SPACE = 100; // space between lines

    var graphics = scene.add.graphics();

    // vertical lines
    var linesx: integer = width / SPACE;
    for (var x: integer = 0; x < linesx; x++) {
      this.setLineStyle(graphics, 0==x%5);
      var offsetx = x * SPACE; 
      graphics.lineBetween(
        posx + offsetx,
        posy, 
        posx + offsetx, 
        posy + height);
    }

    // horizontal lines
    var linesy: integer = height / SPACE;
    for (var y: integer = 0; y < linesy; y++) {
      this.setLineStyle(graphics, 0==y%5);
      var offsety = y * SPACE;
      graphics.lineBetween(
        posx,
        posy + height - offsety, 
        posx + width, 
        posy + height - offsety);
    }
      
    this.add(graphics);
  }

  private setLineStyle(graphics: Phaser.GameObjects.Graphics, thick: boolean) {
    graphics.lineStyle(
      thick ? 5 : 1, 
      0xffffff, 
      0.2);
  }
}


