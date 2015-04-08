using System.ComponentModel.DataAnnotations.Schema;
using System.Data.Entity.Spatial;

namespace Data.Model
{
    [Table("WaterSource")]
    public class DbWaterSource : DbModel
    {
        public string SourceType { get; set; }
        public DbGeometry Geometry { get; set; }
    }
}
