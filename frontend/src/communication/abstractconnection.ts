/**
 * Base class to deal with connection and callback management
 */

import * as signalR from "@aspnet/signalr";

export enum ConnectionState {
    stopped = 0,
    connecting = 1,
    connected = 2
}

export abstract class AbstractConnection {

    private readonly RECONNECT_TIMEOUT: integer = 3000;

    private readonly _url: string;
    private readonly _playerName: string;
    private _connection: signalR.HubConnection | null;

    private _connectionState: ConnectionState;

    private _callbacks: Map<string, (...args: any[]) => void>;

    constructor(url: string, playerName: string) {
        this._url = url;
        this._playerName = playerName;
        this._connection = null;
        this._connectionState = ConnectionState.stopped;
        this._callbacks = new Map<string, (...args: any[]) => void>();
    }

    /**
     * Causes the connection to be established and be kept alive. 
     * A connection loss will automatically be recovered.
     */
    public start() {
        console.log("Starting connection to hub: " + this._url);
        this.setState(ConnectionState.connecting);
        this._connection = new signalR.HubConnectionBuilder()
            .withUrl(this._url)
            .configureLogging(signalR.LogLevel.Debug)
            .build();
        this._connection.onclose(this.onDisconnect.bind(this));
        this.attachCallbacks();
        this.initiateConnection();
    }

    /**
     * Closes active connection and stops automatic reconnect loop.
     */
    public stop(): void {
        if (this._connection) {
            this._connection.stop();
            this.detachCallbacks();
            this._connection = null;
        }
        this.setState(ConnectionState.stopped);
    }

    /**
     * Returns state of connection.
     */
    public getConnectionState(): ConnectionState {
        return this._connectionState;
    }

    /**
     * Registers callbacks... obviously...
     */
    protected registerCallback(name: string, callback: (...args: any[]) => any) {
        this._callbacks.set(name, callback);
        if (this._connection) {
            this._connection.on(name, callback);
        }
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
                this.setState(ConnectionState.connected);
                this.sendMessage("UpdatePlayerDetails", this._playerName);
            })
            .catch(async error => {
                // re-schedule new attempt on failure
                console.log("Connection attempt failed: " + error.message);
                console.log("Retrying in " + (this.RECONNECT_TIMEOUT / 1000) + " seconds...");
                await new Promise(resolve => setTimeout(resolve, this.RECONNECT_TIMEOUT));
                await this.initiateConnection(attemptCounter + 1);
            });
    }

    /**
     * Handles the connection loss
     * @param error Error that caused the connection loss
     */
    private onDisconnect(error: Error | undefined): void {
        if (error) {
            console.log("Connection lost: " + error.name + " - " + error.message);
        } else {
            console.log("Connection lost: [undefined error]");
        }
        console.log("Attepting to reconnect...");
        this.setState(ConnectionState.connecting);
        this.initiateConnection();
    }

    /**
     * wires up the callbacks that were regustered in the deriving class.
     */
    private attachCallbacks() {
        if (this._connection === null) {
            return;
        }

        for (let callback of this._callbacks) {
            this._connection.on(callback["0"], callback["1"]);
        }
    }

    /**
     * wires up the callbacks that were regustered in the deriving class.
     */
    private detachCallbacks() {
        if (this._connection === null) {
            return;
        }

        for (let callback of this._callbacks) {
            this._connection.off(callback["0"], callback["1"]);
        }
    }

    /**
     * Generic dispatch function. It is expected that the deriving class
     * implements public, type safe wrapper fir this function.
     * @param methodName 
     * @param args 
     */
    protected sendMessage(methodName: string, ...args: any[]): boolean {
        if (!this._connection) {
            return false;
        }

        this._connection.send(methodName, ...args)

        return true;
    }

    private setState(state: ConnectionState) {
        this._connectionState = state;
        console.log("Changed connection state to: " + ConnectionState[state]);
    }
}
