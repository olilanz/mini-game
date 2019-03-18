import { PlayerSpine } from './playerSpine'
import { Assets } from '../assets/assets';

export class Player extends Phaser.Physics.Matter.Image {
    playerSpine: PlayerSpine

    constructor(scene: Phaser.Scene, pos: Phaser.Math.Vector2, size: Phaser.Math.Vector2) {
        super(scene.matter.world, pos.x, pos.y, '');

        // set up rendering of texture 
        // before body is added
        this.scene = scene;
        this.setDisplaySize(size.x, size.y);
        scene.add.existing(this);

        // make texture invisible, 
        // since we are attaching a spine
        this.setVisible(true);
        this.setAlpha(0.001);

        // add customized body
        let factory = new Phaser.Physics.Matter.Factory(scene.matter.world); 
        let body = factory.trapezoid(pos.x, pos.y, size.x, size.y, 0.3, {} );
        this.setExistingBody(body, true);
        factory.destroy();

        // player behavior
        this.setFixedRotation();

        // attach a spine animation to the body
        this.playerSpine = new PlayerSpine(this.scene, Assets.SPINE_TEMPLATE, 'idle');
        this.playerSpine.setSkin("Template");
        this.playerSpine.attachBody(body);
    }

    preUpdate() {
        const MARGIN = 0.1;
        // @ts-ignore
        let vx = this.body.velocity.x;
        if (vx > MARGIN) {
            this.playerSpine.setFlipX(false);            
        } 
        if (vx < -MARGIN) {
            this.playerSpine.setFlipX(true);            
        }
    }
}
