import { GameProxy } from '../communication/gameproxy';
import { posix } from 'path';


export type IOpponent = {
    name: string,
    posX: number,
    posY: number
}

export class Engine  {

    private _connection: GameProxy;

    // dictioary for keeping track of opponents
    private readonly _opponents: { [Id: string]: IOpponent; } = {};

    // memory for filtering insignificant movements
    private _lastX: integer = 0;
    private _lastY: integer = 0;

    constructor(serverUrl: string, playerName: string) {
        this._connection = new GameProxy(serverUrl, playerName);
        this._connection.onUpdateOpponentPosition(this.onUpdateOpponentPosition.bind(this));
        this._connection.start();
    }

    public setPlayerPosition(x: number, y: number) {
        // filter out insignificant movement
        // compare on 1 decimal after separator only
        let xi = Math.trunc(x * 10.0) as integer;
        let yi = Math.trunc(y * 10.0) as integer;
        if (this._lastX == xi && this._lastY == yi) {
            return;
        }
        this._lastX = xi;
        this._lastY = yi;

        // report significant movement
        this._connection.updatePosition(x, y);
    }

    public getOpponents(): { [Id: string]: IOpponent; } {
        return this._opponents;
    }

    private onUpdateOpponentPosition(username: string, x: number, y: number): void {
        // Opponents and their positions are recorded for later use. 
        this._opponents[username] = { 
            name: username, 
            posX: x, 
            posY: y
        };
    }
}