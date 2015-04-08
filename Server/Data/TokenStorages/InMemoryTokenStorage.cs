using System;
using System.Collections.Generic;
using System.Threading.Tasks;

namespace Data.TokenStorages
{
    public class InMemoryTokenStorage : ITokenStorage
    {
        private static IDictionary<string, int> _store = new Dictionary<string, int>();
       
        public string CreateToken(int userId)
        {
            var token = Guid.NewGuid().ToString().Replace("-", "");
            _store[token] = userId;
            return token;
        }

        public async Task<bool> TokenExists(string token)
        {
            return await Task.FromResult(token != null && _store.ContainsKey(token));
        }

        public int GetUserId(string token)
        {
            return token != null && _store.ContainsKey(token) ? _store[token] : 0;
        }

        public bool DeleteToken(string token)
        {
            if (token != null)
            {
                return _store.Remove(token);                
            }
            return false;
        }

        public string RenewToken(string oldToken)
        {
            if (oldToken != null && TokenExists(oldToken).Result)
            {
                var userId = GetUserId(oldToken);
                DeleteToken(oldToken);
                return CreateToken(userId);
            }
            return null;
        }

        public void Dispose()
        {
        }
    }
}
