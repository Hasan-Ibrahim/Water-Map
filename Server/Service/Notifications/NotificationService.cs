using System;
using System.Collections.Generic;
using System.Data.Entity.Spatial;
using System.Linq;
using System.Net.Mail;
using Data.Model;
using Data.Model.Authentication;
using Data.Model.Constants;
using Data.Repositories.Abstraction;
using Service.Utility;
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

        public void SendQualityChangeNotification(Potability oldMajorRate, Potability newMajorRate, DbWaterSource dbWaterSource)
        {
            if (oldMajorRate != newMajorRate)
            {
                var emails = GetEmailsBySubscription(WaterSubscriptionType.Quality);

                var body = string.Format("Drinkability of a {0} water source you subscribed to has been changed from {1} to {2}.", dbWaterSource.SourceType, oldMajorRate, newMajorRate);

                SendMails(emails, "Water drinkability changed", body);
            }
        }

        private static void SendMails(IEnumerable<string> emails, string subject, string body)
        {
            foreach (var email in emails)
            {
                try
                {
                    var mailMessage = new MailMessage("notification@waterquest.com", email, subject, body);
                    new Email(mailMessage).Send();
                }
                catch (Exception)
                {
                }
            }
        }

        private IEnumerable<string> GetEmailsBySubscription(WaterSubscriptionType type)
        {
            var userIds = _subscriptionService.GetUsersBySubscription(type).ToList();
            var emails = _userRepository.Where(user => userIds.Contains(user.Id)).Select(user => user.LoginId);
            return emails;
        }

        public void SendAccessibilityChangeNotification(Accessibility oldAccessibility, Accessibility newAccesibility, DbWaterSource dbWaterSource)
        {
            var emails = GetEmailsBySubscription(WaterSubscriptionType.Accessibility);
            var body = string.Format("Status of a {0} water source you subscribed to has been changed from {1} to {2}.", dbWaterSource.SourceType, oldAccessibility, newAccesibility);
            SendMails(emails, "Water source status changed", body);
        }
    }
}
