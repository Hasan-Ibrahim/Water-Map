using System.Collections.Generic;
using Data.Model.Constants;

namespace Service.WaterSourceSubscription
{
    public class SourceSubscription
    {
        public int SourceId { get; set; }
        public Dictionary<WaterSubscriptionType, bool> Subscriptions { get; set; }
    }
}
