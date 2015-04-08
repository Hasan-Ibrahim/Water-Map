using System;
using System.ComponentModel.DataAnnotations.Schema;
using System.Data.Entity.Spatial;

namespace Data.Model
{
    [Table("DailyAverageSupply")]
    public class DbDailyAverageSupply : DbModel
    {
        public Guid GroupId { get; set; }
        public DbGeometry Location { get; set; }
        public int SupplyInLitre { get; set; }
        public DateTime SupplyDate { get; set; }
        public int NumberOfPeople { get; set; }
        public int SourceId { get; set; }

        public DbDailyAverageSupply()
        {
        }

        public DbDailyAverageSupply(Guid groupId, DbGeometry location, int supplyInLitre, 
            DateTime supplyDate, int numberOfPeople, int sourceId)
        {
            GroupId = groupId;
            SupplyInLitre = supplyInLitre;
            SupplyDate = supplyDate;
            NumberOfPeople = numberOfPeople;
            SourceId = sourceId;
            Location = location;
        }
    }
}
