using Microsoft.AspNetCore.SignalR;
using System.Threading.Tasks;
using Backend.GameLogic;

namespace Backend {
    public class GameHub : Hub {

        private readonly GameState _game = GameState.GetInstance();
        
        public override Task OnConnectedAsync() {
            _game.RegisterClient(Context.ConnectionId);
            return base.OnConnectedAsync();
        }

        public override Task OnDisconnectedAsync(System.Exception exception) {
            _game.UnregisterClient(Context.ConnectionId);
            return base.OnDisconnectedAsync(exception);
        }

        public async Task UpdatePosition(string user, string message) {
            System.Console.WriteLine($"Incoming position update: {user} - {message}");

            System.Console.WriteLine($"Sending message back: {user} - {message}");
            await Clients.All.SendAsync("JustInfo", "Peter Piper", "Eats a peg of pickled pepper.");
        }
    }
}