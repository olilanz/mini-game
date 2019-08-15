    import { Game } from './game';

    // when the page is loaded, create our game instance
    window.onload = () => {
        'use strict';

        let game = new Game("game-ganvas");
        game.scale.resize(window.innerWidth, window.innerHeight);
    }
    