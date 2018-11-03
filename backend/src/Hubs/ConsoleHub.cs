using Microsoft.AspNetCore.SignalR;
using System.Threading.Tasks;
using Backend.GameLogic;

public interface IConsoleHubClient {
        Task setStats(EngineStats stats);
}

namespace Backend.Hubs {
    public class ConsoleHub : Hub<IConsoleHubClient> {

        private readonly GameState _game = GameState.GetInstance();
        
        public override Task OnConnectedAsync() {
            _game.RegisterClient(ClientType.Administrator, Context.ConnectionId);
            return base.OnConnectedAsync();
        }

        public override Task OnDisconnectedAsync(System.Exception exception) {
            _game.UnregisterClient(ClientType.Administrator, Context.ConnectionId);
            return base.OnDisconnectedAsync(exception);
        }

        public Task UpdatePlayerDetails(string playerName) {
            return Task.Run(
                () => System.Console.WriteLine($"ConsoleHub: New user logged on: {playerName} ({Context.User.Identity.ToString()})")
            );
        }

        public Task RequestStats() {
            return Clients.Caller.setStats(_game.GetStats());
        }
    }
}