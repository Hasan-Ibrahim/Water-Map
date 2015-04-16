using Data.Model;
using Data.Model.Constants;

namespace Service.WaterSources
{
    public class WaterSourceProperties
    {
        public string SourceType { get; set; }
        public double PotableRatingPercent { get; set; }
        public double ProcessableRatingPercent { get; set; }
        public double UnpotableRatingPercent { get; set; }
        public double UnknownRatingPercent { get; set; }
        public int TotalRatings { get; set; }
        public string[] ImageUrls { get; set; }
        public Accessibility Accessibility { get; set; }

        public static WaterSourceProperties FromDbWaterSource(DbWaterSource dbWaterSource)
        {
            var imageUrls = string.IsNullOrWhiteSpace(dbWaterSource.ImageUrls)
                ? new string[] {}
                : dbWaterSource.ImageUrls.Split('^');

            var totalRatings = dbWaterSource.PotableRatingCount + dbWaterSource.ProcessableRatingCount +
                             dbWaterSource.UnpotableRatingCount + dbWaterSource.UnknownRatingCount;

            var totalRatingPercent = totalRatings == 0 ? 0.0001 : totalRatings/100.0;

            return new WaterSourceProperties
            {
                SourceType = dbWaterSource.SourceType,
                PotableRatingPercent = dbWaterSource.PotableRatingCount / totalRatingPercent,
                ProcessableRatingPercent = dbWaterSource.ProcessableRatingCount / totalRatingPercent,
                UnpotableRatingPercent = dbWaterSource.UnpotableRatingCount / totalRatingPercent,
                UnknownRatingPercent = dbWaterSource.UnknownRatingCount / totalRatingPercent,
                ImageUrls = imageUrls,
                Accessibility = dbWaterSource.Accessibility,
                TotalRatings = totalRatings
            };
        }
    }
}
