using System;
using System.ComponentModel.DataAnnotations.Schema;
using Data.Model.Base;

namespace Data.Model
{
    [Table("StressIndexGrid")]
    public class DbStressIndexGrid : DbModel
    {
        public int Row { get; set; }
        public int Col { get; set; }
        public double StressIndex { get; set; }

        [NotMapped]
        public override DateTime LastUpdateTime { get; set; }
        [NotMapped]
        public override DateTime CreationTime { get; set; }
    }
}
