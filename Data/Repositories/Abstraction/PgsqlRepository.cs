using System.Data.Entity;
using System.Linq.Expressions;
using System.Threading.Tasks;
using Data.Model;
using System;
using System.Collections.Generic;
using System.Linq;

namespace Data.Repositories.Abstraction
{
    public class PgsqlRepository<TModel>: IRepository<TModel> where TModel : DbModel
    {
        private readonly DbContext _db;

        public PgsqlRepository(DbContext db)
        {
            _db = db;
        }

        public async Task<TModel> Find(int id)
        {
            return await _db.Set<TModel>().FindAsync(id);
        }

        public async Task<TModel> Find(Expression<Func<TModel, bool>> query)
        {
            return await _db.Set<TModel>().FirstOrDefaultAsync(query);
        }

        public async Task<bool> Exists(Expression<Func<TModel, bool>> query)
        {
            return await _db.Set<TModel>().AnyAsync(query);
        }

        public async Task<IEnumerable<TModel>> GetAll()
        {
            return await _db.Set<TModel>().Where(m => m.IsDeleted == false).ToListAsync();
        }

        public TModel Create(TModel item)
        {
            _db.Entry(item).State = EntityState.Added;
            return item;
        }
        
        public bool Update(TModel updatedItem)
        {
            _db.Entry(updatedItem).State = EntityState.Modified;
            return true;
        }

        public bool SoftDelete(int id)
        {
            var itemTask = Find(id);
            if (itemTask.IsCompleted && itemTask.Result != null)
            {
                itemTask.Result.IsDeleted = true;
                Update(itemTask.Result);
                return true;
            }
            return false;
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
            try
            {
                if (_db.ChangeTracker.HasChanges())
                {
                    _db.SaveChanges();
                    return true;
                }
            }
            catch
            {
            }
            
            return false;
        }
    }
}
