/**
 * Main Game class
 * 
 * Constructs the game and anchors it in the HTML page.
 * Global settigns are to be found here.
 */

import "phaser";
import { Welcome } from "./scenes/Welcome";
import { Menu } from "./scenes/Menu";

// represents the entire game
export class Game extends Phaser.Game {
  // main game configuration
  static config: GameConfig = {
    width: 800,
    height: 600,
    type: Phaser.AUTO,
    parent: "game-canvas",
    scene: [ Welcome, Menu ],
    physics: {
      default: "arcade",
      arcade: {
        gravity: { y: 200 }
      }
    },
    input: {
      keyboard: true,
      mouse: true,
      touch: true,
      gamepad: false
    },
    "render.antialias": true,
    backgroundColor: '#111155'
  };

  // constructs the game based on the game configuration
  constructor() {
    super(Game.config);
  }
}
