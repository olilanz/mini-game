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

// represents the entire game
export class Game extends Phaser.Game {
    // main game configuration (internal behaviour; external appearance/embedding should be defined in CSS)
    static readonly defaults: Phaser.Types.Core.GameConfig = {
        type: Phaser.WEBGL,
        backgroundColor: '#222244',
        plugins: {
            scene: [
                {
                    key: 'SpinePlugin',
                    // @ts-ignore
                    plugin: window.SpinePlugin,
                    mapping: 'spine'
                }
            ]
        },
        scene: [Scene1, Scene2],
        scale: {
            parent: "game-canvas",
            fullscreenTarget: "game-canvas",
            //mode: Phaser.Scale.ENVELOP, 
        },
        disableContextMenu: true,
        input: {
            keyboard: true,
            mouse: true,
            touch: true,
            gamepad: false
        }
    };

    // constructs the game based on the game configuration
    constructor(renderTarget: string) {
        super(Game.getGameConfig(renderTarget));
    }

    static getGameConfig(renderTarget: string): Phaser.Types.Core.GameConfig {
        let config = Game.defaults;

        if (renderTarget !== "" && config.scale) {
            config.scale.parent = renderTarget;
            config.scale.fullscreenTarget = renderTarget;
        }

        return config;
    }
}

// when the page is loaded, create our game instance
window.onload = () => {
    'use strict';

    let game = new Game("game-ganvas");
    game.scale.resize(window.innerWidth, window.innerHeight);
}
