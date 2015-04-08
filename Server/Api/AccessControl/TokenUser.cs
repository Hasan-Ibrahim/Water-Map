using Data.TokenStorages;

namespace Api.AccessControl
{
    public class TokenUser
    {
        public readonly string Token;
        public readonly int UserId;
        public readonly bool IsAuthenticated;

        public TokenUser(ITokenStorage tokenStorage, AuthenticationCookieHandler cookieHandler)
        {
            Token = cookieHandler.GetTokenFromRequest();
            if (!string.IsNullOrEmpty(Token))
            {
                IsAuthenticated = tokenStorage.TokenExists(Token).Result;
                if (IsAuthenticated)
                {
                    UserId = tokenStorage.GetUserId(Token);                    
                }
            }
            else
            {
                UserId = 0;
                IsAuthenticated = false;
            }
        }
    }
}