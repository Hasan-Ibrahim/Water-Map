using System;
using System.Linq;
using Data.Model.Authentication;
using Data.Model.Constants;
using Data.Repositories.Abstraction;
using Service.WaterSources;
using Service.WaterSourceSubscription;

namespace Service.Notifications
{
    public class NotificationService : IDisposable
    {
        private readonly WaterSourceSubscriptionService _subscriptionService;
        private readonly IRepository<DbUser> _userRepository;

        public NotificationService(
            WaterSourceSubscriptionService subscriptionService, IRepository<DbUser> userRepository)
        {
            _subscriptionService = subscriptionService;
            _userRepository = userRepository;
        }

        public void Dispose()
        {

        }

        public void SendQualityChangeNotification(Potability oldMajorRate, Potability newMajorRate)
        {
            if (oldMajorRate != newMajorRate)
            {
                var userIds = _subscriptionService.GetUsersBySubscription(WaterSubscriptionType.Quality).ToList();
                var emails = _userRepository.Where(user => userIds.Contains(user.Id)).Select(user => user.LoginId);
            }
        }

        public void SendAccessibilityChangeNotification(AccessibilityEntity accessibilityEntity)
        {
            
        }
    }
}
