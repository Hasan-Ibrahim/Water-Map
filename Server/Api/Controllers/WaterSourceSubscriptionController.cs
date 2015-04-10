using System.Web.Http;
using Api.AccessControl;
using Api.AccessControl.Attribtues;
using Api.Models;
using Service.WaterSourceSubscription;

namespace Api.Controllers
{
    public class WaterSourceSubscriptionController : ApiController
    {
        private readonly ActiveUser _activeUser;
        private readonly WaterSourceSubscriptionService _subscriptionService;

        public WaterSourceSubscriptionController(
            ActiveUser activeUser,
            WaterSourceSubscriptionService subscriptionService)
        {
            _activeUser = activeUser;
            _subscriptionService = subscriptionService;
        }

        protected override void Dispose(bool disposing)
        {
            _subscriptionService.Dispose();
            base.Dispose(disposing);
        }

        [HttpGet]
        public IHttpActionResult GetWaterSources()
        {
            var sources = _subscriptionService.GetWaterSourcesBySubscription(_activeUser.UserId);
            return Ok(sources);
        }

        [TokenAuthorize]
        [HttpPost]
        public void Subscribe(SourceSubscription sourceSubscription)
        {
            _subscriptionService.Subscribe(sourceSubscription, _activeUser.UserId);
        }

        [TokenAuthorize]
        [HttpPost]
        public void Unsubscribe(IdParameter idParam)
        {
            _subscriptionService.Unsubscribe(idParam.Id, _activeUser.UserId);
        }

        [TokenAuthorize]
        [HttpPost]
        public void SubscribeToArea(AreaSubscription areaSubscription)
        {
            _subscriptionService.SubscribeToArea(areaSubscription, _activeUser.UserId);
        }

        [TokenAuthorize]
        [HttpPost]
        public void UnsubscribeFromArea(IdParameter idParameter)
        {
            _subscriptionService.UnsubscribeFromArea(idParameter.Id, _activeUser.UserId);
        }

    }
}