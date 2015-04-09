using System;
using System.Collections.Generic;
using System.Data.Entity.Spatial;
using Data.Model;
using Data.Model.Constants;
using Data.Repositories.Abstraction;

namespace Service.WaterSourceSubscription
{
    public class WaterSourceSubscriptionService : IDisposable
    {
        private readonly Repository<DbWaterSourceSubscription> _sourceSubscriptionRepository;
        private readonly Repository<DbAreaSubscription> _areaSubscrioptionRepository;

        public WaterSourceSubscriptionService(
            Repository<DbWaterSourceSubscription> sourceSubscriptionRepository,
            Repository<DbAreaSubscription> areaSubscrioptionRepository)
        {
            _sourceSubscriptionRepository = sourceSubscriptionRepository;
            _areaSubscrioptionRepository = areaSubscrioptionRepository;
        }

        public void Subscribe(SourceSubscription sourceSubscription, int userId)
        {
            var type = GetSubscriptionFlagFromArray(sourceSubscription.SubscriptionTypes);

            var dbSubscription = _sourceSubscriptionRepository.Find(
                dbS => dbS.SourceId == sourceSubscription.SourceId && dbS.UserId == userId);

            if (dbSubscription == null)
            {
                dbSubscription = new DbWaterSourceSubscription(userId, sourceSubscription.SourceId, type);
                _sourceSubscriptionRepository.Create(dbSubscription);
            }
            else
            {
                dbSubscription.Type = type;
                _sourceSubscriptionRepository.Update(dbSubscription);
            }
            _sourceSubscriptionRepository.SaveChanges();
        }

        private static WaterSubscriptionType GetSubscriptionFlagFromArray(IEnumerable<WaterSubscriptionType> subscription)
        {
            WaterSubscriptionType type = 0;

            foreach (var sourceSubscriptionType in subscription)
            {
                type |= sourceSubscriptionType;
            }
            return type;
        }

        public bool Unsubscribe(int sourceId, int userId)
        {
            var subscription = _sourceSubscriptionRepository.Find(ss => ss.SourceId == sourceId && ss.UserId == userId);
            if (subscription != null)
            {
                _sourceSubscriptionRepository.SoftDelete(subscription);
                _sourceSubscriptionRepository.SaveChanges();
                return true;                
            }

            return false;
        }

        public void SubscribeToArea(AreaSubscription areaSubscription, int userId)
        {
            var subscriptionGeo = DbGeometry.FromText(areaSubscription.AreaWkt);
            var type = GetSubscriptionFlagFromArray(areaSubscription.SubscriptionTypes);
            var dbAreaSubscription = new DbAreaSubscription(userId, subscriptionGeo, type);
            _areaSubscrioptionRepository.Create(dbAreaSubscription);

            _areaSubscrioptionRepository.SaveChanges();
        }

        public bool UnsubscribeFromArea(int subscriptionId, int userId)
        {
            var subscription = _areaSubscrioptionRepository.Find(subscriptionId);
            if (subscription != null && subscription.UserId == userId)
            {
                _areaSubscrioptionRepository.SoftDelete(subscription);
                _areaSubscrioptionRepository.SaveChanges();
                return true;
            }
            return false;
        }

        public void Dispose()
        {
            _sourceSubscriptionRepository.Dispose();
            _areaSubscrioptionRepository.Dispose();
        }

    }
}
