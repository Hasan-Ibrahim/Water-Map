using System;
using Data.Model.Constants;
using Service.WaterSources;

namespace Service.Notifications
{
    public class NotificationService : IDisposable
    {

        public void SendQualityChangeNotification(Potability oldMajorRate, Potability newMajorRate)
        {
            if (oldMajorRate != newMajorRate)
            {
                
            }
        }

        public void Dispose()
        {
            
        }

        public void SendAccessibilityChangeNotification(AccessibilityEntity accessibilityEntity)
        {
            
        }
    }
}
