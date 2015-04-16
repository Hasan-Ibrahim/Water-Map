using System;
using System.ComponentModel.DataAnnotations.Schema;
using Data.Model.Base;

namespace Data.Model.Views
{
    [Table("RainHarvestTankGrid")]
    public class DbRainHarvestTankGrid : DbModel
    {
        public int Row { get; set; }
        public int Col { get; set; }
        public decimal AreaInSquareMetre { get; set; }
        
        [NotMapped]
        public override DateTime CreationTime { get; set; }

        [NotMapped]
        public override DateTime LastUpdateTime { get; set; }
    }
}
