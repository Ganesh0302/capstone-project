using Microsoft.AspNetCore.Mvc;

namespace LearnLink.Controllers
{
   
    public class AccountController : ControllerBase
    {
        

        [HttpPost("login")]
        public async Task<IActionResult> Login([FromBody] LoginRequestModel request)
        {
            // Function logic here
        }

        [HttpPost("RegisterUser")]
        public async Task<IActionResult> RegisterUser([FromBody] User request)
        {
            // Function logic here
        }

        [HttpGet("UsersByRole/{Role}")]
        public async Task<IActionResult> UsersByRole(string Role)
        {
            // Function logic here
        }

       
    }
}
