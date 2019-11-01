using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.Mvc.RazorPages;
using Microsoft.Extensions.Logging;


namespace backend.Pages {
    public class GameModel : PageModel {
        public string Message { get; set; }

        private readonly ILogger<IndexModel> _logger;

        public GameModel(ILogger<IndexModel> logger) {
            _logger = logger;
        }

        public void OnGet() {
            Message = "Embedded game.";
        }
    }
}
