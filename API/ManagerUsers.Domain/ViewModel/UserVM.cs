﻿using ManagerUsers.Domain.Entitys;
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
            Address = user.Address;
            Age = user.Age;
            Id = user.Id.ToString();
        }


        [Required(ErrorMessage = "Name {0} is required")]
        public string Name { get; set; }
        public string Email { get; set; }
        [MaxLength(11, ErrorMessage ="Max length is {1}")]
        public string Cpf { get; set; }

        [Required, MinLength(8, ErrorMessage ="Min caracter is {1}")]
        public string Password { get; set; }

        [Required(ErrorMessage = "Age is required")]
        public int Age { get; set; }

        [MaxLength(50, ErrorMessage ="Address length is {1}")]
        public string Address { get; set; }
        public string Id { get;  set; }
    }
}