using System.Collections.Generic;
using Data.Model.Constants;

namespace Service.WaterSourceSubscription
{
    public class SubscriptionEntry
    {
        public int SourceId { get; set; }
        public string Geometry { get; set; }
        public List<WaterSubscriptionType> SubscriptionTypes { get; set; }
    }
}
