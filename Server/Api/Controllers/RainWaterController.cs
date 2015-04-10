using System.Web.Http;
using Service.RainWater;

namespace Api.Controllers
{
    public class RainWaterController : ApiController
    {
        private readonly RainWaterService _rainWaterService;

        public RainWaterController(RainWaterService rainWaterService)
        {
            _rainWaterService = rainWaterService;
        }

        protected override void Dispose(bool disposing)
        {
            _rainWaterService.Dispose();
            base.Dispose(disposing);
        }

        [HttpPost]
        public IHttpActionResult AddRainHarvestTank(RainHarvestTankEntry rainHarvestTankEntry)
        {
            return Ok(_rainWaterService.AddRainHarvestTank(rainHarvestTankEntry));
        }
    }
}