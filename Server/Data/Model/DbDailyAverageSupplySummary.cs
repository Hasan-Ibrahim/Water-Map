using System;
using System.ComponentModel.DataAnnotations.Schema;
using System.Data.Entity.Spatial;
using Data.Model.Base;

namespace Data.Model
{
    [Table("DailyAverageSupplySummary")]
    public class DbDailyAverageSupplySummary : DbModel
    {
        public Guid GroupId { get; set; }
        public DbGeometry Location { get; set; }
        public int SupplyInLitre { get; set; }
        public DateTime SupplyDate { get; set; }
        public int NumberOfPeople { get; set; }
        public double StressIndex { get; set; }

        public int Row { get; set; }
        public int Column { get; set; }
        
        public DbDailyAverageSupplySummary()
        {

        }

        public DbDailyAverageSupplySummary(Guid groupId, DbGeometry location, int supplyInLitre,
            DateTime supplyDate, int numberOfPeople, double stressIndex)
        {
            GroupId = groupId;
            SupplyInLitre = supplyInLitre;
            SupplyDate = supplyDate;
            NumberOfPeople = numberOfPeople;
            StressIndex = stressIndex;
            Location = location;
        }
    }
}
