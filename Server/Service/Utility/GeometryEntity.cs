using Data.Model;
using Data.Model.Constants;

namespace Service.Utility
{
    public class GeometryEntity
    {
        public int Id { get; set; }
        public string Geometry { get; set; }
        public string SourceType { get; set; }
        public Potability MajorQuality { get; set; }
        
        public static GeometryEntity FromDbWaterSource(DbWaterSource dbWaterSource)
        {
            var majorQuality = Potability.Drinkable;
            var majorQualityValue = dbWaterSource.PotableRatingCount;
            if (majorQualityValue < dbWaterSource.ProcessableRatingCount)
            {
                majorQualityValue = dbWaterSource.ProcessableRatingCount;
                majorQuality = Potability.NeedTreatment;
            }
            if (majorQualityValue < dbWaterSource.UnpotableRatingCount)
            {
                majorQualityValue = dbWaterSource.UnpotableRatingCount;
                majorQuality = Potability.Undrinkable;
            }
            if (majorQualityValue < dbWaterSource.UnknownRatingCount)
            {
                majorQuality = Potability.Unknown;
            }

            return new GeometryEntity
            {
                Id = dbWaterSource.Id,
                Geometry = dbWaterSource.Shape.AsText(),
                SourceType = dbWaterSource.SourceType,
                MajorQuality = majorQuality
            };
        }
    }
}
