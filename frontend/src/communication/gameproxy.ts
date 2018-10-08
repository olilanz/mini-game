/**
 * Typse safe communication interface
 */

import { AbstractConnection } from "./abstractconnection";

export class GameProxy extends AbstractConnection {
    constructor(url: string) {
        super(url);
        this.registerCallback("updateOpponentPosition", this.onUpdateOpponentPosition);
    }

    public updatePlayerDetails(playerName: string, teamName: string) {
        this.sendMessage("UpdatePlayerDetails", playerName, teamName);
    }

    public updatePosition(x: number, y: number) {
        this.sendMessage("UpdatePosition", x, y);
    }

    private onUpdateOpponentPosition(username: string, x: number, y: number) {
        console.log(`Incoming message from server: ${username} - ${x}/${y}`);
    }        
}