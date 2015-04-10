using System.Collections.Generic;
using System.Web.Http;
using Service.Utility;
using Service.WaterSources;

namespace Api.Controllers
{
    public class WaterSourceController : ApiController
    {
        private readonly WaterSourceService _waterSourceService;

        public WaterSourceController(WaterSourceService waterSourceService)
        {
            _waterSourceService = waterSourceService;
        }

        [HttpGet]
        public WaterSourceProperties GetSourceProperties(int sourceId)
        {
            var properties = _waterSourceService.GetSourceProperties(sourceId);

            return properties;
        }

        [HttpPost]
        public IHttpActionResult UpdateWaterSource(GeometryEntity geometryEntity)
        {
            _waterSourceService.Update(geometryEntity);
            return Ok(geometryEntity);
        }

        [HttpGet]
        public IEnumerable<GeometryEntity> GetWaterSources(string bBoxWkt)
        {
            return _waterSourceService.GetWaterSources(bBoxWkt);
        }

        [HttpPost]
        public GeometryEntity AddWaterSource(WaterSourceCreateEntry waterSourceCreationModel)
        {
            return _waterSourceService.AddWaterSource(waterSourceCreationModel);
        }

        [HttpPost]
        public IHttpActionResult RateWaterSource(WaterSourceRating rating)
        {
            _waterSourceService.RateWaterSource(rating);
            return Ok(rating);
        }

        [HttpPost]
        public IHttpActionResult UpdateAccessibility(AccessibilityEntity accessibilityEntity)
        {
            _waterSourceService.UpdateAccessibility(accessibilityEntity);

            return Ok(accessibilityEntity);
        }

        protected override void Dispose(bool disposing)
        {
            _waterSourceService.Dispose();
            base.Dispose(disposing);
        }
    }
}