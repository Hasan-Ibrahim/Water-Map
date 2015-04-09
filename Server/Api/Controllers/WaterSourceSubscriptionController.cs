using System.Web.Http;
using Api.AccessControl;
using Api.AccessControl.Attribtues;
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

        [TokenAuthorize]
        [HttpPost]
        public void Subscribe(SubscriptionEntry subscriptionEntry)
        {
            _subscriptionService.Subscribe(subscriptionEntry, _activeUser.UserId);
        }

        protected override void Dispose(bool disposing)
        {
            _subscriptionService.Dispose();
            base.Dispose(disposing);
        }
    }
}