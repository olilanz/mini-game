/**
 * Base class to deal with connection and callback management
 */

import * as signalR from "@aspnet/signalr";
import { Pause } from "@app/screens/pause";
import { connect } from "http2";

export enum ConnectionState {
    stopped = 0,
    connecting = 1,
    connected = 2
}

export abstract class AbstractConnection {

    private readonly _url: string;
    private readonly _playerName: string;
    private _connection: signalR.HubConnection | null;

    constructor(url: string, playerName: string) {
        this._url = url;
        this._playerName = playerName;
        this._connection = null;
    }

    public start() {
        console.log("Starting connection to hub: " + this._url);
        this._connection = new signalR.HubConnectionBuilder()
            .withUrl(this._url)
            .configureLogging(signalR.LogLevel.Debug)
            .build();
        this._connection.onclose(this.onDisconnect.bind(this));
        this.attachCallbacks();
        this.initiateConnection();
    }

    public stop(): void {
        if (this._connection) {
            this._connection.stop();
            this._connection = null;
        }
    }

    public getConnectionState(): ConnectionState {
        // this._connection is always null if it stopped
        let state = ConnectionState.stopped;

        if (this._connection) {
            // if there is a connction object, the connection is not stopped.
            // in that case, conclude on the connection object's state
            if (this._connection.state == signalR.HubConnectionState.Connected) {
                state = ConnectionState.connected;
            } else {
                state = ConnectionState.connecting;
            }
        }

        return state;
    }

    protected getCallbacks(): Map<string, (...args: any[]) => void> {
        return new Map<string, (...args: any[]) => void>();
    }

    /**
     * Attempts to connect. Retries indefinitely on failure.
     * @param attemptCounter Indicates the number of attempts that have taken place. 
     */
    private async initiateConnection(attemptCounter: number = 1): Promise<void> {
        // check if connection attempt is needed
        if (!this._connection) {
            console.log("Terminating connection loop. Connection has been stopped.");
            return; 
        } else if (this._connection.state == signalR.HubConnectionState.Connected) {
            console.log("Terminating connection loop. The connection is seccessfully established.");
            return;
        }

        // attempt connction
        await this._connection.start()
            .then(() => {
                this.updatePlayerDetails(this._playerName)
            })
            .catch(async error => {
                // re-schedule new attempt on failure
                console.log("Connection attempt failed: " + error.message);
                console.log("Retrying in a few seconds...");
                await new Promise(resolve => setTimeout(resolve, 3000));
                console.log("Retrying in a few seconds...");
                await this.initiateConnection(attemptCounter + 1);
            });
    }

    private onDisconnect(error: Error | undefined): void {
        if (error) {
            console.log("Connection lost: " + error.name + " - " + error.message);
        } else {
            console.log("Connection lost: [undefined error]");
        }
        console.log("Attepting to reconnect...");
        this.initiateConnection();
    }

    private updatePlayerDetails(playerName: string) {
        this.sendMessage("UpdatePlayerDetails", playerName);
    }

    private attachCallbacks() {
        if (this._connection === null) {
            return;
        }

        for (let callback of this.getCallbacks()) {
            this._connection.on(callback["0"], callback["1"]);
        }
    }

    protected sendMessage(methodName: string, ...args: any[]): boolean {
        if (!this._connection) {
            return false;
        }

        this._connection.send(methodName, ...args)

        return true;
    }
}
