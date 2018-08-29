import { GameState } from '../gamestate'

interface CanvasDimension {
    height: number,
    width: number,
    deviceHeight: number,
    deviceWidth: number,
    devicePixelRatio: number
}   

export class BaseScene extends Phaser.Scene {
    public getScreenDimension(): CanvasDimension {
        return {
            height: this.sys.canvas.height, 
            width: this.sys.canvas.width, 
            deviceHeight: this.sys.canvas.height * window.devicePixelRatio, 
            deviceWidth: this.sys.canvas.width * window.devicePixelRatio, 
            devicePixelRatio: window.devicePixelRatio
        };
    }

    protected getGameState(): GameState {
        return this.registry.get("gamestate") as GameState;
    }

    protected setGameState(state: GameState): void {
        this.registry.set("gamestate", state);
    }
}