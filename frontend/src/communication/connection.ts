import * as signalR from "@aspnet/signalr";

export class Connection {
    // todo: no thread safe access!
    private _connection: signalR.HubConnection | undefined;

    constructor(url: string) {
        console.log("Initiating Server connection: " + url);
    }

    connect(): Promise<void> {
        let connection = new signalR.HubConnectionBuilder()
            .withUrl("/gamehub")
            .configureLogging(signalR.LogLevel.Debug)
            .build();

        this.attachEventHandlers(connection);

        // todo: error handling
        // detachEventHandlers(connection);
        let promise = connection.start().catch(err => console.log(err)).then(
            function () {
                console.log(`Sending message from server...`);
                connection.send("sendMessage", "Gagalarage", "This is a small message from the client...");
            }
        );
              
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
        connection.on("ReceiveMessage", (username: string, message: string) => {
            console.log(`Incoming message from server: ${username} - ${message}`);
        });   

        connection.onclose(this.disconnectHandler);
    }

    private detachEventHandlers(connection: signalR.HubConnection) {
        connection.on("ReceiveMessage", (username: string, message: string) => {
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
}
