using System;
using System.Collections.Generic;
using System.Data.Entity.Spatial;
using System.IO;
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
        private DbContextRepository<DbStressIndexGrid> _stressGridRepository;


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

            _stressGridRepository = new DbContextRepository<DbStressIndexGrid>(dbContext);
        }

        //[Test]
        public void ImportStressIndex()
        {
            using (var fileReader = new StreamReader("SEDAC_POP_2000-01-01_rgb_3600x1800.csv"))
            {
                var r = 0;
                for (r = 0; r < 1800; r++)
                {
                    var row = fileReader.ReadLine().Split(',');
                    Console.WriteLine("row {0}", r);
                    for (var c = 0; c < 3600; c++)
                    {
                        double stressIndex;
                        if (double.TryParse(row[c], out stressIndex))
                        {
                            var stressCell = new DbStressIndexGrid
                            {
                                Row = r,
                                Col = c,
                                StressIndex = stressIndex
                            };
                            _stressGridRepository.Create(stressCell);
                        }
                    }
                }
            }

            _stressGridRepository.SaveChanges();
            _stressGridRepository.Dispose();
        }

        // Do not run this if you do not know what it is!
        [Test]
        public void ImportRainHarvestData()
        {
            var random = new Random();
            // difX = 10, difY = 8
            var xMax = 90.683;
            var xMin = 80.000;
            var yMax = 40.617;
            var yMin = 30.900;

            var count = 3000;

            for (var i = 0; i < count; i++)
            {
                var x = (xMax - xMin) * random.NextDouble() + xMin;
                var y = (yMax - yMin) * random.NextDouble() + yMin;

                var location = string.Format("POINT({0} {1})", x, y);
                var area = random.Next(1, (int) ((y + x)/2)); //(xMax - x) * (yMax - y) + random.NextDouble() * 50 + 1;

                _rainWaterService.AddRainHarvestTank(new RainHarvestTankEntry
                {
                    Location = location,
                    AreaInSquareMetre = area
                });
            }
        }

        // Do not run this if you do not know what it is!
        //[Test]
        public void ImportData()
        {
            var sourceId = 81;

            var x = 90.3817;
            var y = 23.8019;

            var random = new Random();
            for (var i = 0; i < 15; i++)
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
