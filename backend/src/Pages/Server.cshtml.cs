using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.Mvc.RazorPages;
using Microsoft.Extensions.Logging;

namespace backend.Pages {
    public class ServerModel : PageModel {
        public string Message { get; set; }

        private readonly ILogger<ServerModel> _logger;

        public ServerModel(ILogger<ServerModel> logger) {
            _logger = logger;
        }

        public void OnGet() {
            Message = "Server internal workings.";
        }
    }
}
