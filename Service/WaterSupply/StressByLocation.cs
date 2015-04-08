using System.Data.Entity.Spatial;

namespace Service.WaterSupply
{
    public class StressByLocation
    {
        private readonly DbGeometry _location;

        public string LocationWkt { get { return _location.AsText(); } }
        public double StressIndex { get; set; }

        public StressByLocation(DbGeometry location, double stressIndex)
        {
            _location = location;
            StressIndex = stressIndex;
        }
    }
}
