using System;
using System.Collections.Generic;
using Data.Model;
using Data.Model.Views;
using Data.Repositories.Abstraction;
using Service.Utility;

namespace Service.RainWater
{
    public class RainWaterService : IDisposable
    {
        private readonly IRepository<DbRainHarvestTank> _rainHarvestTankRepository;
        private readonly IRepository<DbRainHarvestTankGrid> _gridRepository;

        public RainWaterService(IRepository<DbRainHarvestTank> rainHarvestTankRepository,
            IRepository<DbRainHarvestTankGrid> gridRepository)
        {
            _rainHarvestTankRepository = rainHarvestTankRepository;
            _gridRepository = gridRepository;
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

        public IDictionary<int, IDictionary<int, decimal>> GetRainHarvestGrid()
        {
            var grid = new Dictionary<int, IDictionary<int, decimal>>();
            foreach (var gridCell in _gridRepository.GetAll())
            {
                var row = grid.GetEnsure(gridCell.Row, new Dictionary<int, decimal>());
                row[gridCell.Col] = gridCell.AreaInSquareMetre;
            }
            
            return grid;
        }
    }
}
