using System;
using System.ComponentModel.DataAnnotations.Schema;

namespace Data.Model
{
    [Table("User", Schema = "app")]
    public class DbUser : DbModel
    {
        public string LoginId { get; set; }
        public string HashedPassword { get; set; }
        public string FullName { get; set; }
        public string PhoneNumber { get; set; }
        public bool IsOAuthUser { get; set; }
        public String Address { get; set; }

        public DbUser()
        {

        }

        public DbUser(string loginId, string hashedPassword, string fullName, string phoneNumber, string address, bool isOAuthUser)
        {
            LoginId = loginId;
            HashedPassword = hashedPassword;
            FullName = fullName;
            IsOAuthUser = isOAuthUser;
            PhoneNumber = phoneNumber;
            Address = address;
        }
    }
}
