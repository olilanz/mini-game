import * as signalR from "@aspnet/signalr";

export abstract class AbstractConnection {
    // todo: no thread safe access!
    private _url: string;
    private _connection: signalR.HubConnection | undefined;

    private _callbacks = new Map<string, (...args: any[]) => void>();

    constructor(url: string) {
        this._url = url;
        console.log("Preparing connection: " + url);
    }

    connect(): Promise<void> {
        console.log("Connecting connection: " + this._url);
        let connection = new signalR.HubConnectionBuilder()
            .withUrl(this._url)
            .configureLogging(signalR.LogLevel.Debug)
            .build();

        this.attachEventHandlers(connection);
        connection.onclose(this.disconnectHandler);

        // todo: error handling
        // detachEventHandlers(connection);
        let promise = connection.start().catch(err => console.log(err));
              
        // todo: only if all went well
        this._connection = connection;

        return promise;
    }

    disconnect(): void {
        if (this._connection) {
            this._connection.stop();
        }
    }

    protected registerCallback(methodName: string, method: (...args: any[]) => void): void {
        this._callbacks.set(methodName, method);
    }

    private attachEventHandlers(connection: signalR.HubConnection) {
        for (let callback of this._callbacks) {
            connection.on(callback["0"], callback["1"]);
        }
    }

    private detachEventHandlers(connection: signalR.HubConnection) {
        for (let callback of this._callbacks) {
            connection.off(callback["0"], callback["1"]);
        }
    }

    private disconnectHandler(error: Error | undefined): void {
        if (error) {
            console.log("Connection lost: " + error.name + " - " + error.message);
        } else {
            console.log("Connection lost: [undefined error]");
        }
        if (this._connection) {
            this.detachEventHandlers(this._connection);
        }
        this._connection = undefined;
    }

    protected sendMessage(methodName: string, ...args: any[]): boolean {
        if (!this._connection) {
            return false;
        }

        this._connection.send(methodName, ...args)

        return true;
    }
}
