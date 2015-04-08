using System;
using System.Collections.Generic;

namespace Service.WaterSupply
{
    public class DailySupplyEntry
    {
        public DateTime SupplyDate { get; set; }
        public string LocationWkt { get; set; }
        public int NumberOfPeople { get; set; }
        public IList<SupplyPerSource> Supply { get; set; }
    }
}
