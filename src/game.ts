/**
 * Main Game class
 * 
 * Constructs the game and anchors it in the HTML page.
 * Global settigns are to be found here.
 */

import "phaser";

import { Welcome } from "./scenes/welcome";
import { Menu } from "./scenes/menu";
import { Level } from "./scenes/level";
import { Scores } from "./scenes/scores";
import { Pause } from "./scenes/pause";
import { GamePlay } from "./gameplay/gameplay";

// represents the entire game
export class Game extends Phaser.Game {
  // main game configuration (internal behaviour; external appearance/embedding should be defined in CSS)
  static config: GameConfig = {
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
  constructor() {
    super(Game.config);
  }
}
