import Phaser from 'phaser';
import { Assets } from '~/assets/assets';

export class Cookie extends Phaser.Physics.Matter.Image {
    constructor(scene: Phaser.Scene, pos: Phaser.Math.Vector2, size: integer) {
        super(scene.matter.world, pos.x, pos.y, Assets.IMAGE_COOKIE);

        // set up rendering of texture 
        // before body is added
        this.scene = scene;
        this.setDisplaySize(size, size);
        scene.add.existing(this);

        // add customized body
        let factory = new Phaser.Physics.Matter.Factory(scene.matter.world); 
        let body = factory.circle(pos.x, pos.y, size / 2.3, {} );
        this.setExistingBody(body, true);
        factory.destroy();

        // details
        this.setAngularVelocity(Phaser.Math.FloatBetween(-0.07, 0.07));
        this.setDensity(0.001);
        this.setBounce(0.7);
        this.setFriction(0.001, 0.01, 0.001);
    }
}
