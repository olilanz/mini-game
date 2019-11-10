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

        public override async Task OnConnectedAsync() {
            _game.RegisterClient(ClientType.Player, Context.ConnectionId);
            await base.OnConnectedAsync();
        }

        public override async Task OnDisconnectedAsync(System.Exception exception) {
            _game.UnregisterClient(ClientType.Player, Context.ConnectionId);
            await base.OnDisconnectedAsync(exception);
        }

        public async Task UpdatePlayerDetails(string playerName) {
            await Task.Run(
                () => {
                    _game.SetPlayerName(Context.ConnectionId, playerName);
                }
            );
        }

        public async Task RequestGameAdmission(int level) {
            double worldwidth = 4000; // [m]
            double worldheight = 1500; // [m]
            await Clients.Caller.setGameConfig(level, worldwidth, worldheight);
        }

        public async Task UpdatePosition(double x, double y) {
            _game.SetPlayerPosition(Context.ConnectionId, new Vector2((float)x, (float)y));
            await Clients.Others.updateOpponentPosition(_game.GetPlayerName(Context.ConnectionId), x, y);
        }
    }
}