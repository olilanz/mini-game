import "phaser";
import "phaser/plugins/spine/dist/SpineWebGLPlugin";

import __imageBtnLeft from './assets/images/button_left.png';
import __imageBtnRight from './assets/images/button_right.png';

const __atlasSpineBoy: string = 'spineboy.atlas';
const __skeletonSpineBoy: string = 'spineboy.skeleton';

const STATIC_ASSET_URL: string = "assets/spine";
const IMAGE_BTN_LEFT: string = "imageBtnLeft";
const IMAGE_BTN_RIGHT: string = "imageBtnRight";
const SPINE_BOY: string = "spineSpineBoy";

class Scene1 extends Phaser.Scene {

    constructor() {
        super({ key: 'Scene1' });
    }

    preload(): void {
        this.load.image(IMAGE_BTN_LEFT, __imageBtnLeft);
        this.load.image(IMAGE_BTN_RIGHT, __imageBtnRight);

        this.load.setPath(STATIC_ASSET_URL);
        this.load.spine(SPINE_BOY, __skeletonSpineBoy, __atlasSpineBoy, false);
    }

    create(): void {
        this.add.sprite(0, 0, IMAGE_BTN_RIGHT)
            .setName(name)
            .setInteractive()
            .setPosition(50, 50)
            .setDisplaySize(50, 50)
            .on('pointerdown', function (this: Scene1) { this.scene.start('Scene2'); }, this);

        let spine = this.add.spine(100, 500, SPINE_BOY, "idle", true);
        spine.scale = 0.5;

        spine = this.add.spine(500, 500, SPINE_BOY, "run", true);
        spine.depth = 2;
        spine.drawDebug = true;
        spine.drawBones = true;
    }
}

class Scene2 extends Phaser.Scene {

    constructor() {
        super({ key: 'Scene2' });
    }

    preload(): void {
        this.load.image(IMAGE_BTN_LEFT, __imageBtnLeft);
        this.load.image(IMAGE_BTN_RIGHT, __imageBtnRight);

        this.load.setPath(STATIC_ASSET_URL);
        this.load.spine(SPINE_BOY, __skeletonSpineBoy, __atlasSpineBoy, false);
    }

    create(): void {
        this.add.sprite(0, 0, IMAGE_BTN_LEFT)
            .setName(name)
            .setInteractive()
            .setPosition(50, 50)
            .setDisplaySize(50, 50)
            .on('pointerdown', function (this: Scene2) { this.scene.start('Scene1'); }, this);

        let spine = this.add.spine(200, 300, SPINE_BOY, "idle", true);
        spine.scale = 0.5;

        spine = this.add.spine(500, 700, SPINE_BOY, "run", true);
        spine.depth = 2;
        spine.drawDebug = true;
        spine.drawBones = true;
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
