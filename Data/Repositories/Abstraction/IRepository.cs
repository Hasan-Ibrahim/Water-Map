using System;
using System.Collections.Generic;
using System.Linq.Expressions;
using System.Threading.Tasks;
using Data.Model;

namespace Data.Repositories.Abstraction
{
    public interface IRepository<TModel> : IDisposable where TModel : DbModel
    {
        Task<TModel> Find(int id);

        Task<TModel> Find(Expression<Func<TModel, bool>> query);

        Task<bool> Exists(Expression<Func<TModel, bool>> query);

        Task<IEnumerable<TModel>> GetAll();
        TModel Create(TModel item);
        bool Update(TModel updatedItem);
        bool SoftDelete(int id);
        bool HardDelete(TModel deletedItem);
        bool SaveChanges();
    }
}
