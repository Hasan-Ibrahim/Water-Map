using System;
using System.Collections.Generic;
using System.Web.Http;
using Service.WaterSupply;

namespace Api.Controllers
{
    public class DailySupplyController : ApiController
    {
        private readonly DailySupplyService _dailySupplyService;

        public DailySupplyController(DailySupplyService dailySupplyService)
        {
            _dailySupplyService = dailySupplyService;
        }

        [HttpGet]
        public IEnumerable<StressByLocation> GetStressByLocation(DateTime fromDate, DateTime toDate)
        {
            return _dailySupplyService.GetStressByLocation(fromDate, toDate);
        }

        [HttpPost]
        public void AddDailyAverageWaterSupply(DailySupplyEntry dailySupplyEntry)
        {
            _dailySupplyService.AddSupply(dailySupplyEntry);
        }
    }
}