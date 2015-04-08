using System.Collections.Generic;

namespace Service.Constants
{
    public class Messages
    {
        public static readonly Dictionary<DataUpdateStatus, string> CreateUserMessages = new Dictionary<DataUpdateStatus, string>
        {
            { DataUpdateStatus.Success, "Success" },   
            { DataUpdateStatus.DuplicateUsername, "Email address already registered" },
            { DataUpdateStatus.PasswordAndRetypePasswordMismatch, "Password and retype password do not match" },
            { DataUpdateStatus.UsernameNotSupplied, "Please specify your email address" },
            { DataUpdateStatus.PasswordNotSupplied, "Please specify the password" },
        };

        public static readonly Dictionary<DataUpdateStatus, string> ChangePasswordMessages = new Dictionary<DataUpdateStatus, string>
        {
            { DataUpdateStatus.Success, "Success" },   
            { DataUpdateStatus.WrongPassword, "The password you provided is wrong" },
            { DataUpdateStatus.PasswordAndRetypePasswordMismatch, "Password and retype password do not match" },
            { DataUpdateStatus.Unknown, "An error has occured, please try again" },
            { DataUpdateStatus.NotAllowedForOAuthUser, "You are logged in with Open Authentication. Changing password is not allowed."}
        };

        public static readonly Dictionary<DataUpdateStatus, string> ProductMessages = new Dictionary<DataUpdateStatus, string>
        {
            { DataUpdateStatus.DataInvalid, "Invalid data" },   
            { DataUpdateStatus.AccessDenied, "Access to this operation is denied" }
        };
    }
}