import { Game } from "../game";

/**
 * Game canvas
 * 
 * Entry page of the game.
 */

export abstract class SoundHelper {

    static backgroundMusic: Phaser.Sound.BaseSound | null = null;

    static playBackgroundMusic(music: Phaser.Sound.BaseSound | undefined): void {
        if (!music) {
            return; // cannot play null
        }

        if (this.backgroundMusic && this.backgroundMusic.isPlaying) {            
            if (this.backgroundMusic.key == music.key) {
                return; // music with same key (same music) already playing
            }
            this.backgroundMusic.stop();
        }

        music.play('', { loop: true })
        this.backgroundMusic = music;
    }
}


