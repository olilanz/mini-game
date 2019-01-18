import { AbstractConnection } from "./abstractconnection";

/**
 * Typed proxy for GameHub
 */
export class GameProxy extends AbstractConnection {
    public requestGameAdmission(level: integer) {
        this.sendMessage("RequestGameAdmission", level);
    }

    public updatePosition(x: number, y: number) {
        this.sendMessage("UpdatePosition", x, y);
    }

    public onSetGameConfig(callback: (level: integer, worldwidth: number, worldheight: number) => void) {
        this.registerCallback("setGameConfig", callback);
    }        

    public onUpdateOpponentPosition(callback: (username: string, x: number, y: number) => void) {
        this.registerCallback("updateOpponentPosition", callback);
    }        
}