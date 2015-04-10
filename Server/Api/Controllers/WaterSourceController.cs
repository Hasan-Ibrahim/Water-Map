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
        public IEnumerable<GeometryEntity> GetWaterSources(string bBoxWkt)
        {
            return _waterSourceService.GetWaterSources(bBoxWkt);
        }

        [HttpPost]
        public void AddWaterSource(WaterSourceCreateEntry waterSourceCreationModel)
        {
            _waterSourceService.AddWaterSource(waterSourceCreationModel);
        }

        [HttpPost]
        public void RateWaterSource(WaterSourceRating rating)
        {
            _waterSourceService.RateWaterSource(rating);
        }

        protected override void Dispose(bool disposing)
        {
            _waterSourceService.Dispose();
            base.Dispose(disposing);
        }
    }
}