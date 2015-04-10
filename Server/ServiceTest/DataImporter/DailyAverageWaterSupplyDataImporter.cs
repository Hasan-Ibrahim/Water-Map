using System;
using System.Collections.Generic;
using System.Data.Entity.Spatial;
using Data.Context;
using Data.Model;
using Data.Model.Views;
using Data.Repositories.Abstraction;
using NUnit.Framework;
using Service.WaterSources;
using Service.WaterSupply;

namespace ServiceTest.DataImporter
{
    [TestFixture]
    public class DailyAverageWaterSupplyDataImporter
    {
        private DailySupplyService _dailySupplyService;
        [SetUp]
        public void Setup()
        {
            var dbContext = new AppDbContext("Server=localhost;Database=Jantrik.WaterQuest;User Id=sa;Password=sa;MultipleActiveResultSets=true");
            _dailySupplyService = new DailySupplyService(
                new DbContextRepository<DbDailyAverageSupply>(dbContext),
                new DbContextRepository<DbDailyAverageSupplySummary>(dbContext),
                new DbContextRepository<DbSourceSummaryGrid>(dbContext));
        }

        [TearDown]
        public void TearDown()
        {
            _dailySupplyService.Dispose();
        }

        // [Test] Do not run this if you do not know what it is!
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
