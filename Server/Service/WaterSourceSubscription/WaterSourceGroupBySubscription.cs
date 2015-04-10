using System.Collections.Generic;
using Service.Utility;

namespace Service.WaterSourceSubscription
{
    public class WaterSourceGroupBySubscription
    {
        public IEnumerable<GeometryEntity> MySources { get; set; }
        public IEnumerable<GeometryEntity> OthersSources { get; set; }
    }
}
