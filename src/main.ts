import { Game } from './game';

// when the page is loaded, create our game instance
window.onload = () => {
    'use strict';
    let game = new Game();
    game.resize(window.innerWidth, window.innerHeight);
    
    window.addEventListener('resize', () => { game.resize(window.innerWidth, window.innerHeight); }, false);
}

