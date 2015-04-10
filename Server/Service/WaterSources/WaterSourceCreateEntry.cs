﻿using System.Data.Entity.Spatial;
using Data.Model;

namespace Service.WaterSources
{
    public class WaterSourceCreateEntry
    {
        public string ShapeWkt { get; set; }
        public string SourceType { get; set; }

        public DbWaterSource ToDbWaterSource()
        {
            return new DbWaterSource(DbGeometry.FromText(ShapeWkt), SourceType);
        }
    }
}
