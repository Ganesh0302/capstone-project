using Microsoft.EntityFrameworkCore;
using NetBankAPI.Models;
using PatientCarePortal.Models;

namespace EduLink.Repository
{
    public class UserRepository: IUserRepository
    {
        //complete the code
        }
        public async Task<User> AuthenticateAsync(string username, string password)
        {
            //complete the code
        }
        public async Task CreateUser(User user)
        {
           //complete the code
        }
        public async Task<IEnumerable<User>> UsersByRole(string Role)
        {
         //complete the code
        }
    }
}
