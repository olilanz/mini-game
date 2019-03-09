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
    }

    attachBody(body: MatterJS.Body) {
        // rescale spine to match the body
        var size = new Phaser.Math.Vector2(
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
        var anchorConfig = {
            shape: {
                type: 'rectangle',
                width: 1,
                height: 1
            },
            isSensor: true,
            isActive: false
        };
        var anchor = this.scene.matter.add.gameObject(this.spine, anchorConfig).body;

        // connect anchor to the body
        var factory = new Phaser.Physics.Matter.Factory(this.scene.matter.world); 

        var jointConfig = {
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

    update(player: Player) {
        if (!player || !player.body) return

/*
        // spine position
        this.spine.x = player.getCenter().x
        this.spine.y = player.getBottomLeft().y + 8
*/

        /*
        // spine animation
        if (player.body.blocked.down) {
          this.spine.customParams.isKilling = false
          const animation = Math.abs(player.body.velocity.x) >= 10 ? 'run' : 'idle'
          this.setAnimation(animation, true)
        }
        if (!player.body.blocked.down) {
          const animation = this.spine.customParams.isKilling ? 'kill' : 'jump'
          this.setAnimation(animation)
        }
    
        // spine flip
        if (player.flipX !== this.spine.flipX) this.spine.flipX = player.flipX
        */
    }
}
