using System.Data.Entity;
using System.Linq.Expressions;
using System;
using System.Linq;
using Data.Model.Base;

namespace Data.Repositories.Abstraction
{
    public class DbContextRepository<TModel> : IRepository<TModel> where TModel : DbModel
    {
        private readonly DbContext _db;

        public DbContextRepository(DbContext db)
        {
            _db = db;
        }

        public TModel Find(int id)
        {
            return _db.Set<TModel>().Find(id);
        }

        public TModel Find(Expression<Func<TModel, bool>> query)
        {
            return _db.Set<TModel>().FirstOrDefault(query);
        }

        public bool Exists(Expression<Func<TModel, bool>> query)
        {
            return _db.Set<TModel>().Any(query);
        }

        public IQueryable<TModel> GetAll()
        {
            return _db.Set<TModel>().Where(m => m.IsDeleted == false);
        }

        public IQueryable<TModel> Where(Expression<Func<TModel, bool>> query)
        {
            return GetAll().Where(query);
        }

        public TModel Create(TModel item)
        {
            _db.Entry(item).State = EntityState.Added;
            return item;
        }

        public bool Update(TModel updatedItem)
        {
            updatedItem.LastUpdateTime = DateTime.UtcNow;
            _db.Entry(updatedItem).State = EntityState.Modified;
            return true;
        }

        public bool SoftDelete(TModel deletedItem)
        {
            deletedItem.IsDeleted = true;
            Update(deletedItem);
            return true;
        }

        public bool HardDelete(TModel deletedItem)
        {
            _db.Entry(deletedItem).State = EntityState.Deleted;
            return true;
        }

        public void Dispose()
        {
            SaveChanges();
            _db.Dispose();
        }

        public bool SaveChanges()
        {
            if (_db.ChangeTracker.HasChanges())
            {
                _db.SaveChanges();
                return true;
            }

            return false;
        }
    }
}
