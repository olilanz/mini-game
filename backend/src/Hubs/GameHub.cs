using Microsoft.AspNetCore.SignalR;
using System.Threading.Tasks;
using Backend.GameLogic;

public interface IGameHubClient {
        Task JustInfo(string user, string message);
}

namespace Backend.Hubs {
    public class GameHub : Hub<IGameHubClient> {

        private readonly GameState _game = GameState.GetInstance();
        
        public override Task OnConnectedAsync() {
            _game.RegisterClient(Context.ConnectionId);
            return base.OnConnectedAsync();
        }

        public override Task OnDisconnectedAsync(System.Exception exception) {
            _game.UnregisterClient(Context.ConnectionId);
            return base.OnDisconnectedAsync(exception);
        }

        public Task UpdatePosition(double x, double y) {
            System.Console.WriteLine($"Incoming position update: {x} / {y}");

            System.Console.WriteLine($"Sending message back: {x} - {y}");
            return Clients.All.JustInfo("Peter Piper", "Eats a peg of pickled pepper.");
        }
    }
}