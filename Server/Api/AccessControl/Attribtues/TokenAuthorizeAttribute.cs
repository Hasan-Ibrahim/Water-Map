using System.Web.Http;
using System.Web.Http.Controllers;

namespace Api.AccessControl.Attribtues
{
    public class TokenAuthorizeAttribute : AuthorizeAttribute
    {
        protected override bool IsAuthorized(HttpActionContext actionContext)
        {
            var cookieHandler = (ActiveUser)
                GlobalConfiguration.Configuration.DependencyResolver.GetService(typeof(ActiveUser));

            return cookieHandler.IsAuthenticated;
        }
    }
}