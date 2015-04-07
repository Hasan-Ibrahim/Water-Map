using System;
using System.Collections.Generic;
using System.Linq.Expressions;
using Data.Model;

namespace Data.Repositories.Abstraction
{
    public interface IRepository<TModel> : IDisposable where TModel : DbModel
    {
        TModel Find(int id);

        TModel Find(Expression<Func<TModel, bool>> query);

        bool Exists(Expression<Func<TModel, bool>> query);

        IEnumerable<TModel> GetAll();

        TModel Create(TModel item);
        bool Update(TModel updatedItem);
        bool SoftDelete(int id);
        bool HardDelete(TModel deletedItem);
        bool SaveChanges();
    }
}
