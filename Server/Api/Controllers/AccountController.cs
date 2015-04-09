using System.Net.Http;
using Api.AccessControl;
using Api.AccessControl.Attribtues;
using Data.TokenStorages;
using Service.Account;
using Service.Constants;
using Service.Responses;
using System.Web.Http;

namespace Api.Controllers
{
    public class AccountController : ApiController
    {
        private readonly AccountService _service;
        private readonly ITokenStorage _tokenStorage;
        private readonly ActiveUser _activeUser;
        private readonly AuthenticationCookieHandler _cookieHandler;

        public AccountController(AccountService service,
            ITokenStorage tokenStorage,
            ActiveUser activeUser,
            AuthenticationCookieHandler cookieHandler)
        {
            _service = service;
            _tokenStorage = tokenStorage;
            _activeUser = activeUser;
            _cookieHandler = cookieHandler;
        }


        [HttpPost]
        [TokenUnLoggedIn]
        public IHttpActionResult Login([FromBody]Login login)
        {
            if (_service.ValidateUser(login))
            {
                var userId = _service.GetUserIdByLoginId(login.LoginId);
                if (userId != 0)
                {
                    var token = _tokenStorage.CreateToken(userId);
                    
                    return Ok(new TokenResponse(token, login.RememberMe));
                }
            }
            return BadRequest("Username or Password does not match");
        }

        [HttpPost]
        [TokenUnLoggedIn]
        public IHttpActionResult Register([FromBody]Registration registration)
        {
            if (ModelState.IsValid)
            {
                var status = _service.CreateUser(registration);

                var message = Messages.CreateUserMessages[status];
                if (status == DataUpdateStatus.Success)
                {
                    return Ok();
                }
                else
                {
                    return BadRequest(message);
                }
            }
           
            return BadRequest("Invalid data");
        }

        [HttpPost]
        public IHttpActionResult RenewToken([FromBody]AuthToken authToken)
        {
            if (_tokenStorage.TokenExists(authToken.Token).Result)
            {
                var newToken = _tokenStorage.RenewToken(authToken.Token);
                return Ok(new TokenResponse(newToken, true));
            }

            return Ok(new FailedResponse("Invalid token"));
        }

        [HttpGet]
        //[TokenAuthorize]
        public bool Logout()
        {
            return _tokenStorage.DeleteToken(_activeUser.Token);
        }

        [HttpPost]
        [TokenAuthorize]
        public IHttpActionResult ChangePassword(ChangePassword changePassword)
        {
            var status = _service.ChangeUserPassword(_activeUser.UserId, changePassword);
            var message = Messages.ChangePasswordMessages[status];
            if (status == DataUpdateStatus.Success)
            {
                return Ok();
            }
            return BadRequest(message);
        }

        protected override void Dispose(bool disposing)
        {
            _service.Dispose();
            _tokenStorage.Dispose();
            base.Dispose(disposing);
        }
    }
}
