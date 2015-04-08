using System;
using Data.Model;
using Data.Model.Constants;
using Data.Repositories.Abstraction;

namespace Service.WaterSource
{
    public class WaterSourceService : IDisposable
    {
        private readonly Repository<DbWaterSource> _sourceRepository;
        private readonly Repository<DbWaterSourceRating> _ratingRepository;

        public WaterSourceService(Repository<DbWaterSource> sourceRepository, Repository<DbWaterSourceRating> ratingRepository)
        {
            _sourceRepository = sourceRepository;
            _ratingRepository = ratingRepository;
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

        public void Dispose()
        {
            _sourceRepository.Dispose();
            _ratingRepository.Dispose();
        }

    }
}
