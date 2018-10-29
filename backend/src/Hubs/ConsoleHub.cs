using Microsoft.AspNetCore.SignalR;
using System.Threading.Tasks;
using Backend.GameLogic;

public interface IConsoleHubClient {
        Task setStats(string stats);
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
                () => System.Console.WriteLine($"ConsoleHub: New user logged on: {playerName} ({Context.User.Identity.ToString()})")
            );
        }

        public Task RequestStats() {
            string ts = System.DateTime.UtcNow.ToLongTimeString();
            string stats = "Server CPU time: " + System.Diagnostics.Process.GetCurrentProcess().TotalProcessorTime.Milliseconds.ToString() + "ms";
            return Clients.Caller.setStats($"{ts}: {stats}");
        }
    }
}