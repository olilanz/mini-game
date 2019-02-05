import { Game } from './game';
import { ExternalGameConfig, GameMode } from './externalgameconfig';

// when the page is loaded, create our game instance
window.onload = () => {
    'use strict';

    // read the game configuration from the URL query string
    // todo: let url = ew URL(window.URLSearchParams)
    // initialize the game
    let config = buildExternalConfig(new URLSearchParams(window.location.search));
    let game = new Game(config);
    game.scale.resize(window.innerWidth, window.innerHeight);
    
    // make sure that the game resizes when the browser resizes
    window.addEventListener('resize', () => { 
        game.scale.resize(window.innerWidth, window.innerHeight);
    }, false);
}

function buildExternalConfig(searchParams: URLSearchParams): ExternalGameConfig {
    // read params
    let playerName: string | null = searchParams.get("playerName");
    let gameMode: string | null = searchParams.get("gameMode");

    // defaults
    let config: ExternalGameConfig = {
        playerName: playerName ? playerName : "noname", 
        gameMode: gameMode == "server" ? GameMode.server : GameMode.normal
    };

    return config;
}