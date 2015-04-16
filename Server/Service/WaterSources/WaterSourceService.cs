using System;
using System.Collections.Generic;
using System.Data.Entity.Spatial;
using System.Linq;
using Data.Model;
using Data.Model.Constants;
using Data.Repositories.Abstraction;
using Service.Notifications;

namespace Service.WaterSources
{
    public class WaterSourceService : IDisposable
    {
        private readonly IRepository<DbWaterSource> _sourceRepository;
        private readonly IRepository<DbWaterSourceRating> _ratingRepository;
        private readonly NotificationService _notificationService;

        public WaterSourceService(IRepository<DbWaterSource> sourceRepository,
            IRepository<DbWaterSourceRating> ratingRepository,
            NotificationService notificationService)
        {
            _sourceRepository = sourceRepository;
            _ratingRepository = ratingRepository;
            _notificationService = notificationService;
        }

        public void Dispose()
        {
            _sourceRepository.Dispose();
            _ratingRepository.Dispose();
            _notificationService.Dispose();
        }

        public IEnumerable<WaterSource> GetWaterSources(string bBoxWkt)
        {
            var bBox = DbGeometry.FromText(bBoxWkt);
            return _sourceRepository
                .Where(source => bBox.Contains(source.Shape))
                .Select(WaterSource.FromDbWaterSource);
        }

        public WaterSource AddWaterSource(WaterSourceCreateEntry waterSourceCreationModel)
        {
            var dbWaterSource = waterSourceCreationModel.ToDbWaterSource();
            _sourceRepository.Create(dbWaterSource);
            _sourceRepository.SaveChanges();

            return WaterSource.FromDbWaterSource(dbWaterSource);
        }

        public WaterSource RateWaterSource(WaterSourceRating waterSourceRating)
        {
            _ratingRepository.Create(waterSourceRating.ToDbWaterSourceRating());

            var source = _sourceRepository.Find(waterSourceRating.WaterSourceId);

            var oldMajorRate = WaterSource.FromDbWaterSource(source).MajorQuality;

            switch (waterSourceRating.Potability)
            {
                case Potability.Drinkable:
                    source.PotableRatingCount++;
                    break;
                case Potability.NeedTreatment:
                    source.ProcessableRatingCount++;
                    break;
                case Potability.Undrinkable:
                    source.UnpotableRatingCount++;
                    break;
                case Potability.Unknown:
                    source.UnknownRatingCount++;
                    break;
            }

            var waterSource = WaterSource.FromDbWaterSource(source);
            var newMajorRate = waterSource.MajorQuality;
            _notificationService.SendQualityChangeNotification(oldMajorRate, newMajorRate, source);

            _ratingRepository.SaveChanges();

            return waterSource;
        }

        public void UpdateAccessibility(AccessibilityEntity accessibilityEntity)
        {
            var waterSource = _sourceRepository.Find(accessibilityEntity.WaterSourceId);
            var oldAccessibility = waterSource.Accessibility;
            waterSource.Accessibility = accessibilityEntity.Accessibility;
            _sourceRepository.Update(waterSource);
            _sourceRepository.SaveChanges();

            _notificationService.SendAccessibilityChangeNotification(oldAccessibility, accessibilityEntity.Accessibility, waterSource);
        }

        public WaterSourceProperties GetSourceProperties(int sourceId)
        {
            var dbSource = _sourceRepository.Find(sourceId);

            return WaterSourceProperties.FromDbWaterSource(dbSource);
        }

        public void Update(WaterSource waterSource)
        {
            var dbSource = _sourceRepository.Find(waterSource.Id);
            dbSource.Shape = DbGeometry.FromText(waterSource.Geometry);
            _sourceRepository.Update(dbSource);
            _sourceRepository.SaveChanges();
        }
    }
}
