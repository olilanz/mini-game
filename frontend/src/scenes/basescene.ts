import { ExternalGameConfig } from "../externalgameconfig";
import { GlobalStateIdentifier, NavigationState } from "../gamestate";

import { Engine } from '../engine/engine';

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

    protected attachDefaultHandlers(): void {
        this.events.on('resize', this.onResize, this);
        this.events.on('shutdown', this.onShutdown, this);        
    }

    protected detachDefaultHandlers(): void {
        this.events.off('shutdown', this.onShutdown, this, false);
        this.events.off('resize', this.onResize, this, false);
    }

    protected onResize(width: number, height: number) {}

    protected onShutdown() {}

    protected getEngine(): Engine {
        return this.registry.get(GlobalStateIdentifier.Engine) as Engine;
    }

    protected getExternalGameConfig(): ExternalGameConfig {
        return this.registry.get(GlobalStateIdentifier.ExternalConfig) as ExternalGameConfig;
    }

    protected getNavigationState(): NavigationState {
        let state = this.registry.get(GlobalStateIdentifier.NavigationState) as NavigationState;
        if (state === undefined) {
            state = { currentLevel: 0, numberOfLevels: 0 } as NavigationState;
        }
        return state;
    }

    protected setNavigationState(state: NavigationState): void {
        this.registry.set(GlobalStateIdentifier.NavigationState, state);
    }

    protected addButton(name: string, image: string, callback: (pointer: Phaser.Input.Pointer) => void, context?: any): Phaser.GameObjects.Sprite {
        let button = this.add.sprite(0, 0, image)
            .setName(name)
            .setInteractive();
        button.on('pointerdown', callback, context);
        return button;
    }
}