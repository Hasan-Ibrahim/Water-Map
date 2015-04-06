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

        public async Task<ActiveUser> GetProfile(int userId)
        {
            var dbUserTask = _userRepository.Find(userId);
            var dbUser = await dbUserTask;
            return new ActiveUser(dbUser);
        }

        public async Task<string> GetAddress(int userId)
        {
            var dbUserTask = _userRepository.Find(userId);
            var dbuser = await dbUserTask;
            return await Task.FromResult(dbuser.Address);
        }

        public bool UpdateProfile(int userId, ProfileUpdate update)
        {
            var profile = _userRepository.Find(userId).Result;

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
