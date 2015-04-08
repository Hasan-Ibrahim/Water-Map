namespace Service.Responses
{
    public class TokenResponse
    {
        public string Token { get; private set; }
        public bool RememberMe { get; private set; }

        public TokenResponse(string token, bool rememberMe)
        {
            Token = token;
            RememberMe = rememberMe;
        }
    }
}
