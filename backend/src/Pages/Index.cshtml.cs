using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.Mvc.RazorPages;

namespace backend.Pages {
    public class IndexModel : PageModel {
        public string Message { get; set; }

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
                "Swashbuckler",
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
                "Jim",
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
                "Derp"
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
                "Awesomew",
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
                "Crying"
            };
            string adjective = adjectives[new Random().Next(0, adjectives.Length)];

            return $"{adjective} {name}";
        }
    }
}
