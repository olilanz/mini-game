using Microsoft.AspNetCore.SignalR;
using System.Threading.Tasks;

namespace Backend {
    public class GameHub : Hub {
        public async Task SendMessage(string user, string message) {
            System.Console.WriteLine($"Incoming SendMessage: {user} - {message}");

            System.Console.WriteLine($"Sending SendMessage: {user} - {message}");
            await Clients.All.SendAsync("ReceiveMessage", "Peter Piper", "Eats a peg of pickled pepper.");
        }
    }
}