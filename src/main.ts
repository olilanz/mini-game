    import { Game } from './game';

    // when the page is loaded, create our game instance
    window.onload = () => {
        'use strict';

        let game = new Game("game-ganvas");
        game.scale.resize(window.innerWidth, window.innerHeight);
        
        // make sure that the game resizes when the browser resizes
        window.addEventListener('resize', () => { 
            game.scale.resize(window.innerWidth, window.innerHeight);
        }, false);
    }
    