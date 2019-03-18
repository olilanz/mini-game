import { Player } from './player'

// @ts-ignore
import SpineGameObject from "phaser/plugins/spine/dist/SpineWebGLPlugin";

export class PlayerSpine {
    spine: SpineGameObject;
    scene: Phaser.Scene;

    constructor(scene: Phaser.Scene, spine: string, animation: string) {
        // @ts-ignore
        this.spine = scene.add.spine(0, 0, spine, animation, true);
        this.scene = scene;

        /*
            this.spine.play(this.spine.customParams.animation, true)
            this.spine.setMix('run', 'idle', 0.3)
            this.spine.setMix('idle', 'run', 0.3)
            this.spine.setMix('jump', 'run', 0.2)
            this.spine.setMix('run', 'jump', 0.3)
            this.spine.setMix('idle', 'jump', 0.3)
            this.spine.setMix('jump', 'idle', 0.2)
            this.spine.setMix('jump', 'kill', 0.2)
            this.spine.setMix('kill', 'idle', 0.2)
            this.setSkin('blue')
        */
       this.spine.drawDebug = true;
    }

    attachBody(body: MatterJS.Body) {
        // rescale spine to match the body
        let size = new Phaser.Math.Vector2(
            // @ts-ignore
            body.bounds.max.x - body.bounds.min.x,
            // @ts-ignore
            body.bounds.max.y - body.bounds.min.y
        );

        let scaleX = size.x / this.spine.getBounds().size.x;
        let scaleY = size.y / this.spine.getBounds().size.y;
        let scale = scaleX < scaleY ? scaleY : scaleY;
        this.spine.setScale(scale, scale);

        this.spine.setScale(
            scale, 
            scale);

            // create anchor object with spine attached
        let anchorConfig = {
            shape: {
                type: 'rectangle',
                width: 1,
                height: 1
            },
            isSensor: true,
            isActive: false
        };
        let anchor = this.scene.matter.add.gameObject(this.spine, anchorConfig).body;

        // connect anchor to the body
        let factory = new Phaser.Physics.Matter.Factory(this.scene.matter.world); 

        let jointConfig = {
            pointA: { x: 0, y: size.y / 2 }, 
            pointB: { x: 0, y: 0 }
        };

        factory.joint(body, anchor, 0, 1, jointConfig);
        factory.destroy();
    }

    getAttachments() {
        return this.spine.skeleton.skin.attachments
    }

    getSlots() {
        return this.spine.skeleton.slots
    }

    setFlipX(flip: boolean) {
        this.spine.flipX = flip;
    }

    setAttachment(slotName: string, attachmentName: string) {
        this.spine.skeleton.setAttachment(slotName, attachmentName)
    }

    setSkin(newSkin: string) {
        this.spine.setSkin(null)
        this.spine.setSkinByName(newSkin)
    }

    setAnimation(animation: string, loop: boolean = false) {
        if (this.spine.customParams.animation !== animation) {
            this.spine.customParams.animation = animation
            this.spine.play(animation, loop)
        }
    }
}
