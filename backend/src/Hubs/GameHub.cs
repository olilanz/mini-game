using Microsoft.AspNetCore.SignalR;
using System.Threading.Tasks;
using Backend.GameLogic;
using System.Numerics;

public interface IGameHubClient {
        Task setGameConfig(int level, double x, double y);
        Task updateOpponentPosition(string user, double worldwidth, double worldheight);
}

namespace Backend.Hubs {
    public class GameHub : Hub<IGameHubClient> {

        private readonly GameState _game = GameState.GetInstance();
        
        public override Task OnConnectedAsync() {
            _game.RegisterClient(ClientType.Player, Context.ConnectionId);
            return base.OnConnectedAsync();
        }

        public override Task OnDisconnectedAsync(System.Exception exception) {
            _game.UnregisterClient(ClientType.Player, Context.ConnectionId);
            return base.OnDisconnectedAsync(exception);
        }

        public Task UpdatePlayerDetails(string playerName) {
            return Task.Run(
                () => {
                    _game.SetPlayerName(Context.ConnectionId, playerName);
                }
            );
        }

        Task RequestGameAdmission(int level) {
            double worldwidth = 4000; // [m]
            double worldheight = 1500; // [m]
            return Clients.Caller.setGameConfig(level, worldwidth, worldheight);
        }

        public Task UpdatePosition(double x, double y) {
            _game.SetPlayerPosition(Context.ConnectionId, new Vector2((float)x, (float)y));
            return Clients.Others.updateOpponentPosition(_game.GetPlayerName(Context.ConnectionId), x, y);
        }
    }
}