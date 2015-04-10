using Data.Model;

namespace Service.Utility
{
    public class GeometryEntity
    {
        public int Id { get; set; }
        public string Geometry { get; set; }

        public static GeometryEntity FromDbWaterSource(DbWaterSource dbWaterSource)
        {
            return new GeometryEntity { Id = dbWaterSource.Id, Geometry = dbWaterSource.Shape.AsText() };
        }
    }
}
