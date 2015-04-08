namespace Service.Constants
{
    public enum DataUpdateStatus
    {
        Success = 0,
        DuplicateUsername = 1,
        UsernameNotSupplied = 2,
        PasswordNotSupplied = 3,
        PasswordAndRetypePasswordMismatch = 4,
        WrongPassword = 5,
        Unknown = 6,
        NotAllowedForOAuthUser = 7,
        AccessDenied = 8,
        DataInvalid = 9
    }
}
