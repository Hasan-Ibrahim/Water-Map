using System.Data.Entity;
using System.Linq;
using System.Threading.Tasks;
using System;
using Data.Model;

namespace Data.TokenStorages
{
    public class PgsqlTokenStorage : ITokenStorage
    {
        private readonly DbContext _db;

        public PgsqlTokenStorage(DbContext authTokenDbContext)
        {
            _db = authTokenDbContext;
        }
        
        public string CreateToken(int userId)
        {
            var user = _db.Set<DbUserToken>().FirstOrDefault(tokenUser => tokenUser.UserId == userId);
            var token = Guid.NewGuid().ToString().Replace("-", "");
            if (user != null)
            {
                user.Token = token;
                _db.Entry(user).State = EntityState.Modified;
            }
            else
            {
                var tokenUser = _db.Set<DbUserToken>().Create();
                tokenUser.UserId = userId;
                tokenUser.Token = token;
                _db.Entry(tokenUser).State = EntityState.Added;
            }
            return token;
        }

        public async Task<bool> TokenExists(string token)
        {
            return await _db.Set<DbUserToken>().AnyAsync(tu => tu.Token == token);
        }

        public int GetUserId(string token)
        {
            var userTokenTask = _db.Set<DbUserToken>().FirstOrDefault(tu => tu.Token == token);
            return userTokenTask == null ? 0 : userTokenTask.UserId;
        }

        public bool DeleteToken(string token)
        {
            if (token != null)
            {
                var itemToDelete = _db.Set<DbUserToken>().FirstOrDefault(tu => tu.Token == token);
                if (itemToDelete != null)
                {
                    _db.Set<DbUserToken>().Remove(itemToDelete);
                }
            }
            return false;
        }

        public string RenewToken(string oldToken)
        {
            var dbTokenUser = _db.Set<DbUserToken>().FirstOrDefault(user => user.Token == oldToken);
            if (dbTokenUser != null)
            {
                var newToken = Guid.NewGuid().ToString().Replace("-", "");
                dbTokenUser.Token = newToken;
                _db.Entry(dbTokenUser).State = EntityState.Modified;
                return newToken;
            }
            return null;
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
