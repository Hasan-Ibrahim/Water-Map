using System;
using System.Data.Entity.Spatial;
using System.Linq;
using Data.Model;
using Data.Model.Constants;
using Data.Repositories.Abstraction;
using Service.Utility;
using Service.WaterSources;

namespace Service.WaterSourceSubscription
{
    public class WaterSourceSubscriptionService : IDisposable
    {
        private readonly IRepository<DbWaterSourceSubscription> _sourceSubscriptionRepository;
        private readonly IRepository<DbAreaSubscription> _areaSubscrioptionRepository;
        private readonly IRepository<DbWaterSource> _sourceRepository;

        public WaterSourceSubscriptionService(
            IRepository<DbWaterSourceSubscription> sourceSubscriptionRepository,
            IRepository<DbAreaSubscription> areaSubscrioptionRepository,
            IRepository<DbWaterSource> sourceRepository)
        {
            _sourceSubscriptionRepository = sourceSubscriptionRepository;
            _areaSubscrioptionRepository = areaSubscrioptionRepository;
            _sourceRepository = sourceRepository;
        }

        public void Dispose()
        {
            _sourceSubscriptionRepository.Dispose();
            _areaSubscrioptionRepository.Dispose();
            _sourceRepository.Dispose();
        }

        public WaterSourceGroupBySubscription GetWaterSourcesBySubscription(int userId)
        {
            var usersSourceIds = _sourceSubscriptionRepository
                .Where(subscription => subscription.UserId == userId)
                .Select(subscription => subscription.SourceId)
                .ToList();

            var usersSources =
                _sourceRepository.Where(source => usersSourceIds.Contains(source.Id))
                    .Select(WaterSource.FromDbWaterSource);

            var otherSources =
                _sourceRepository.Where(source => !usersSourceIds.Contains(source.Id))
                    .Select(WaterSource.FromDbWaterSource);

            return new WaterSourceGroupBySubscription
            {
                MySources = usersSources,
                OthersSources = otherSources
            };
        }

        public SourceSubscription GetSourceSubscription(int sourceId, int userId)
        {
            var dbSubscription = _sourceSubscriptionRepository
                .Find(subscription => subscription.SourceId == sourceId && subscription.UserId == userId)
                ?? new DbWaterSourceSubscription(userId, sourceId, 0);

            return SourceSubscription.FromDbSubscription(dbSubscription);
        }

        public void Subscribe(SubscriptionEntry subscriptionEntry, int userId)
        {
            var type = GetSubscriptionFlagFromArray(subscriptionEntry);

            var dbSubscription = _sourceSubscriptionRepository.Find(
                dbS => dbS.SourceId == subscriptionEntry.SourceId && dbS.UserId == userId);

            if (dbSubscription == null)
            {
                dbSubscription = new DbWaterSourceSubscription(userId, subscriptionEntry.SourceId, type);
                _sourceSubscriptionRepository.Create(dbSubscription);
            }
            else
            {
                dbSubscription.Type = type;
                dbSubscription.IsDeleted = false;
                _sourceSubscriptionRepository.Update(dbSubscription);
            }
            _sourceSubscriptionRepository.SaveChanges();
        }

        private static WaterSubscriptionType GetSubscriptionFlagFromArray(SubscriptionEntry subscriptionEntry)
        {
            WaterSubscriptionType type = 0;

            foreach (var subscription in subscriptionEntry.SubscriptionTypes)
            {
                type |= subscription;
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

        public void SubscribeToArea(SubscriptionEntry subscriptionEntry, int userId)
        {
            var subscriptionGeo = DbGeometry.FromText(subscriptionEntry.Geometry);
            var type = GetSubscriptionFlagFromArray(subscriptionEntry);
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
    }
}
