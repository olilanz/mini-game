import { Game } from './game';

// when the page is loaded, create our game instance
window.onload = () => {
    'use strict';

    // read the game configuration from the URL query string
    // todo: let url = ew URL(window.URLSearchParams)
    let config: [string, string][] = [];
    for (let entry of new URLSearchParams(window.location.search).entries()) {
        config.push(entry);
    }

    // initialize the game
    let game = new Game(config);
    game.resize(window.innerWidth, window.innerHeight);
    
    // make sure that the game resizes when the browser resizes
    window.addEventListener('resize', () => { 
        game.resize(window.innerWidth, window.innerHeight);
    }, false);
}

