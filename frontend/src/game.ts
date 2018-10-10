/**
 * Main Game class
 * 
 * Constructs the game and anchors it in the HTML page.
 * Global settigns are to be found here.
 */

import "phaser";
import { ExternalGameConfig } from "./externalgameconfig";
import { GlobalStateIdentifier } from "./gamestate";

import { Engine } from "./gameplay/engine";

import { Welcome } from "./screens/welcome";
import { ServerConsole } from "./screens/serverconsole";
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
    scene: [ Welcome, ServerConsole, Menu, Level, GamePlay, Pause, Scores ],
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
  constructor(externalConfig: ExternalGameConfig) {
    super(Game.defaults);

    this.registry.set(
      GlobalStateIdentifier.Engine, 
      new Engine(
        "/gamehub", 
        this.registry.values.playerName));

    this.registry.set(
      GlobalStateIdentifier.ExternalConfig, 
      externalConfig);  
  }
}
