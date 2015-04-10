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
        public string[] ImageUrls { get; set; }
        public Accessibility Accessibility { get; set; }

        public static WaterSourceProperties FromDbWaterSource(DbWaterSource dbWaterSource)
        {
            var imageUrls = string.IsNullOrWhiteSpace(dbWaterSource.ImageUrls)
                ? new string[] {}
                : dbWaterSource.ImageUrls.Split('^');

            double totalRatingPercent = dbWaterSource.PotableRatingCount + dbWaterSource.ProcessableRatingCount +
                                   dbWaterSource.UnpotableRatingCount + dbWaterSource.UnknownRatingCount;
            totalRatingPercent = totalRatingPercent / 100;

            totalRatingPercent = totalRatingPercent == 0 ? .000001 : totalRatingPercent;

            return new WaterSourceProperties
            {
                SourceType = dbWaterSource.SourceType,
                PotableRatingPercent = dbWaterSource.PotableRatingCount / totalRatingPercent,
                ProcessableRatingPercent = dbWaterSource.ProcessableRatingCount / totalRatingPercent,
                UnpotableRatingPercent = dbWaterSource.UnpotableRatingCount / totalRatingPercent,
                UnknownRatingPercent = dbWaterSource.UnpotableRatingCount / totalRatingPercent,
                ImageUrls = imageUrls,
                Accessibility = dbWaterSource.Accessibility
            };
        }
    }
}
