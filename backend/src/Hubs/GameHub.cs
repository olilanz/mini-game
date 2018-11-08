using Microsoft.AspNetCore.SignalR;
using System.Threading.Tasks;
using Backend.GameLogic;

public interface IGameHubClient {
        Task updateOpponentPosition(string user, double x, double y);
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
                () => System.Console.WriteLine($"GameHub: New user logged on: {playerName} ({Context.User.Identity.ToString()})")
            );
        }

        public Task UpdatePosition(double x, double y) {
            return Clients.Others.updateOpponentPosition(Context.ConnectionId, x, y);
        }
    }
}