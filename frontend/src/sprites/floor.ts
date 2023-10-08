import Phaser from 'phaser';
import { Assets } from '../assets/assets';

export class Floor extends Phaser.Physics.Matter.Image {
    constructor(scene: Phaser.Scene, pos: Phaser.Math.Vector2, size: Phaser.Math.Vector2) {
        super(scene.matter.world, pos.x, pos.y, Assets.IMAGE_FLOOR_DIRT);

        // set up rendering of texture 
        // before body is added
        this.scene = scene;
        this.setDisplaySize(size.x, size.y);
        scene.add.existing(this);

        // add customized body
        let factory = new Phaser.Physics.Matter.Factory(scene.matter.world);
        let config = {
            isStatic: true,
            isActive: false
        };
        let body = factory.rectangle(pos.x + (size.x / 2), pos.y + (size.y / 2), size.x, size.y, config);
        this.setExistingBody(body, true);
        factory.destroy();
    }
}
