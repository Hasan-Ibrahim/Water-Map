using System.Threading.Tasks;
using System.Web.Http;
using Api.AccessControl;
using Api.AccessControl.Attribtues;
using Service.Account;
using Service.Profile;

namespace Api.Controllers
{
    [TokenAuthorize]
    public class UserProfileController : ApiController
    {
        private readonly ProfileService _profileService;
        private readonly ActiveUser _activeUser;

        public UserProfileController(ProfileService profileService,
            ActiveUser activeUser)
        {
            _profileService = profileService;
            _activeUser = activeUser;
        }

        [HttpGet]
        [OverrideAuthorization]
        public UserProfile GetUserProfile()
        {
            var userProfile = _profileService.GetProfile(_activeUser.UserId);
            return userProfile;
        }

        [HttpPost]
        public IHttpActionResult UpdateUserProfile([FromBody]ProfileUpdate update)
        {
            var updated = false;
            if (ModelState.IsValid)
            {
                updated = _profileService.UpdateProfile(_activeUser.UserId, update);
            }
            if (updated)
            {
                return Ok();
            }

            return BadRequest("Invalid data");
        }

        protected override void Dispose(bool disposing)
        {
            _profileService.Dispose();
            base.Dispose(disposing);
        }
    }
}
