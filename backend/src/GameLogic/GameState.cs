/**
Singleton instance of the actual game implementation
 */

using System.Numerics;
using System.Collections.Generic;

public enum ClientType {
    Player = 0,
    Administrator = 1
}


namespace Backend.GameLogic {
    
    public struct Player {
        public string Name;
        public Vector2 Position;
    }

    public struct EngineStats {
        public System.DateTime StatsTimeStampUtc; 
        public int PlayerCount;
        public int AdminCount;
        public long CPUTimeMs;
    }

    public class GameState {
        private static GameState _gameState;
        private Dictionary<string, Player> _players = new Dictionary<string, Player>();
        private int _adminCount;

        private GameState() {
        }

        public static GameState GetInstance() {
            if (_gameState == null) {
                _gameState = new GameState();
            }
            return _gameState;
        }

        public void RegisterClient(ClientType client, string playerId) {
            switch (client) {
                case ClientType.Player: {
                    _players.Add(playerId, new Player {
                        Name = "playerId",
                        Position = new Vector2(0, 0)
                    });
                    break;
                }
                case ClientType.Administrator: {
                    _adminCount++;
                    break;
                }
            }
        }

        public void UnregisterClient(ClientType client, string playerId) {
            switch (client) {
                case ClientType.Player: {
                    _players.Remove(playerId);
                    break;
                }
                case ClientType.Administrator: {
                    _adminCount--;
                    break;
                }
            }
        }

        public void SetPlayerName(string playerId, string name) {
            var player = _players[playerId];
            player.Name = name;
            _players[playerId] = player;
        }

        public string GetPlayerName(string playerId) {
            return _players[playerId].Name;
        }

        public void SetPlayerPosition(string playerId, Vector2 position) {
            var player = _players[playerId];
            player.Position = position;
            _players[playerId] = player;
        }

        public EngineStats GetStats() {
            var stats = new EngineStats() {
                StatsTimeStampUtc = System.DateTime.UtcNow,
                PlayerCount = _players.Count,
                AdminCount = _adminCount,
                CPUTimeMs = System.Diagnostics.Process.GetCurrentProcess().TotalProcessorTime.Milliseconds
            };
            return stats;
        }
    }
}