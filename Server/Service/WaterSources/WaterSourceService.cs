using System;
using System.Collections.Generic;
using System.Data.Entity.Spatial;
using System.Linq;
using Data.Model;
using Data.Model.Constants;
using Data.Repositories.Abstraction;
using Service.Utility;

namespace Service.WaterSources
{
    public class WaterSourceService : IDisposable
    {
        private readonly IRepository<DbWaterSource> _sourceRepository;
        private readonly IRepository<DbWaterSourceRating> _ratingRepository;

        public WaterSourceService(IRepository<DbWaterSource> sourceRepository, IRepository<DbWaterSourceRating> ratingRepository)
        {
            _sourceRepository = sourceRepository;
            _ratingRepository = ratingRepository;
        }

        public void Dispose()
        {
            _sourceRepository.Dispose();
            _ratingRepository.Dispose();
        }

        public IEnumerable<GeometryEntity> GetWaterSources(string bBoxWkt)
        {
            var bBox = DbGeometry.FromText(bBoxWkt);
            return _sourceRepository
                .Where(source => bBox.Contains(source.Shape))
                .Select(GeometryEntity.FromDbWaterSource);
        }

        public GeometryEntity AddWaterSource(WaterSourceCreateEntry waterSourceCreationModel)
        {
            var dbWaterSource = waterSourceCreationModel.ToDbWaterSource();
            _sourceRepository.Create(dbWaterSource);
            _sourceRepository.SaveChanges();

            return GeometryEntity.FromDbWaterSource(dbWaterSource);
        }

        public void RateWaterSource(WaterSourceRating waterSourceRating)
        {
            _ratingRepository.Create(waterSourceRating.ToDbWaterSourceRating());

            var source = _sourceRepository.Find(waterSourceRating.WaterSourceId);

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

            _ratingRepository.SaveChanges();
        }

        public void UpdateAccessibility(AccessibilityEntity accessibilityEntity)
        {
            var waterSource = _sourceRepository.Find(accessibilityEntity.WaterSourceId);
            waterSource.Accessibility = accessibilityEntity.Accessibility;
            _sourceRepository.Update(waterSource);
            _sourceRepository.SaveChanges();
        }

        public WaterSourceProperties GetSourceProperties(int sourceId)
        {
            var dbSource = _sourceRepository.Find(sourceId);

            return WaterSourceProperties.FromDbWaterSource(dbSource);
        }

        public void Update(GeometryEntity geometryEntity)
        {
            var dbSource = _sourceRepository.Find(geometryEntity.Id);
            dbSource.Shape = DbGeometry.FromText(geometryEntity.Geometry);
            _sourceRepository.Update(dbSource);
            _sourceRepository.SaveChanges();
        }
    }
}
