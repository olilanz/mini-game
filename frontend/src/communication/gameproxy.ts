/**
 * Typse safe communication interface
 */

import { AbstractConnection } from "./abstractconnection";

export class GameProxy extends AbstractConnection {
    constructor(url: string, playerName: string) {
        super(url, playerName);
    }

    protected getCallbacks(): Map<string, (...args: any[]) => void> {
        // todo: attach the collbacks
        let callbacks = new Map<string, (...args: any[]) => void>();
        callbacks.set("updateOpponentPosition", this.onUpdateOpponentPosition);
        return callbacks;
    }

    public updatePosition(x: number, y: number) {
        this.sendMessage("UpdatePosition", x, y);
    }

    private onUpdateOpponentPosition(username: string, x: number, y: number) {
        console.log(`Incoming message from server: ${username} - ${x}/${y}`);
    }        
}