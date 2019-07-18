import { MatterSpine } from './matterSpine'
import { Assets } from '~/assets/assets';

export class Player extends Phaser.Physics.Matter.Image {
    playerSpine: MatterSpine

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
        this.playerSpine = new MatterSpine(this.scene, Assets.SPINE_TEMPLATE, 'idle');
        this.playerSpine.setSkin("Template");
        this.playerSpine.attachBody(body, 1.5);

        // interactions
        this.configureCollisions(this.scene, body);
    }

    configureCollisions(scene: Phaser.Scene, body: MatterJS.Body) {
        console.log("configuring collisions");
        // @ts-ignore
        scene.matterCollision.addOnCollideStart({
            objectA: body,
            callback: (eventData: any) => {
                const { bodyB, gameObjectB } = eventData;
                console.log("Player touched something.");
                // bodyB will be the matter body that the player touched
                // gameObjectB will be the game object that owns bodyB, or undefined if there's no game object
                console.log("collision detected");
                console.log(gameObjectB);
            }
          });
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
