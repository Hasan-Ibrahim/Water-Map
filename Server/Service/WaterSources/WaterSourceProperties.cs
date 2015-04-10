using Data.Model;
using Data.Model.Constants;

namespace Service.WaterSources
{
    public class WaterSourceProperties
    {
        public string SourceType { get; set; }
        public int PotableRatingCount { get; set; }
        public int ProcessableRatingCount { get; set; }
        public int UnpotableRatingCount { get; set; }
        public int UnknownRatingCount { get; set; }
        public string[] ImageUrls { get; set; }
        public Accessibility Accessibility { get; set; }

        public static WaterSourceProperties FromDbWaterSource(DbWaterSource dbWaterSource)
        {
            var imageUrls = string.IsNullOrWhiteSpace(dbWaterSource.ImageUrls)
                ? new string[] {}
                : dbWaterSource.ImageUrls.Split('^');
            return new WaterSourceProperties
            {
                SourceType = dbWaterSource.SourceType,
                PotableRatingCount = dbWaterSource.PotableRatingCount,
                ProcessableRatingCount = dbWaterSource.ProcessableRatingCount,
                UnpotableRatingCount = dbWaterSource.UnpotableRatingCount,
                UnknownRatingCount = dbWaterSource.UnpotableRatingCount,
                ImageUrls = imageUrls,
                Accessibility = dbWaterSource.Accessibility
            };
        }
    }
}
