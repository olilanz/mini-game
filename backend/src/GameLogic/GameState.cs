/**
Singleton instance of the actual game implementation
 */

using System.Numerics;
using System.Collections.Generic;

namespace Backend.GameLogic {
    
    public struct EngineStats {
        public System.DateTime StatsTimeStampUtc; 
        public int PlayerCount;
        public long CPUTimeMs;
    }

    public class GameState {
        private static GameState _gameState;
        private Dictionary<string, Vector2> _clients = new Dictionary<string, Vector2>();

        private GameState() {
        }

        public static GameState GetInstance() {
            if (_gameState == null) {
                _gameState = new GameState();
            }
            return _gameState;
        }

        public void RegisterClient(string id) {
            _clients.Add(id, new Vector2(0, 0));
        }

        public void UnregisterClient(string id) {
            _clients.Remove(id);
        }

        public EngineStats GetStats() {
            var stats = new EngineStats() {
                StatsTimeStampUtc = System.DateTime.UtcNow,
                PlayerCount = _clients.Count,
                CPUTimeMs = System.Diagnostics.Process.GetCurrentProcess().TotalProcessorTime.Milliseconds
            };
            return stats;
        }
    }
}