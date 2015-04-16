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
        private readonly RainWaterHarvest _rainWaterHarvest;

        public RainWaterService(IRepository<DbRainHarvestTank> rainHarvestTankRepository,
            IRepository<DbRainHarvestTankGrid> gridRepository,
            RainWaterHarvest rainWaterHarvest)
        {
            _rainHarvestTankRepository = rainHarvestTankRepository;
            _gridRepository = gridRepository;
            _rainWaterHarvest = rainWaterHarvest;
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

        public Dictionary<int, Dictionary<int, double>> GetRainHarvestGrid()
        {
            var grid = new Dictionary<int, IDictionary<int, double>>();
            foreach (var gridCell in _gridRepository.GetAll())
            {
                var row = grid.GetEnsure(gridCell.Row, new Dictionary<int, double>());
                row[gridCell.Col] = (double) gridCell.AreaInSquareMetre;
            }
            
            return _rainWaterHarvest.CalculateRainWaterHarvest(grid);
        }
    }
}
