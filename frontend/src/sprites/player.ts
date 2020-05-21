import { MatterSpine } from './matterSpine'
import { Assets } from '~/assets/assets';

export class Player extends Phaser.Physics.Matter.Image {
    __playerSpine: MatterSpine;

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
        this.__playerSpine = new MatterSpine(this.scene, Assets.SPINE_TEMPLATE, 'idle');
        this.__playerSpine.setSkin("Template");
        this.__playerSpine.attachBody(body, 1.5);
    }

    preUpdate() {
        const MARGIN = 0.1;

        // @ts-ignore
        let vx = this.body.velocity.x;
        if (vx > MARGIN) {
            this.__playerSpine.setFlipX(false);            
        } 
        if (vx < -MARGIN) {
            this.__playerSpine.setFlipX(true);            
        }
    }

    public jump() {
        this.setVelocityY(-30);
        this.__playerSpine.setAnimation("jump2");
    }

    public stomp() {
        this.setVelocityY(80);
        this.__playerSpine.setAnimation("land");
    }

    public leapLeft() {
        this.setVelocityX(-20);
        this.__playerSpine.setAnimation("run");
    }

    public leapRight() {
        this.setVelocityX(20);
        this.__playerSpine.setAnimation("run");
    }
}
