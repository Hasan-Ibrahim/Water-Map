using System;
using System.Threading.Tasks;
using Data.Repositories;
using Service.Account;

namespace Service.Profile
{
    public class ProfileService : IDisposable
    {
        private readonly UserRepository _userRepository;

        public ProfileService(UserRepository userRepository)
        {
            _userRepository = userRepository;
        }

        public UserProfile GetProfile(int userId)
        {
            var dbUserTask = _userRepository.Find(userId);
            var dbUser = dbUserTask;
            return new UserProfile(dbUser);
        }

        public async Task<string> GetAddress(int userId)
        {
            var dbUserTask = _userRepository.Find(userId);
            var dbuser = dbUserTask;
            return await Task.FromResult(dbuser.Address);
        }

        public bool UpdateProfile(int userId, ProfileUpdate update)
        {
            var profile = _userRepository.Find(userId);

            profile.FullName = update.FullName;
            profile.PhoneNumber = update.PhoneNumber;
            profile.Address = update.Address;

            _userRepository.Update(profile);

            return true;
        }

        public void Dispose()
        {
            _userRepository.Dispose();
        }
    }
}
