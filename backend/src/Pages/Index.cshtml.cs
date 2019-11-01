using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.Mvc.RazorPages;
using Microsoft.Extensions.Logging;

namespace backend.Pages {
    public class IndexModel : PageModel {
        private readonly ILogger<IndexModel> _logger;

        public string Message { get; set; }

        public IndexModel(ILogger<IndexModel> logger) {
            _logger = logger;
        }

        public void OnGet() {
            Message = "Login.";
        }

        public string GetRandomPlayerName() {
            string[] names = {
                "Pete",
                "Prince",
                "Luke",
                "Noah",
                "Johnson",
                "Kid",
                "Fish",
                "Hank",
                "Kitkat",
                "Brian",
                "Elvis",
                "Salad",
                "Pumpkin",
                "Viking",
                "Bob",
                "Zombie",
                "Mustache",
                "Snoopy",
                "Rumplestiltskin",
                "Pork Chop",
                "Chef",
                "Spiderpig",
                "Chewbacca",
                "Flanders",
                "Hulk",
                "Goonie",
                "Wonka",
                "Taco",
                "Derp",
                "Jimmy",
                "Bruce",
                "Beaver"
            };
            string name = names[new Random().Next(0, names.Length)];

            string[] adjectives = {
                "Jolly",
                "Ugly",
                "Greedy",
                "Filthy",
                "Smelly",
                "Stingy",
                "Smart",
                "Exotic",
                "Humpy",
                "Hunky",
                "Looney",
                "Spunky",
                "Sparkly",
                "Funny",
                "Awesome",
                "Smirky",
                "Falling",
                "Rolling",
                "Wreck-it",
                "Crunchy",
                "Happy",
                "Tiny",
                "Dangerous",
                "Powerful",
                "Deliscious",
                "Scary",
                "Angry",
                "Famous",
                "Hungry",
                "Excited",
                "Bored",
                "Invincible",
                "Mighty",
                "Dramatic",
                "Impossible",
                "Crying",
                "Sneezy"
            };
            string adjective = adjectives[new Random().Next(0, adjectives.Length)];

            return $"{adjective} {name}";
        }
    }
}
