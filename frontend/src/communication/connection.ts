import * as signalR from "@aspnet/signalr";

export class Connection {
    // todo: no thread safe access!
    private _url: string;
    private _connection: signalR.HubConnection | undefined;

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

    private attachEventHandlers(connection: signalR.HubConnection) {
        connection.on("JustInfo", (username: string, message: string) => {
            console.log(`Incoming message from server: ${username} - ${message}`);
        });   

        connection.onclose(this.disconnectHandler);
    }

    private detachEventHandlers(connection: signalR.HubConnection) {
        connection.on("JustInfo", (username: string, message: string) => {
            console.log(`Incoming message from server: ${username} - ${message}`);
        });   

        connection.onclose(this.disconnectHandler);
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

    public sendMessage(methodName: string, ...args: any[]): boolean {
        if (!this._connection) {
            return false;
        }

        this._connection.send(methodName, ...args)

        return true;
    }
}
