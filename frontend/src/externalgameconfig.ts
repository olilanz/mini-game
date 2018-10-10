export enum GameMode {
    normal = 0,
    server = 1
}
  
export type ExternalGameConfig = {
    playerName: string,
    gameMode: GameMode
}
  