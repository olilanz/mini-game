/**
 * Connection class
 * 
 * Manages the connection to the backend
 */

import { HubConnection } from "@aspnet/signalr";
import { HubConnectionBuilder } from "@aspnet/signalr";

export class BackendConnection {
    private _cnn: HubConnection;

    constructor(path: string) {
        this._cnn = new HubConnectionBuilder().withUrl(path).build();
    }
    
    SendMessage(user: string, message: string): void { 
        // todo
    }
    
    ReceiveMessage(user: string, message: string): void { 
        // todo
    }
}

/*
var connection = new signalR.HubConnectionBuilder().withUrl("/chatHub").build();

connection.on("ReceiveMessage", function (user, message) {
    var msg = message.replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;");
    var encodedMsg = user + " says " + msg;
    var li = document.createElement("li");
    li.textContent = encodedMsg;
    document.getElementById("messagesList").appendChild(li);
});

connection.start().catch(function (err) {
    return console.error(err.toString());
});

document.getElementById("sendButton").addEventListener("click", function (event) {
    var user = document.getElementById("userInput").value;
    var message = document.getElementById("messageInput").value;
    connection.invoke("SendMessage", user, message).catch(function (err) {
        return console.error(err.toString());
    });
    event.preventDefault();
});
*/