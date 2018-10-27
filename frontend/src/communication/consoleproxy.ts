 import { AbstractConnection } from "./abstractconnection";

 /**
 * Typed proxy for ConsoleHub
 */
export class ConsoleProxy extends AbstractConnection {
    public requestStats() {
        this.sendMessage("RequestStats");
    }

    public onSetStats(callback: (stats: string) => void) {
        this.registerCallback("setStats", callback);
    }
}
