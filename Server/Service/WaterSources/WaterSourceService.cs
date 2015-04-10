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

        public void AddWaterSource(WaterSourceCreateEntry waterSourceCreationModel)
        {
            var dbWaterSource = waterSourceCreationModel.ToDbWaterSource();
            _sourceRepository.Create(dbWaterSource);
            _sourceRepository.SaveChanges();
        }

        public void RateWaterSource(WaterSourceRating waterSourceRating)
        {
            _ratingRepository.Create(waterSourceRating.ToDbWaterSourceRating());
            
            var source = _sourceRepository.Find(waterSourceRating.WaterSourceId);

            switch (waterSourceRating.Potability)
            {
                case Potability.Potable:
                    source.PotableRatingCount++;
                    break;
                case Potability.Processable:
                    source.ProcessableRatingCount++;
                    break;
                case Potability.Unpotable:
                    source.UnpotableRatingCount++;
                    break;
            }

            _ratingRepository.SaveChanges();
        }
        
        public WaterSourceProperties GetSourceProperties(int sourceId)
        {
            var dbSource = _sourceRepository.Find(sourceId);

            return WaterSourceProperties.FromDbWaterSource(dbSource);
        }
    }
}
