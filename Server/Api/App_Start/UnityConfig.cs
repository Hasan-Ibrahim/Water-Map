using System;
using System.Configuration;
using System.Data.Entity;
using System.Web;
using Api.AccessControl.OAuth;
using Data.Context;
using Data.Model;
using Data.Model.Authentication;
using Data.Repositories;
using Data.Repositories.Abstraction;
using Data.TokenStorages;
using Microsoft.Practices.Unity;
using System.Web.Http;
using NServiceKit.Redis;
using Unity.WebApi;

namespace Api
{
    public static class UnityConfig
    {
        public static void RegisterComponents()
        {
            var container = new UnityContainer();

            ConfigureOAuth(container);
            ConfigureRedis(container);
            ConfigureTokenStorage(container, false, false);
            ConfigureRepository(container, false);

            container.RegisterType<HttpContext>(new InjectionFactory(unityContainer => HttpContext.Current));            
            GlobalConfiguration.Configuration.DependencyResolver = new UnityDependencyResolver(container);
        }

        private static void ConfigureOAuth(UnityContainer container)
        {
            var _googleClientId = ConfigurationManager.AppSettings["oauthclientid-google"];
            var _googleClientSecret = ConfigurationManager.AppSettings["oauthclientsecret-google"];
            container.RegisterType<GoogleOAuthClient>(new InjectionConstructor(_googleClientId, _googleClientSecret));
            //container.RegisterType<FacebookOAuthClient>(new InjectionConstructor(_facebookClientId, _facebookClientSecret));
        }

        private static void ConfigureRepository(UnityContainer container, bool useInMemory)
        {
            if (useInMemory)
            {
                container.RegisterType(typeof(IRepository<>), typeof(InMemoryRepository<>));
            }
            else
            {
                container.RegisterType(typeof(IRepository<>), typeof(DbContextRepository<>));
                container.RegisterType<DbContext, AppDbContext>(new InjectionConstructor("app"));
            }
        }

        private static void ConfigureTokenStorage(UnityContainer container, bool useInMemory, bool useRadis)
        {
            if (useInMemory)
            {
                container.RegisterType<ITokenStorage, InMemoryTokenStorage>();
            }
            else if (useRadis)
            {
                container.RegisterType<ITokenStorage, RedisTokenStorage>();
            }
            else
            {
                container.RegisterType<ITokenStorage, DbContextTokenStorage>();                
            }
        }

        private static void ConfigureRedis(UnityContainer container)
        {
            var redisServerHost = ConfigurationManager.AppSettings["redisServerHost"];
            var redisServerPort = Convert.ToInt32(ConfigurationManager.AppSettings["redisServerPort"]);
            var redisServerPassword = ConfigurationManager.AppSettings["redisServerPassword"];
            container.RegisterType<IRedisClient, RedisClient>(new InjectionConstructor(redisServerHost, redisServerPort,
                redisServerPassword, 0L));
        }
    }
}
