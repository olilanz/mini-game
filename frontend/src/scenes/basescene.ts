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
        // resize handler
        let fnResize = function (this: BaseScene, width: number, height: number) {
            this.onResize(width, height);
        }
        this.events.on('resize', fnResize, this);

        // remove all handlers, otherwise they still trigger
        this.events.on('shutdown', function (this: BaseScene) {
            this.events.off('resize', fnResize, this, false);
            this.onShutdown();
        }, this);        
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

    protected addButton(name: string, image: string, callback: () => void, context?: any): Phaser.GameObjects.Sprite {
        let button = this.add.sprite(0, 0, image)
            .setName(name)
            .setInteractive();
        button.on('pointerdown', callback, context);
        return button;
    }
}