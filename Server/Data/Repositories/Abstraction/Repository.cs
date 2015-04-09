using System;
using System.Linq;
using System.Linq.Expressions;
using Data.Model.Base;

namespace Data.Repositories.Abstraction
{
    public class Repository<TModel> : IRepository<TModel> where TModel : DbModel
    {
        private readonly IRepository<TModel> _inneRepository;

        public Repository(IRepository<TModel> inneRepository)
        {
            _inneRepository = inneRepository;
        }

        public TModel Find(int id)
        {
            return _inneRepository.Find(id);
        }

        public TModel Find(Expression<Func<TModel, bool>> query)
        {
            return _inneRepository.Find(query);
        }

        public bool Exists(Expression<Func<TModel, bool>> query)
        {
            return _inneRepository.Exists(query);
        }

        public IQueryable<TModel> GetAll()
        {
            return _inneRepository.GetAll();
        }

        public IQueryable<TModel> Where(Expression<Func<TModel, bool>> query)
        {
            return _inneRepository.Where(query);
        }

        public TModel Create(TModel item)
        {
           return _inneRepository.Create(item);
        }
        
        public bool Update(TModel updatedItem)
        {
            return _inneRepository.Update(updatedItem);
        }

        public bool SoftDelete(int id)
        {
            var deletedItem = _inneRepository.Find(id);
            if (deletedItem == null)
            {
                return false;
            }
            return SoftDelete(deletedItem);
        }

        public bool SoftDelete(TModel deletedItem)
        {
            return _inneRepository.SoftDelete(deletedItem);
        }

        public bool HardDelete(TModel deletedItem)
        {
            return _inneRepository.HardDelete(deletedItem);
        }

        public bool SaveChanges()
        {
            return _inneRepository.SaveChanges();
        }

        public void Dispose()
        {
            _inneRepository.Dispose();
        }
    }
}
