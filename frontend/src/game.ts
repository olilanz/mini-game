/**
 * Main Game class
 * 
 * Constructs the game and anchors it in the HTML page.
 * Global settigns are to be found here.
 */

import "phaser";
import { Engine } from "./gameplay/engine";

import { Welcome } from "./screens/welcome";
import { Menu } from "./screens/menu";
import { Level } from "./screens/level";
import { Scores } from "./screens/scores";
import { Pause } from "./screens/pause";
import { GamePlay } from "./gameplay/gameplay";

// represents the entire game
export class Game extends Phaser.Game {
  // main game configuration (internal behaviour; external appearance/embedding should be defined in CSS)
  static defaults: GameConfig = {
    type: Phaser.AUTO,
    parent: "game-canvas",
    scene: [ Welcome, Menu, Level, GamePlay, Pause, Scores ],
    physics: {
      default: "matter",
      matter: {
        // debug: true
      }
    },
    input: {
      keyboard: true,
      mouse: true,
      touch: true,
      gamepad: false
    },
    disableContextMenu: true,
    backgroundColor: '#222244'
  };

  // constructs the game based on the game configuration
  constructor(config: [string, string][]) {
    super(Game.defaults);

    // copy external config to game game regitry
    config.forEach(e => this.registry.set(e["0"], e["1"]));
    console.log(this.registry);

    // initialize server connection and store in game registry
    this.registry.set("engine", new Engine("/gamehub"))
  }
}
