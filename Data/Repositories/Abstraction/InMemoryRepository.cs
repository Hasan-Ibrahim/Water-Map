using Data.Model;
using FizzWare.NBuilder;
using System;
using System.Collections;
using System.Collections.Generic;
using System.Linq;
using System.Linq.Expressions;
using System.Threading.Tasks;

namespace Data.Repositories.Abstraction
{
    public class InMemoryRepository<TModel> : IRepository<TModel> where TModel : DbModel
    {
        private static int _sequence = 100000;
        private static IDictionary<Type, IDictionary> _database;
        static InMemoryRepository()
        {
            Setup(10, 100, 5);
        }

        public static void Setup(int usersCount, int productsCount, int categoriesCount)
        {
            _database = new Dictionary<Type, IDictionary>();

            var sequence = new SequentialGenerator<int>();
            sequence.StartingWith(1);
            sequence.Direction = GeneratorDirection.Ascending;
            sequence.Increment = 1;

            var users = Builder<DbUser>.CreateListOfSize(usersCount).All()
                .Do(product => product.IsDeleted = product.Id % 2 == 0)
                .Do(user => user.Id = sequence.Generate())
                .Do(user => user.LoginId = user.LoginId + "@gmail.com")
                .Do(user => user.HashedPassword = "202cb962ac59075b964b07152d234b70") // MD5 Hash for "123"
                .Build().ToDictionary(user => user.Id, user => user);
            sequence.StartingWith(1);

            _database[typeof(DbUser)] = users;
        }

        private readonly IDictionary<int, TModel> _collection;
        public InMemoryRepository()
        {
            _collection = (IDictionary<int, TModel>)_database[typeof(TModel)];
        }

        public TModel Find(int id)
        {
            var first = GetAll().FirstOrDefault(model => model.Id == id);
            return first;
        }

        public TModel Find(Expression<Func<TModel, bool>> query)
        {
            return GetAll().AsQueryable().FirstOrDefault(query);
        }

        public bool Exists(Expression<Func<TModel, bool>> query)
        {
            return GetAll().AsQueryable().Any(query);
        }

        public IEnumerable<TModel> GetAll()
        {
            var all = _collection.Values.OrderBy(model => model.Id);
            var result = all.Where(model => !model.IsDeleted);
            return result;
        }

        public TModel Create(TModel item)
        {
            var id = ++_sequence;
            item.Id = id;
            _collection.Add(id, item);
            return item;
        }

        public Task<long> Count()
        {
            return Task.FromResult(_collection.LongCount());
        }

        public bool Update(TModel updatedItem)
        {
            if (!_collection.ContainsKey(updatedItem.Id))
            {
                return false;
            }
            _collection[updatedItem.Id] = updatedItem;
            return true;
        }

        public bool SoftDelete(int id)
        {
            var itemToDelete = Find(id);
            if (itemToDelete == null)
            {
                return false;
            }

            itemToDelete.IsDeleted = true;
            return true;
        }

        public bool HardDelete(TModel deletedItem)
        {
            if (!_collection.ContainsKey(deletedItem.Id))
            {
                return false;
            }
            _collection.Remove(deletedItem.Id);
            return true;
        }

        public bool SaveChanges()
        {
            return true;
        }

        public void Dispose()
        {
        }
    }
}
