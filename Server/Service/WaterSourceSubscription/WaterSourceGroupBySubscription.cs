using System.Collections.Generic;
using Service.Utility;
using Service.WaterSources;

namespace Service.WaterSourceSubscription
{
    public class WaterSourceGroupBySubscription
    {
        public IEnumerable<WaterSource> MySources { get; set; }
        public IEnumerable<WaterSource> OthersSources { get; set; }
    }
}
