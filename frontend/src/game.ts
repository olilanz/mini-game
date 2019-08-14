/**
 * Main Game class
 * 
 * Constructs the game and anchors it in the HTML page.
 * Global settigns are to be found here.
 */

import "phaser";
import "phaser/plugins/spine/dist/SpineWebGLPlugin";

// @ts-ignore
import SpineWebGLPlugin from "./plugins/spine/SpineWebGLPlugin";
// @ts-ignore

import PhaserMatterCollisionPlugin from "phaser-matter-collision-plugin";

import { ExternalGameConfig, GameMode } from "./externalgameconfig";
import { GlobalStateIdentifier } from "./gamestate";

import { Engine } from "./engine/engine";

import { Welcome } from "./scenes/welcome/welcome";
import { ServerConsole } from "./scenes/serverconsole/serverconsole";
import { Menu } from "./scenes/menu/menu";
import { Harness } from "./scenes/gameplay/harness";
import { Scores } from "./scenes/scores/scores";
import { Pause } from "./scenes/pause/pause";
import { Canvas } from "./scenes/gameplay/canvas";

// represents the entire game
export class Game extends Phaser.Game {
  // main game configuration (internal behaviour; external appearance/embedding should be defined in CSS)
  static readonly defaults: Phaser.Types.Core.GameConfig = {
    type: Phaser.WEBGL,
    backgroundColor: '#222244',
    plugins: {
      scene: [
        {
          key: 'SpineWebGLPlugin',
          plugin: SpineWebGLPlugin,
          start: true,
          sceneKey: 'spine'
        },
        {
          // https://github.com/mikewesthad/phaser-matter-collision-plugin
          plugin: PhaserMatterCollisionPlugin, // The plugin class
          key: "matterCollision", // Where to store in Scene.Systems, e.g. scene.sys.matterCollision
          mapping: "matterCollision" // Where to store in the Scene, e.g. scene.matterCollision
        }
      ]
    },
    scene: [],
    scale: {
      parent: "game-canvas",
      fullscreenTarget: "game-canvas",
      //mode: Phaser.Scale.ENVELOP, 
    },
    physics: {
      default: "matter",
      matter: {
        debug: true
      }
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
  constructor(renderTarget: string, externalConfig: ExternalGameConfig) {
    super(Game.getGameConfig(renderTarget, externalConfig.gameMode));

    this.registry.set(
      GlobalStateIdentifier.Engine, 
      new Engine(
        "/gamehub", 
        externalConfig.playerName));

    this.registry.set(
      GlobalStateIdentifier.ExternalConfig, 
      externalConfig);  
  }

  static getGameConfig(renderTarget: string, mode: GameMode): Phaser.Types.Core.GameConfig {
    let config = Game.defaults;

    if (renderTarget !== "" && config.scale) {
        config.scale.parent = renderTarget;
        config.scale.fullscreenTarget = renderTarget;
    }

    if (mode == GameMode.server) {
      config.scene = [ Welcome, ServerConsole ];
    } else {
      config.scene = [ Welcome, Menu, Harness, Canvas, Pause, Scores ];
    }

    return config;    
  }
}
