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
    
    public struct EngineStats {
        public System.DateTime StatsTimeStampUtc; 
        public int PlayerCount;
        public int AdminCount;
        public long CPUTimeMs;
    }

    public class GameState {
        private static GameState _gameState;
        private Dictionary<string, Vector2> _players = new Dictionary<string, Vector2>();
        private int _adminCount;

        private GameState() {
        }

        public static GameState GetInstance() {
            if (_gameState == null) {
                _gameState = new GameState();
            }
            return _gameState;
        }

        public void RegisterClient(ClientType client, string id) {
            switch (client) {
                case ClientType.Player: {
                    _players.Add(id, new Vector2(0, 0));
                    break;
                }
                case ClientType.Administrator: {
                    _adminCount++;
                    break;
                }
            }
        }

        public void UnregisterClient(ClientType client, string id) {
            switch (client) {
                case ClientType.Player: {
                    _players.Remove(id);
                    break;
                }
                case ClientType.Administrator: {
                    _adminCount--;
                    break;
                }
            }
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