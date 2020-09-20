/**
 * Displays a coordinate grid in teh scene
 * 
 * This can be useful for construction and design of game elements. 
 */

import Phaser from 'phaser';

export class CoordinateGrid extends Phaser.GameObjects.Group {

  constructor(scene: Phaser.Scene, posx: number, posy: number, width: number, height: number) {
    super(scene);
    this.populate(scene, posx, posy, width, height);
  }

  private populate(scene: Phaser.Scene, posx: number, posy: number, width: number, height: number) {
    this.clear();

    const SPACE = 100; // space between lines

    let graphics = scene.add.graphics();

    // vertical lines
    let linesx: integer = width / SPACE;
    for (let x: integer = 0; x < linesx; x++) {
      this.setLineStyle(graphics, 0==x%5);
      let offsetx = x * SPACE; 
      graphics.lineBetween(
        posx + offsetx,
        posy, 
        posx + offsetx, 
        posy + height);
    }

    // horizontal lines
    let linesy: integer = height / SPACE;
    for (let y: integer = 0; y < linesy; y++) {
      this.setLineStyle(graphics, 0==y%5);
      let offsety = y * SPACE;
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


