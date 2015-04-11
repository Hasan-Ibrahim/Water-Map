using System;

namespace Data.TokenStorages
{
    public interface ITokenStorage : IDisposable
    {
        string CreateToken(int userId);
        bool TokenExists(string token);
        int GetUserId(string token);
        bool DeleteToken(string token);
        string RenewToken(string oldToken);
    }
}
