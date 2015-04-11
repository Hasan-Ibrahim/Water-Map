﻿using System.Collections.Generic;
using Data.Model.Constants;

namespace Service.WaterSourceSubscription
{
    public class AreaSubscription
    {
        public string Geometry { get; set; }
        public IList<WaterSubscriptionType> SubscriptionTypes { get; set; }
    }
}
