using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.Mvc.RazorPages;
using Microsoft.Extensions.Logging;

namespace Backend.Pages {
    public class ServerModel : PageModel {
        private readonly ILogger<ServerModel> _logger;

        public ServerModel(ILogger<ServerModel> logger) {
            _logger = logger;
        }

        public void OnGet() {
        }
    }
}
