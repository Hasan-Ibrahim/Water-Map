using System;
using System.Collections.Generic;
using System.Linq;
using Data.Model;
using Data.Repositories.Abstraction;
using Service.Constants;

namespace Service.WaterSupply
{
    public class DailySupplyService : IDisposable
    {
        private readonly Repository<DbDailyAverageSupply> _supplyRepository;
        private readonly Repository<DbDailyAverageSupplySummary> _summaryRepository;

        public DailySupplyService(Repository<DbDailyAverageSupply> supplyRepository,
            Repository<DbDailyAverageSupplySummary> summaryRepository)
        {
            _supplyRepository = supplyRepository;
            _summaryRepository = summaryRepository;
        }

        public void AddSupply(DailySupplyEntry dailySupply)
        {
            var groupId = Guid.NewGuid();
            foreach (var supplyPerSource in dailySupply.Supply)
            {
                var dbDailyAverageSupply = new DbDailyAverageSupply(groupId, supplyPerSource.Supply, dailySupply.SupplyDate, dailySupply.NumberOfPeople, supplyPerSource.SourceId);
                _supplyRepository.Create(dbDailyAverageSupply);
            }
            var totalSupply = dailySupply.Supply.Sum(supply => supply.Supply);
            var stress = WaterSupplyConstant.PerPersonDailyWaterRequirmentInLitre / (totalSupply * dailySupply.NumberOfPeople);
            var dbSummary = new DbDailyAverageSupplySummary(groupId, totalSupply, dailySupply.SupplyDate, dailySupply.NumberOfPeople, stress);

            _summaryRepository.Create(dbSummary);

            _supplyRepository.SaveChanges();
            _summaryRepository.SaveChanges();
        }

        public IEnumerable<StressByLocation> GetStressByLocation(DateTime from, DateTime to)
        {
            return _summaryRepository.Where(summary => summary.SupplyDate >= from && summary.SupplyDate <= to)
                .Select(summary => new StressByLocation(summary.Location, summary.StressIndex));
        }

        public void Dispose()
        {
            _supplyRepository.Dispose();
            _summaryRepository.Dispose();
        }
    }
}
