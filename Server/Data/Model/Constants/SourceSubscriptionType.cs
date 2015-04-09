using System;

namespace Data.Model.Constants
{
    [Flags]
    public enum SourceSubscriptionType
    {
        Quality = 1,
        Accessibility = 2,
        DryOut = 4,
        Damages = 8,
        WaterStressIndex = 16
    }
}
