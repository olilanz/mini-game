using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc.RazorPages;

namespace backend.Pages
{
    public class ServerModel : PageModel
    {
        public string Message { get; set; }

        public void OnGet()
        {
            Message = "Your server page.";
        }
    }
}
