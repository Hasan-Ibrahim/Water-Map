using System;
using System.Security.Cryptography;
using System.Text;

namespace Service.Utility
{
    public class HashGenerator
    {
        public string GenerateHash(string plainText)
        {
            var encoded = new UTF8Encoding().GetBytes(plainText);
            var hash = ((HashAlgorithm)CryptoConfig.CreateFromName("MD5")).ComputeHash(encoded);
            var hashString = BitConverter.ToString(hash).Replace("-", string.Empty).ToLower();
            return hashString;
        }
    }
}
