using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc.RazorPages;
using Microsoft.Extensions.Logging;

namespace backend.Pages {
    public class AboutModel : PageModel {
        public string Message { get; set; }

        private readonly ILogger<AboutModel> _logger;

        public AboutModel(ILogger<AboutModel> logger) {
            _logger = logger;
        }

        public void OnGet() {
            Message = "There you go.";
        }
    }
}
