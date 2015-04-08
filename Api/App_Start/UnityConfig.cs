using System;
using System.Configuration;
using System.Data.Entity;
using System.Web;
using Api.AccessControl.OAuth;
using Data.Context;
using Data.Model;
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
            //container.RegisterType<ITokenStorage, RedisTokenStorage>();
            //container.RegisterType<ITokenStorage, PgsqlTokenStorage>();
            container.RegisterType<ITokenStorage, InMemoryTokenStorage>();

            container.RegisterType(typeof(IRepository<>), typeof(PgsqlRepository<>));
            container.RegisterType<DbContext, AppDbContext>(new InjectionConstructor("app"));
            //container.RegisterType(typeof(IRepository<>), typeof(InMemoryRepository<>));

            container.RegisterType<GoogleOAuthClient>(new InjectionConstructor(_googleClientId, _googleClientSecret));
            container.RegisterType<KeywordRepository>(new InjectionConstructor(_keywordIndexDirectory));
            //container.RegisterType<FacebookOAuthClient>(new InjectionConstructor(_facebookClientId, _facebookClientSecret));

            container.RegisterType(typeof(PgsqlRepository<DbUser>), new InjectionConstructor(new ResolvedParameter<AppDbContext>()));
            
            GlobalConfiguration.Configuration.DependencyResolver = new UnityDependencyResolver(container);
        }
    }
}
