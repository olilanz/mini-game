export enum GlobalStateIdentifier {
    Engine = "engine",
    ExternalConfig = "extconfig",
    NavigationState = "navstate"
}
    
export type GameState = {
    currentLevel: number;
    nextLevel: number;
}

export type NavigationState = {
    currentLevel: number,
    numberOfLevels: number
}

