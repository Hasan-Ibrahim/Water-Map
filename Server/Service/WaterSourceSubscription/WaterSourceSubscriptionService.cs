using System;
using Data.Model;
using Data.Model.Constants;
using Data.Repositories.Abstraction;

namespace Service.WaterSourceSubscription
{
    public class WaterSourceSubscriptionService : IDisposable
    {
        private readonly Repository<DbWaterSourceSubscription> _subscriptionRepository;

        public WaterSourceSubscriptionService(Repository<DbWaterSourceSubscription> subscriptionRepository)
        {
            _subscriptionRepository = subscriptionRepository;
        }

        public void Subscribe(SubscriptionEntry subscription, int userId)
        {
            SourceSubscriptionType type = 0;
            
            foreach (var sourceSubscriptionType in subscription.SubscriptionTypes)
            {
                type |= sourceSubscriptionType;
            }

             var dbSubscription = _subscriptionRepository.Find(
                dbS => dbS.SourceId == subscription.SourceId && dbS.UserId == userId);

            if (dbSubscription == null)
            {
                dbSubscription = new DbWaterSourceSubscription(userId, subscription.SourceId, type);
                _subscriptionRepository.Create(dbSubscription);
            }
            else
            {
                dbSubscription.Type = type;
                _subscriptionRepository.Update(dbSubscription);
            }
            _subscriptionRepository.SaveChanges();
        }

        public void Unsubscribe(int sourceId, int userId)
        {
            var subscription = _subscriptionRepository.Find(ss => ss.SourceId == sourceId && ss.UserId == userId);

            _subscriptionRepository.SoftDelete(subscription.Id);
        }

        public void Dispose()
        {
            _subscriptionRepository.Dispose();
        }

    }
}
