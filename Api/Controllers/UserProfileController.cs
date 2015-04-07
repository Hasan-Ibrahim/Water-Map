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
        private readonly TokenUser _tokenUser;



        public UserProfileController(ProfileService profileService,
            TokenUser tokenUser)
        {
            _profileService = profileService;
            _tokenUser = tokenUser;
        }

        [HttpGet]
        [OverrideAuthorization]
        public ActiveUser GetUserProfile()
        {
            var userProfile = _profileService.GetProfile(_tokenUser.UserId);
            return userProfile;
        }

        [HttpGet]
        [OverrideAuthorization]
        public Task<string> GetUserAddress(int id)
        {
            return _profileService.GetAddress(id);
        }

        [HttpPost]
        public IHttpActionResult UpdateUserProfile([FromBody]ProfileUpdate update)
        {
            var updated = false;
            if (ModelState.IsValid)
            {
                updated = _profileService.UpdateProfile(_tokenUser.UserId, update);
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
