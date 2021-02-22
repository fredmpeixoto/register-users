using ManagerUsers.Domain.Entitys;
using System;
using System.Collections.Generic;
using System.Text;

namespace ManagerUsers.Domain.Interfaces.Repository
{
    public interface IUserRepository : IRepository<User>
    {
        User GetById(string id);
        User Login(string email,string password);
        User GetByEmail(string email);

    }
}
