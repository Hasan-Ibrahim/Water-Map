using System.Data.Entity.Spatial;
using Data.Model;

namespace Service.RainWater
{
    public class RainHarvestTankEntry
    {
        public string Location { get; set; }
        public double AreaInSquareMetre { get; set; }

        public DbRainHarvestTank ToDbRainHarvestTank()
        {
            return new DbRainHarvestTank
            {
                Location = DbGeometry.FromText(Location),
                AreaInSquareMetre = AreaInSquareMetre
            };
        }
    }
}
