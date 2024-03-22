using ManagerUsers.Domain.Entitys;
using System.ComponentModel.DataAnnotations;

namespace ManagerUsers.Domain.ViewModel
{
    public class UserLoginVM
    {
        public UserLoginVM()
        {

        }

        public string Email { get; set; }
        public string Password { get; set; }
    }
}
