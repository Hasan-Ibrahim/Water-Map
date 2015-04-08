using System;
using Data.Model;
using Data.Repositories;
using Service.Constants;
using Service.OAuth;
using Service.Utility;

namespace Service.Account
{
    public class AccountService : IDisposable
    {
        private readonly UserRepository _userRepository;
        private readonly HashGenerator _hashGenerator;

        public AccountService(UserRepository userRepository, HashGenerator hashGenerator)
        {
            _userRepository = userRepository;
            _hashGenerator = hashGenerator;
        }

        public bool ValidateUser(Login login)
        {
            if (login == null || login.LoginId == null || login.Password == null)
            {
                return false;
            }
            var passwordHash = _hashGenerator.GenerateHash(login.Password);

            var user = _userRepository.FindByLoginId(login.LoginId);

            return user != null && user.HashedPassword != null && user.HashedPassword == passwordHash;
        }

        public DataUpdateStatus CreateUser(Registration registration)
        {
            if (registration == null || string.IsNullOrWhiteSpace(registration.Email))
            {
                return DataUpdateStatus.UsernameNotSupplied;
            }
            if (string.IsNullOrWhiteSpace(registration.Password))
            {
                return DataUpdateStatus.PasswordNotSupplied;
            }
            if (string.IsNullOrWhiteSpace(registration.RetypePassword) || registration.Password != registration.RetypePassword)
            {
                return DataUpdateStatus.PasswordAndRetypePasswordMismatch;
            }

            if (_userRepository.Exists(user => user.LoginId == registration.Email))
            {
                return DataUpdateStatus.DuplicateUsername;
            }

            var passwordHash = _hashGenerator.GenerateHash(registration.Password);

            _userRepository.Create(new DbUser(registration.Email, passwordHash, registration.FullName, registration.PhoneNumber, String.Empty, false));
            return DataUpdateStatus.Success;
        }

        public void CreateOAuthUser(IOAuthUserInfo userInfo)
        {
            var user = new DbUser(userInfo.UniqueId, null, userInfo.FullName, String.Empty, String.Empty, true);
            _userRepository.Create(user);
        }

        public int GetUserIdByLoginId(string loginId)
        {
            var user = _userRepository.FindByLoginId(loginId);
            return user == null ? 0 : user.Id;
        }

        public bool UserExists(string loginId)
        {
            return _userRepository.Exists(user => user.LoginId == loginId);
        }

        public void Dispose()
        {
            _userRepository.Dispose();
        }

        public DataUpdateStatus ChangeUserPassword(int userId, ChangePassword changePassword)
        {
            if (changePassword.NewPassword == changePassword.RetypePassword)
            {
                var user = _userRepository.Find(userId);
                if (user.IsOAuthUser)
                {
                    return DataUpdateStatus.NotAllowedForOAuthUser;
                }
                var oldHashedPassword = _hashGenerator.GenerateHash(changePassword.OldPassword);
                if (user.HashedPassword == oldHashedPassword)
                {
                    var newHashedPassword = _hashGenerator.GenerateHash(changePassword.NewPassword);
                    if (user.HashedPassword != newHashedPassword)
                    {
                        user.HashedPassword = newHashedPassword;
                        return _userRepository.Update(user) ? DataUpdateStatus.Success : DataUpdateStatus.Unknown;
                    }
                    return DataUpdateStatus.Success;
                }
                return DataUpdateStatus.WrongPassword;
            }
            return DataUpdateStatus.PasswordAndRetypePasswordMismatch;
        }
    }
}