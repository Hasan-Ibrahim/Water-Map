using System.Web.Http;
using System.Web.Http.Controllers;
using Data.TokenStorages;

namespace Api.AccessControl.Attribtues
{
    public class TokenAuthorizeAttribute : AuthorizeAttribute
    {
        protected override bool IsAuthorized(HttpActionContext actionContext)
        {
            var cookieHandler = (AuthenticationCookieHandler)
                GlobalConfiguration.Configuration.DependencyResolver.GetService(typeof (AuthenticationCookieHandler));
            var tokenStorage = (ITokenStorage)GlobalConfiguration.Configuration.DependencyResolver.GetService(typeof(ITokenStorage));

            var token = cookieHandler.GetTokenFromRequest();
            return tokenStorage.TokenExists(token).Result;
        }
    }
}