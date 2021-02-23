using ManagerUsers.Domain.Entitys;
using ManagerUsers.Domain.ViewModel;
using System.Collections.Generic;

namespace ManagerUsers.Domain.Interfaces
{
    public interface IUserService
    {
        UserVM Add(UserVM entity);
        UserVM Update(string id, UserVM entity);
        bool Delete(string id);
        IEnumerable<UserVM> getAll();
        UserVM GetById(string id);
        UserVM Login(string email, string password);
    }
}
