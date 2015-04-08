using System.Web.Http.Controllers;

namespace Api.AccessControl.Attribtues
{
    public class TokenUnLoggedInAttribute : TokenAuthorizeAttribute
    {
        protected override bool IsAuthorized(HttpActionContext actionContext)
        {
            return !base.IsAuthorized(actionContext);
        }
    }
}