using System.Data.Entity.Spatial;

namespace Service.WaterSupply
{
    public class StressByLocation
    {
        public DbGeometry Location { get; set; }
        public double StressIndex { get; set; }

        public StressByLocation(DbGeometry location, double stressIndex)
        {
            Location = location;
            StressIndex = stressIndex;
        }
    }
}
