using ManagerUsers.Domain.Entitys;
using System.ComponentModel.DataAnnotations;

namespace ManagerUsers.Domain.ViewModel
{
    public class UserVM
    {
        public UserVM()
        {

        }
        public UserVM(User user)
        {
            Name = user.Name;
            Email = user.Email;
            Cpf = user.Cpf;
            Id = user.Id.ToString();
        }


        [Required(ErrorMessage = "Name {0} is required")]
        public string Name { get; set; }
        public string Email { get; set; }
        [MaxLength(11, ErrorMessage ="Tamanhp maximo é {1}")]
        public string Cpf { get; set; }

        [Required, MinLength(8, ErrorMessage ="Min caracter is {1}")]
        public string Password { get; set; }
        public string Id { get;  set; }
    }
}
