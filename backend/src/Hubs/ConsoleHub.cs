using Microsoft.AspNetCore.SignalR;
using System.Threading.Tasks;
using Backend.GameLogic;

namespace Backend.Hubs {
    public interface IConsoleHubClient {
        Task setStats(EngineStats stats);
    }

    public class ConsoleHub : Hub<IConsoleHubClient> {

        private readonly GameState _game = GameState.GetInstance();

        public override async Task OnConnectedAsync() {
            _game.RegisterClient(ClientType.Administrator, Context.ConnectionId);
            await base.OnConnectedAsync();
        }

        public override async Task OnDisconnectedAsync(System.Exception exception) {
            _game.UnregisterClient(ClientType.Administrator, Context.ConnectionId);
            await base.OnDisconnectedAsync(exception);
        }

        public async Task UpdatePlayerDetails(string playerName) {
            await Task.Run(
                () => System.Console.WriteLine($"ConsoleHub: New user logged on: {playerName} ({Context.User.Identity.ToString()})")
            );
        }

        public async Task RequestStats() {
            await Clients.Caller.setStats(_game.GetStats());
        }
    }
}