import { AbstractConnection } from "./abstractconnection";

/**
 * Typed proxy for GameHub
 */
export class GameProxy extends AbstractConnection {
    public updatePosition(x: number, y: number) {
        this.sendMessage("UpdatePosition", x, y);
    }

    public onUpdateOpponentPosition(callback: (username: string, x: number, y: number) => void) {
        this.registerCallback("updateOpponentPosition", callback);
    }        
}