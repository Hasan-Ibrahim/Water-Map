using System.ComponentModel.DataAnnotations.Schema;
using Data.Model.Base;
using Data.Model.Constants;

namespace Data.Model
{
    [Table("WaterSourceSubscription")]
    public class DbWaterSourceSubscription : DbModel
    {
        public int UserId { get; set; }
        public int SourceId { get; set; }

        /// <summary>
        /// Types are identified by bit positions of flag
        /// </summary>
        public SourceSubscriptionType Type { get; set; }

        public DbWaterSourceSubscription()
        {
        }

        public DbWaterSourceSubscription(int userId, int sourceId, SourceSubscriptionType type)
        {
            UserId = userId;
            SourceId = sourceId;
            Type = type;
        }
    }
}
