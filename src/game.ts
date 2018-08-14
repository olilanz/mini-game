/**
 * Main Game class
 * 
 * Constructs the game and anchors it in the HTML page.
 * Global settigns are to be found here.
 */

import "phaser";
import { Welcome } from "./scenes/welcome";
import { Menu } from "./scenes/menu";
import { Canvas } from "./scenes/canvas";
import { Scores } from "./scenes/scores";
import { Pause } from "./scenes/pause";

// represents the entire game
export class Game extends Phaser.Game {
  // main game configuration
  static config: GameConfig = {
    width: 640,
    height: 480,
    type: Phaser.AUTO,
    parent: "game-canvas",
    scene: [ Welcome, Menu, Canvas, Pause, Scores ],
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
    disableContextMenu: true,
    "render.antialias": true,
    backgroundColor: '#111155'
  };

  // constructs the game based on the game configuration
  constructor() {
    super(Game.config);
  }
}
