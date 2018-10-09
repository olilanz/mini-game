using Microsoft.AspNetCore.SignalR;
using System.Threading.Tasks;
using Backend.GameLogic;

public interface IConsoleHubClient {
        Task updateOpponentPosition(string user, double x, double y);
}

namespace Backend.Hubs {
    public class ConsoleHub : Hub<IConsoleHubClient> {

        private readonly GameState _game = GameState.GetInstance();
        
        public override Task OnConnectedAsync() {
            _game.RegisterClient(Context.ConnectionId);
            return base.OnConnectedAsync();
        }

        public override Task OnDisconnectedAsync(System.Exception exception) {
            _game.UnregisterClient(Context.ConnectionId);
            return base.OnDisconnectedAsync(exception);
        }

        public Task UpdatePlayerDetails(string playerName) {
            return Task.Run(
                () => System.Console.WriteLine($"New user logged on: {playerName} ({Context.User.Identity.ToString()})")
            );
        }
    }
}