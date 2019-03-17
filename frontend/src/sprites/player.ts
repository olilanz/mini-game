import { PlayerSpine } from './playerSpine'

export class Player extends Phaser.Physics.Matter.Image {
    playerSpine: PlayerSpine

    constructor(scene: Phaser.Scene, pos: Phaser.Math.Vector2, size: Phaser.Math.Vector2, spine: string, animation: string) {
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
        var factory = new Phaser.Physics.Matter.Factory(scene.matter.world); 
        var body = factory.trapezoid(pos.x, pos.y, size.x, size.y, 0.3, {} );
        this.setExistingBody(body, true);
        factory.destroy();

        // player behavior
        this.setFixedRotation();

        // attach a spine animation to the body
        this.playerSpine = new PlayerSpine(this.scene, spine, animation);
        this.playerSpine.attachBody(body);
    }

    update(/*cursors: any, controls: Controls*/) {
        var body = this.body;
    }
}
