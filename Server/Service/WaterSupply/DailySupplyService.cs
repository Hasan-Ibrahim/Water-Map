﻿using System;
using System.Collections.Generic;
using System.Data.Entity.Spatial;
using System.Linq;
using Data.Model;
using Data.Model.Views;
using Data.Repositories.Abstraction;
using Service.Constants;
using Service.Utility;

namespace Service.WaterSupply
{
    public class DailySupplyService : IDisposable
    {
        private readonly IRepository<DbDailyAverageSupply> _supplyRepository;
        private readonly IRepository<DbDailyAverageSupplySummary> _summaryRepository;
        private readonly IRepository<DbSourceSummaryGrid> _gridRepository;

        public DailySupplyService(IRepository<DbDailyAverageSupply> supplyRepository,
            IRepository<DbDailyAverageSupplySummary> summaryRepository,
            IRepository<DbSourceSummaryGrid> gridRepository)
        {
            _supplyRepository = supplyRepository;
            _summaryRepository = summaryRepository;
            _gridRepository = gridRepository;
        }

        public void Dispose()
        {
            _supplyRepository.Dispose();
            _summaryRepository.Dispose();
        }

        public Dictionary<int, Dictionary<int, int[]>> GetWaterSourceSummaryGrid()
        {
            var data = new Dictionary<int, Dictionary<int, int[]>>();

            foreach (var gridData in _gridRepository.GetAll())
            {
                var rowData = data.GetEnsure(gridData.Row, new Dictionary<int, int[]>());
                rowData[gridData.Col] = new[] { gridData.SupplyInLitre, gridData.NumberOfPeople };
            }

            return data;
        }

        public void AddSupply(DailySupplyEntry dailySupply)
        {
            var groupId = Guid.NewGuid();
            var location = DbGeometry.FromText(dailySupply.Location);
            foreach (var supplyPerSource in dailySupply.Supply)
            {
                var dbDailyAverageSupply = new DbDailyAverageSupply(groupId, location, supplyPerSource.Supply, dailySupply.SupplyDate, dailySupply.NumberOfPeople, supplyPerSource.SourceId);
                _supplyRepository.Create(dbDailyAverageSupply);
            }

            var totalSupply = dailySupply.Supply.Sum(supply => supply.Supply);
            var stress = (1.0 * WaterSupplyConstant.PerPersonDailyWaterRequirmentInLitre) / (totalSupply * dailySupply.NumberOfPeople);
            var dbSummary = new DbDailyAverageSupplySummary(groupId, location, totalSupply, dailySupply.SupplyDate, dailySupply.NumberOfPeople, stress);

            _summaryRepository.Create(dbSummary);

            _supplyRepository.SaveChanges();
            _summaryRepository.SaveChanges();
        }

        public IEnumerable<StressByLocation> GetStressByLocation(DateTime from, DateTime to)
        {
            return _summaryRepository.Where(summary => summary.SupplyDate >= from && summary.SupplyDate <= to)
                .Select(StressByLocation.FromDbDailyAverageSupplySummary);
        }

        public Dictionary<string, List<string>> GetSuppliedLocationsForSource(int sourceId)
        {
            var allData = new Dictionary<string, List<string>>();
            foreach (var supply in _supplyRepository.Where(supply => supply.SourceId == sourceId))
            {
                var dateData = allData.GetEnsure(supply.SupplyDate.Date.ToString("yyyy-MM-dd"), new List<string>());
                dateData.Add(supply.Location.AsText());
            }

            return allData;
        }
    }
}
