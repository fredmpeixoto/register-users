using System.Collections.Generic;

namespace ManagerUsers.Domain.Interfaces.Repository
{
    public interface IRepository<TEntity> where TEntity : class
    {
        TEntity Create(TEntity entity);
        TEntity Update(TEntity entity);
        bool Delete(TEntity entity);
        IEnumerable<TEntity> GetAll();
    }
}
