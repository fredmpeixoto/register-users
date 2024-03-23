using ManagerUsers.Domain.Entitys;
using ManagerUsers.Domain.Interfaces;
using ManagerUsers.Domain.Interfaces.Repository;
using ManagerUsers.Domain.ViewModel;
using System;
using System.Collections.Generic;
using System.Linq;

namespace ManagerUsers.Domain.Services
{
    public class UserService : IUserService
    {

        private readonly IUserRepository _userRepository;

        public UserService(IUserRepository userRepository)
        {
            _userRepository = userRepository;

        }
    
        public UserVM Add(UserVM entity)
        {
            try
            {
                var existe = _userRepository.GetByEmail(entity.Email);
                if (existe == null)
                {
                    var newUser = ConvertToDomain(new User(), entity);
                    return new UserVM(_userRepository.Create(newUser));
                }
                else
                {
                    throw new Exception("There is this user in database!");
                }
            }
            catch (Exception e)
            {
                throw e;
            }
        }

        public UserVM Update(string id, UserVM entity)
        {
            try
            {
                var userById = _userRepository.GetById(id);
                return new UserVM(_userRepository.Update(ConvertToDomain(userById, entity)));
            }
            catch (Exception e)
            {
                throw e;
            }
        }

        public UserVM Login(string email, string password)
        {
            try
            {
                User user = _userRepository.Login(email, password);

                if (user == null) return null;

                return new UserVM(user);
            }
            catch (Exception e)
            {

                throw e;
            }
        }

        public UserVM GetById(string id)
        {
            try
            {
                return new UserVM(_userRepository.GetById(id));
            }
            catch (Exception e)
            {
                throw e;
            }
        }

        public IEnumerable<UserVM> getAll()
        {
            try
            {
                return _userRepository.GetAll().Select(s => new UserVM(s));
            }
            catch (Exception)
            {
                throw;
            }
        }

        public bool Delete(string id)
        {
            try
            {
                return _userRepository.Delete(_userRepository.GetById(id));
            }
            catch (Exception e)
            {
                throw e;
            }
        }

        private User ConvertToDomain(User user, UserVM entity)
        {
            user.Cpf = entity.Cpf;
            user.Name = entity.Name;
            user.Email = entity.Email;
            user.Password = entity.Password;
            return user;
        }
    }
}
