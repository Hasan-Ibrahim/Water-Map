using System.ComponentModel.DataAnnotations.Schema;
using System.Data.Entity.Spatial;
using Data.Model.Base;
using Data.Model.Constants;

namespace Data.Model
{
    [Table("AreaSubscription")]
    public class DbAreaSubscription : DbModel
    {
        public int UserId { get; set; }
        public DbGeometry Area { get; set; }
        public WaterSubscriptionType Type { get; set; }

        public DbAreaSubscription()
        {
        }

        public DbAreaSubscription(int userId, DbGeometry area, WaterSubscriptionType type)
        {
            UserId = userId;
            Area = area;
            Type = type;
        }
    }
}
