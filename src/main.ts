import "phaser";
import "phaser/plugins/spine/dist/SpineWebGLPlugin";

const IMAGE_BTN_LEFT: string = "imageBtnLeft";
const IMAGE_BTN_RIGHT: string = "imageBtnRight";
const SPINE_BOY: string = "spineSpineBoy";

class Scene1 extends Phaser.Scene {

    constructor() {
        super({ key: 'Scene1' });
    }

    preload(): void {
        this.load.setPath('assets');
        this.load.image("imageBtnRight", 'button_right.png');
        this.load.spine("spineSpineBoy", 'spineboy.skeleton', 'spineboy.atlas', true);
    }

    create(): void {
        this.add.sprite(0, 0, "imageBtnRight")
            .setInteractive()
            .setPosition(50, 50)
            .setDisplaySize(50, 50)
            .on('pointerdown', function (this: Scene1) { this.scene.start('Scene2'); }, this);

            this.add.spine(200, 700, "spineSpineBoy", "idle", true);
            this.add.spine(500, 700, "spineSpineBoy", "run", true);
        }
}

class Scene2 extends Phaser.Scene {

    constructor() {
        super({ key: 'Scene2' });
    }

    preload(): void {
        this.load.setPath('assets');
        this.load.image("imageBtnLeft", 'button_left.png');
        this.load.spine("spineSpineBoy", 'spineboy.skeleton', 'spineboy.atlas', true);
    }

    create(): void {
        this.add.sprite(0, 0, "imageBtnLeft")
            .setInteractive()
            .setPosition(50, 50)
            .setDisplaySize(50, 50)
            .on('pointerdown', function (this: Scene2) { this.scene.start('Scene1'); }, this);

        this.add.spine(200, 700, "spineSpineBoy", "idle", true);
        this.add.spine(500, 700, "spineSpineBoy", "run", true);
    }
}

window.onload = () => {
    'use strict';

    let config: Phaser.Types.Core.GameConfig = {
        type: Phaser.WEBGL,
        plugins: {
            scene: [
                {
                    key: 'SpinePlugin',
                    plugin: window.SpinePlugin,
                    mapping: 'spine'
                }
            ]
        },
        scene: [Scene1, Scene2],
        scale: {
            parent: "game-canvas"
        }
    };

    let game = new Phaser.Game(config);
    game.scale.resize(window.innerWidth, window.innerHeight);
}
