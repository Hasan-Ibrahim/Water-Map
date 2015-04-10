using Data.Model;
using Data.Model.Constants;

namespace Service.WaterSources
{
    public class WaterSourceRating
    {
        public int WaterSourceId { get; set; }
        public Potability Potability { get; set; }

        public DbWaterSourceRating ToDbWaterSourceRating()
        {
            return new DbWaterSourceRating(WaterSourceId, Potability);
        }
    }
}
