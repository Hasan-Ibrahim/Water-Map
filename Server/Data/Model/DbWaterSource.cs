using System.ComponentModel.DataAnnotations.Schema;
using System.Data.Entity.Spatial;
using Data.Model.Base;
using Data.Model.Constants;

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
        public int UnknownRatingCount { get; set; }
        public Accessibility Accessibility { get; set; }

        /// <summary>
        /// A list of image urls separated by '^' character
        /// </summary>
        public string ImageUrls { get; set; }

        public DbWaterSource(DbGeometry shape, string sourceType)
        {
            Shape = shape;
            SourceType = sourceType;
            PotableRatingCount = 0;
            ProcessableRatingCount = 0;
            UnpotableRatingCount = 0;
        }

        public DbWaterSource()
        {
        }
    }
}
