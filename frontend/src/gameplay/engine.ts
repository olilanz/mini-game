import { GameProxy } from '../communication/gameproxy';

export class Engine  {

    private _connection: GameProxy;

    private _lastX: integer = 0;
    private _lastY: integer = 0;

    constructor(serverUrl: string, playerName: string, teamName: string) {
        this._connection = new GameProxy(serverUrl);
        this._connection.connect().then(
            () => {
                this._connection.updatePlayerDetails(playerName, teamName);
            }
        )
    }

    public setMonsterPosition(x: number, y: number) {
        // compare on 1 decimal after separator only
        let xi = Math.trunc(x * 10.0) as integer;
        let yi = Math.trunc(y * 10.0) as integer;

        if (this._lastX == xi && this._lastY == yi) {
            return;
        }
        this._connection.updatePosition(x, y);
        this._lastX = xi;
        this._lastY = yi;
    }
}