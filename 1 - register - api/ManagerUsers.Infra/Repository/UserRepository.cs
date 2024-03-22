using ManagerUsers.Domain.Entitys;
using ManagerUsers.Domain.Interfaces.Repository;
using ManagerUsers.Infra.Data;
using System.Collections.Generic;
using System.Linq;

namespace ManagerUsers.Infra.Repository
{
    public class UserRepository : EFRepository<User>, IUserRepository
    {

        public UserRepository(UserContext userContext) : base(userContext)
        {

        }


        public User Login(string email, string password)
        {
            return (_dbContext.Set<User>().FirstOrDefault(f => f.Email == email && f.Password == password));         
        }

        public User GetByEmail(string email)
        {
            return (_dbContext.Set<User>().FirstOrDefault(f => f.Email.Trim() == email.Trim() ));
        }

        public User GetById(string id)
        {
            return _dbContext.Set<User>().FirstOrDefault(w => w.Id.ToString() == id);
        }


    }
}
