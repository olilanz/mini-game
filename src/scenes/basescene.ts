import { GameState } from '../gamestate'

type NavigationState = {
    currentLevel: number,
    numberOfLevels: number
}

type CanvasDimension = {
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

    protected getGlobalState(): GameState {
        return this.registry.get("gamestate") as GameState;
    }

    protected setGlobalState(state: GameState): void {
        this.registry.set("gamestate", state);
    }

    protected getNavigationState(): NavigationState {
        let state = this.registry.get("navigationstate") as NavigationState;
        if (state === undefined) {
            state = { currentLevel: 0, numberOfLevels: 0 } as NavigationState;
        }
        return state;
    }

    protected setNavigationState(state: NavigationState): void {
        this.registry.set("navigationstate", state);
    }
}