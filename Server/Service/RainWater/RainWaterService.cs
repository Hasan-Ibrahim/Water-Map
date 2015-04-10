using System;
using Data.Model;
using Data.Repositories.Abstraction;

namespace Service.RainWater
{
    public class RainWaterService : IDisposable
    {
        private readonly IRepository<DbRainHarvestTank> _rainHarvestTankRepository;

        public RainWaterService(IRepository<DbRainHarvestTank> rainHarvestTankRepository)
        {
            _rainHarvestTankRepository = rainHarvestTankRepository;
        }

        public void Dispose()
        {
            _rainHarvestTankRepository.Dispose();
        }

        public DbRainHarvestTank AddRainHarvestTank(RainHarvestTankEntry rainHarvestTankEntry)
        {
            var dbRainHarvestTank = rainHarvestTankEntry.ToDbRainHarvestTank();
            _rainHarvestTankRepository.Create(dbRainHarvestTank);
            _rainHarvestTankRepository.SaveChanges();
            return dbRainHarvestTank;
        }
    }
}
