 import { AbstractConnection } from "./abstractconnection";

export type EngineStats = {
    statsTimeStampUtc: number, 
    playerCount: number,
    adminCount: number,
    cpuTimeMs: number
}

 /**
 * Typed proxy for ConsoleHub
 */
export class ConsoleProxy extends AbstractConnection {
    public requestStats() {
        this.sendMessage("RequestStats");
    }

    public onSetStats(callback: (stats: EngineStats) => void) {
        this.registerCallback("setStats", callback);
    }
}
