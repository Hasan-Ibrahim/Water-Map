using System.Web.Http;
using Data.Model.Constants;
using Service.WaterSource;

namespace Api.Controllers
{
    public class WaterSourceController : ApiController
    {
        private readonly WaterSourceService _waterSourceService;

        public WaterSourceController(WaterSourceService waterSourceService)
        {
            _waterSourceService = waterSourceService;
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