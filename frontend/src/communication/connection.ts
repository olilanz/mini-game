import * as signalR from "@aspnet/signalr";

export class Connection {
    private _connect: signalR.HubConnection | undefined;

    constructor(url: string) {
        console.log("Initiating Server connection: " + url);
    }

    connect(): boolean {
        let connection = new signalR.HubConnectionBuilder()
            .withUrl("/gamehub")
            .build();

        connection.on("ReceiveMessage", (username: string, message: string) => {
            console.log(`Incoming message from server: ${username} - ${message}`);
        });   

        connection.start().catch(err => console.log(err)).then(
            function () {
                console.log(`Sending message from server...`);
                connection.send("sendMessage", "Gagalarage", "This is a small message from the client...");
            }
        );
              
        return false;
    }
}

