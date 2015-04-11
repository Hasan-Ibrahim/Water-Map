using Data.Model;

namespace Service.WaterSources
{
    public class WaterSourceProperties
    {
        public string SourceType { get; set; }
        public int PotableRatingCount { get; set; }
        public int ProcessableRatingCount { get; set; }
        public int UnpotableRatingCount { get; set; }
        public string[] ImageUrls { get; set; }

        public WaterSourceProperties()
        {
        }

        public WaterSourceProperties(DbWaterSource dbWaterSource)
        {
            SourceType = dbWaterSource.SourceType;
            PotableRatingCount = dbWaterSource.PotableRatingCount;
            ProcessableRatingCount = dbWaterSource.ProcessableRatingCount;
            UnpotableRatingCount = dbWaterSource.UnpotableRatingCount;
            ImageUrls = string.IsNullOrWhiteSpace(dbWaterSource.ImageUrls) ?
                dbWaterSource.ImageUrls.Split('^') : new string[] { };
        }

        public static WaterSourceProperties FromDbWaterSource(DbWaterSource dbWaterSource)
        {
            var imageUrls = string.IsNullOrWhiteSpace(dbWaterSource.ImageUrls)
                ? dbWaterSource.ImageUrls.Split('^')
                : new string[] {};
            return new WaterSourceProperties
            {
                SourceType = dbWaterSource.SourceType,
                PotableRatingCount = dbWaterSource.PotableRatingCount,
                ProcessableRatingCount = dbWaterSource.ProcessableRatingCount,
                UnpotableRatingCount = dbWaterSource.UnpotableRatingCount,
                ImageUrls = imageUrls
            };
        }
    }
}
