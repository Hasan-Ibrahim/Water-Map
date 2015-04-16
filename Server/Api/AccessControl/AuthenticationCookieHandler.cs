using System.Web;

namespace Api.AccessControl
{
    public class AuthenticationCookieHandler
    {
        private readonly HttpContext _currentContext;
        public static readonly string CookieKey = "authentication";

        public AuthenticationCookieHandler(HttpContext currentContext)
        {
            _currentContext = currentContext;
        }

        public string GetTokenFromRequest()
        {
            var token = _currentContext.Request.Headers[CookieKey] ?? _currentContext.Request.Params[CookieKey];
            return token;
        }
    }
}
