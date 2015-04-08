using System.Web;

namespace Api.AccessControl
{
    public class AuthenticationCookieHandler
    {
        public static readonly string CookieKey = "authentication";

        public string GetTokenFromRequest()
        {
            var token = HttpContext.Current.Request.Headers[CookieKey];
            return token;
        }
    }
}
