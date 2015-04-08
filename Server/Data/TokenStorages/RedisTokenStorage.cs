using System;
using System.Configuration;
using System.Threading.Tasks;
using NServiceKit.Redis;

namespace Data.TokenStorages
{
    public class RedisTokenStorage : ITokenStorage
    {
        public IRedisClient RedisClient;
        private readonly string _keyPrefix;

        public RedisTokenStorage(IRedisClient redisClient)
        {
            RedisClient = redisClient;
            _keyPrefix = ConfigurationManager.AppSettings["redisAccessKeyPrefix"];
        }

        public string CreateToken(int userId)
        {
            var token = Guid.NewGuid().ToString().Replace("-", "");
            using (var redisClient = RedisClient.As<UserToken>())
            {
                redisClient.Store(new UserToken { UserId = userId, Token = token });
            }
            return token;
        }

        public async Task<bool> TokenExists(string token)
        {
            using (var redisClient = RedisClient.As<UserToken>())
            {
                return await Task.FromResult(token != null && redisClient.ContainsKey(_keyPrefix + token));
            }
        }

        public int GetUserId(string token)
        {
            using (var redisClient = RedisClient.As<UserToken>())
            {
                return redisClient.GetById(token).UserId;
            }
        }

        public bool DeleteToken(string token)
        {
            using (var redisClient = RedisClient.As<UserToken>())
            {
                if (redisClient.ContainsKey(_keyPrefix + token))
                {
                    redisClient.RemoveEntry(_keyPrefix + token);
                    return true;
                }
                return false;
            }
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

    public class UserToken
    {
        public string Id
        {
            get { return Token; }
            set { Token = value; }
        }
        public string Token { get; set; }
        public int UserId { get; set; }
    }
}
