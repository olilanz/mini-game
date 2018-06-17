/// <reference path="../typescript/phaser.d.ts"/>

import "phaser";
import { Welcome } from "./scenes/Welcome";
import { Menu } from "./scenes/Menu";

// main game configuration
const config: GameConfig = {
  width: 800,
  height: 600,
  type: Phaser.AUTO,
  parent: "game",
  scene: [ Welcome, Menu ],
  physics: {
    default: "arcade",
    arcade: {
      gravity: { y: 200 }
    }
  }
};

// game class
export class Game extends Phaser.Game {
  constructor(config: GameConfig) {
    super(config);
  }
}

// when the page is loaded, create our game instance
window.onload = () => {
  var game = new Game(config);
};
