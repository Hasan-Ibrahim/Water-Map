using System.ComponentModel.DataAnnotations.Schema;
using Data.Model.Base;
using Data.Model.Constants;

namespace Data.Model
{
    [Table("WaterSourceRating")]
    public class DbWaterSourceRating : DbModel
    {
        public int WaterSourceId { get; set; }
        public Potability Potability { get; set; }
        public int? UserId { get; set; }
    }
}
