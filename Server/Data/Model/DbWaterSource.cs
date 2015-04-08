using System.ComponentModel.DataAnnotations.Schema;
using System.Data.Entity.Spatial;
using Data.Model.Base;

namespace Data.Model
{
    [Table("WaterSource")]
    public class DbWaterSource : DbModel
    {
        public string SourceType { get; set; }
        public DbGeometry Shape { get; set; }
        public int PotableRatingCount { get; set; }
        public int ProcessableRatingCount { get; set; }
        public int UnpotableRatingCount { get; set; }
    }
}
