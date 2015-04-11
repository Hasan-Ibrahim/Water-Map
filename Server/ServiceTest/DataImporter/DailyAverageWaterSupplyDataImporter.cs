using System;
using System.Collections.Generic;
using Data.Context;
using Data.Model;
using Data.Model.Views;
using Data.Repositories.Abstraction;
using NUnit.Framework;
using Service.RainWater;
using Service.WaterSupply;

namespace ServiceTest.DataImporter
{
    [TestFixture]
    public class DailyAverageWaterSupplyDataImporter
    {
        private DailySupplyService _dailySupplyService;
        private RainWaterService _rainWaterService;
        [SetUp]
        public void Setup()
        {
            var dbContext = new AppDbContext("Server=localhost;Database=Jantrik.WaterQuest;User Id=sa;Password=sa;MultipleActiveResultSets=true");
            _dailySupplyService = new DailySupplyService(
                new DbContextRepository<DbDailyAverageSupply>(dbContext),
                new DbContextRepository<DbDailyAverageSupplySummary>(dbContext),
                new DbContextRepository<DbSourceSummaryGrid>(dbContext));

            _rainWaterService = new RainWaterService(
                new DbContextRepository<DbRainHarvestTank>(dbContext), null, null);
        }

        // Do not run this if you do not know what it is!
        [Test]
        public void ImportRainHarvestData()
        {
            var random = new Random();
            var xMax = 92.683;
            var xMin = 88.000;
            var yMax = 26.617;
            var yMin = 21.900;

            var count = 1500;

            for (var i = 0; i < count; i++)
            {
                _rainWaterService.AddRainHarvestTank(new RainHarvestTankEntry
                {
                    Location = string.Format("POINT({0} {1})", (xMax - xMin) * random.NextDouble() + xMin, (yMax - yMin) * random.NextDouble() + yMin),
                    AreaInSquareMetre = random.NextDouble() * 30 + 1
                });
            }
        }

        // Do not run this if you do not know what it is!
        //[Test]
        public void ImportData()
        {
            var sourceId = 22;

            var x = 90.4523277282715;
            var y = 23.894862543573097;

            var random = new Random();
            for (var i = 0; i < 10; i++)
            {
                var population = random.Next(1, 10);
                var sourceCount = random.Next(1, 4);
                var avgLoadPerSource = (50 * population) / sourceCount;

                var supply = new List<SupplyPerSource>();

                for (var j = 0; j < sourceCount; j++)
                {
                    supply.Add(new SupplyPerSource { SourceId = sourceId, Supply = random.Next(1, avgLoadPerSource * 2) });
                }

                var location = string.Format("POINT ({0} {1})", x + (.02 - random.NextDouble() * .04), y + (.02 - random.NextDouble() * .04));
                var date = new DateTime(random.Next(2012, 2014), random.Next(1, 12), random.Next(1, 28));

                var dse = new DailySupplyEntry
                {
                    NumberOfPeople = random.Next(1, 10),
                    Supply = supply,
                    Location = location,
                    SupplyDate = date
                };
                _dailySupplyService.AddSupply(dse);
            }
        }
    }
}
