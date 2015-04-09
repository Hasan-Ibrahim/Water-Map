using Data.Model;

namespace Service.WaterSource
{
    public class WaterSource
    {
        public string SourceType { get; set; }
        public string ShapeWkt { get; set; }
        public int PotableRatingCount { get; set; }
        public int ProcessableRatingCount { get; set; }
        public int UnpotableRatingCount { get; set; }
        public string[] ImageUrls { get; set; }

        public WaterSource()
        {
        }

        public WaterSource(DbWaterSource dbWaterSource)
        {
            SourceType = dbWaterSource.SourceType;
            ShapeWkt = dbWaterSource.Shape.AsText();
            PotableRatingCount = dbWaterSource.PotableRatingCount;
            ProcessableRatingCount = dbWaterSource.ProcessableRatingCount;
            UnpotableRatingCount = dbWaterSource.UnpotableRatingCount;
            ImageUrls = string.IsNullOrWhiteSpace(dbWaterSource.ImageUrls) ?
                dbWaterSource.ImageUrls.Split('^') : new string[] { };
        }

        public static WaterSource FromDbWaterSource(DbWaterSource dbWaterSource)
        {
            var imageUrls = string.IsNullOrWhiteSpace(dbWaterSource.ImageUrls)
                ? dbWaterSource.ImageUrls.Split('^')
                : new string[] {};
            return new WaterSource
            {
                SourceType = dbWaterSource.SourceType,
                ShapeWkt = dbWaterSource.Shape.AsText(),
                PotableRatingCount = dbWaterSource.PotableRatingCount,
                ProcessableRatingCount = dbWaterSource.ProcessableRatingCount,
                UnpotableRatingCount = dbWaterSource.UnpotableRatingCount,
                ImageUrls = imageUrls
            };
        }
    }
}
