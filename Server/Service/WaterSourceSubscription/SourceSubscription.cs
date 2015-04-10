using System;
using System.Collections.Generic;
using Data.Model;
using Data.Model.Constants;

namespace Service.WaterSourceSubscription
{
    public class SourceSubscription
    {
        public int SourceId { get; set; }
        public Dictionary<WaterSubscriptionType, bool> Subscriptions { get; set; }

        public static SourceSubscription FromDbSubscription(DbWaterSourceSubscription dbSubscription)
        {
            var dic = new Dictionary<WaterSubscriptionType, bool>();
            foreach (WaterSubscriptionType st in Enum.GetValues(typeof(WaterSubscriptionType)))
            {
                dic[st] = dbSubscription.Type.HasFlag(st);
            }
            var subscription = new SourceSubscription { SourceId = dbSubscription.SourceId, Subscriptions = dic };

            return subscription;
        }
    }
}
