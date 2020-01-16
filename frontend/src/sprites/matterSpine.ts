/**
 * Helper class that attaches a spine animation to a matter physics object.
 * It works by creating a small anchor physics object to which the animation is attached to, 
 * abd then jopining that anchor to the phyics object that represents the body (using the attachBody() function). 
 * This is a workaround until Phaser provides better Spine/Matter integration, e.g. through
 * native support of Phaser.Physics.Matter.Spine (a class that does not yet exist)...
 */

// @ts-ignore
import SpineGameObject from "phaser/plugins/spine/dist/SpineWebGLPlugin";

export class MatterSpine {
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
       this.spine.drawBones = true;
    }

    /**
     * Atteches the spine aniomation to a MatterJS body.
     * @param body Body to attached to.
     * @param scaleCorrection Scale correction factor for the spine animation. 
     *      Will be applied after scaling the spine to match the size of the object.
     */
    attachBody(body: MatterJS.Body, scaleCorrection: number = 1.0) {
        // rescale spine to match the body
        let size = new Phaser.Math.Vector2(
            // @ts-ignore
            body.bounds.max.x - body.bounds.min.x,
            // @ts-ignore
            body.bounds.max.y - body.bounds.min.y
        );

        let scale = this.calculateScale(
            this.spine.getBounds().size.x, 
            this.spine.getBounds().size.y,
            size.x, 
            size.y
        ) * scaleCorrection;
        this.spine.setScale(scale, scale);

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

    /**
     * Returns the scale to be applied to object 1, so it fits onto object 2.
     * The sides of the objects are chosen as reference, where the relative difference is 
     * smallest.
     * @param x1 Width of object 1
     * @param y1 height of object 1
     * @param x2 width of object 2
     * @param y2 width of object 2
     */
    private calculateScale(x1: number, y1: number, x2: number, y2: number): number {
        let scaleX = x2 / x1;
        let scaleY = y2 / y1;
        return scaleX < scaleY ? scaleY : scaleX;
    }
        
    getAttachments() {
        return this.spine.skeleton.skin.attachments
    }

    getSlots() {
        return this.spine.skeleton.slots
    }

    setFlipX(flip: boolean) {
        // this.spine.flipX = flip;
        let scaleX = Math.abs(this.spine.scaleX);
        this.spine.scaleX = flip ? -scaleX : scaleX;
    }

    setAttachment(slotName: string, attachmentName: string) {
        this.spine.skeleton.setAttachment(slotName, attachmentName)
    }

    setSkin(newSkin: string) {
        this.spine.setSkin(null)
        this.spine.setSkinByName(newSkin)
    }

    setAnimation(animation: string, loop: boolean = false) {
        this.spine.play(animation, loop);
    }
}
