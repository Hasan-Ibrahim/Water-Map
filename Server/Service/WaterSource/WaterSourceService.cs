using System;
using Data.Model;
using Data.Repositories.Abstraction;

namespace Service.WaterSource
{
    public class WaterSourceService : IDisposable
    {
        private readonly Repository<DbWaterSource> _sourceRepository;

        public WaterSourceService(Repository<DbWaterSource> sourceRepository)
        {
            _sourceRepository = sourceRepository;
        }

        public void AddWaterSource(WaterSourceCreateEntry waterSourceCreationModel)
        {
            var dbWaterSource = waterSourceCreationModel.ToDbWaterSource();
            _sourceRepository.Create(dbWaterSource);
            _sourceRepository.SaveChanges();
        }

        public void Dispose()
        {
            _sourceRepository.Dispose();
        }
    }
}
