using System.ComponentModel.DataAnnotations.Schema;
using System.Data.Entity.Spatial;
using Data.Model.Base;

namespace Data.Model
{
    [Table("RainHarvestTank")]
    public class DbRainHarvestTank : DbModel
    {
        public double AreaInSquareMetre { get; set; }
        public DbGeometry Location { get; set; }
    }
}
