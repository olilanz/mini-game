/**
 * Main Game class
 * 
 * Constructs the game and anchors it in the HTML page.
 * Global settigns are to be found here.
 */

import "phaser";
import "phaser/plugins/spine/dist/SpineWebGLPlugin";

import { Scene1 } from "scene1";
import { Scene2 } from "scene2";

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
    scene: [ Scene1, Scene2 ],
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
