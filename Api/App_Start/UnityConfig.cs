using System;
using System.Configuration;
using System.Web;
using Api.AccessControl.OAuth;
using Data.Context;
using Data.Model.Write;
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


            //container.RegisterType<ITokenStorage, PgsqlTokenStorage>();
            //container.RegisterType(typeof (IRepository<>), typeof (PgsqlRepository<>));
            var _googleClientId = ConfigurationManager.AppSettings["oauthclientid-google"];
            var _googleClientSecret = ConfigurationManager.AppSettings["oauthclientsecret-google"];
            var _keywordIndexDirectory = HttpContext.Current.Server.MapPath(ConfigurationManager.AppSettings["KeywordIndexDirectory"]);

            var redisServerHost = ConfigurationManager.AppSettings["redisServerHost"];
            var redisServerPort = Convert.ToInt32(ConfigurationManager.AppSettings["redisServerPort"]);
            var redisServerPassword = ConfigurationManager.AppSettings["redisServerPassword"];

            //container.RegisterType<ITokenStorage, InMemoryTokenStorage>();
            //container.RegisterType(typeof(IRepository<>), typeof(InMemoryRepository<>));

            // container.RegisterType<ITokenStorage, PgsqlTokenStorage>();
            container.RegisterType<IRedisClient, RedisClient>(new InjectionConstructor(redisServerHost, redisServerPort, redisServerPassword, 0L));
            container.RegisterType<ITokenStorage, RedisTokenStorage>();

            //container.RegisterType(typeof(IRepository<>), typeof(PgsqlRepository<>));
            container.RegisterType(typeof(IRepository<>), typeof(InMemoryRepository<>));

            container.RegisterType<GoogleOAuthClient>(new InjectionConstructor(_googleClientId, _googleClientSecret));
            container.RegisterType<KeywordRepository>(new InjectionConstructor(_keywordIndexDirectory));
            //container.RegisterType<FacebookOAuthClient>(new InjectionConstructor(_facebookClientId, _facebookClientSecret));

            container.RegisterType<AuthTokenDbContext>(
                new InjectionConstructor(ConfigurationManager.AppSettings["AuthTokenDbConnection"]));

            container.RegisterType<DataDbContext>(
                new InjectionConstructor(ConfigurationManager.AppSettings["DataDbConnection"]));

            container.RegisterType<ReadDbContext>(
                new InjectionConstructor(ConfigurationManager.AppSettings["ReadDbConnection"]));
            
            container.RegisterType(typeof(PgsqlRepository<DbUser>), new InjectionConstructor(new ResolvedParameter<DataDbContext>()));
            
            GlobalConfiguration.Configuration.DependencyResolver = new UnityDependencyResolver(container);
        }
    }
}
