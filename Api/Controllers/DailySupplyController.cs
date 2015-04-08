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
        public IEnumerable<StressByLocation> GetStressByLocation()
        {
            return _dailySupplyService.GetStressByLocation(new DateTime(2011, 1, 1), new DateTime(2015, 1, 1));
        } 
    }
}