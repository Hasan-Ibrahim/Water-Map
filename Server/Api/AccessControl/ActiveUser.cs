using Data.TokenStorages;

namespace Api.AccessControl
{
    public class ActiveUser
    {
        public readonly string Token;
        public readonly int UserId;
        public readonly bool IsAuthenticated;

        public ActiveUser(ITokenStorage tokenStorage, AuthenticationCookieHandler cookieHandler)
        {
            Token = cookieHandler.GetTokenFromRequest();
            if (!string.IsNullOrEmpty(Token))
            {
                IsAuthenticated = tokenStorage.TokenExists(Token);
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

            tokenStorage.Dispose();
        }
    }
}