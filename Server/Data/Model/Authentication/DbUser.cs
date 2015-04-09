using System;
using System.ComponentModel.DataAnnotations.Schema;
using Data.Model.Base;

namespace Data.Model.Authentication
{
    [Table("User")]
    public class DbUser : DbModel
    {
        public string LoginId { get; set; }
        public string HashedPassword { get; set; }

        [NotMapped]
        public string FullName { get; set; }

        [NotMapped]
        public string PhoneNumber { get; set; }

        [NotMapped]
        public bool IsOAuthUser { get; set; }

        [NotMapped]
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
