using System;
using System.Net;
using System.Web.Http;
using Api.AccessControl;
using Api.AccessControl.OAuth;
using Data.TokenStorages;
using Service.Account;
using Service.OAuth;

namespace Api.Controllers
{
    public class OAuthController : ApiController
    {
        private readonly ITokenStorage _tokenStorage;
        private readonly AuthenticationCookieHandler _cookieHandler;
        private readonly AccountService _service;
        private readonly GoogleOAuthClient _googleOAuthClient;

        private string GoogleRedirectUri { get { return Url.Content("GoogleSignInSuccess"); } }
        //private string FacebookRedirectUri { get { return Url.Content("FacebookSignInSuccess"); } }

        public OAuthController(ITokenStorage tokenStorage,
            AuthenticationCookieHandler cookieHandler,
            AccountService service,
            GoogleOAuthClient googleOAuthClient)
        {
            _tokenStorage = tokenStorage;
            _cookieHandler = cookieHandler;
            _service = service;
            _googleOAuthClient = googleOAuthClient;
        }

        [HttpGet]
        public IHttpActionResult GoogleSignIn(string clientRedirectUrl)
        {
            var url = _googleOAuthClient.GetSignInUrl(clientRedirectUrl, GoogleRedirectUri);
            return Redirect(url);
        }

        [HttpGet]
        public IHttpActionResult GoogleSignInSuccess([FromUri]OAuthResponseParameters parameters)
        {
            if (!parameters.HasError)
            {
                var oAuthTokenResponse = _googleOAuthClient.GetTokenResponse(parameters.Code, GoogleRedirectUri);

                var userInfo = _googleOAuthClient.GetUserInfo(oAuthTokenResponse.AccessToken);

                if (userInfo.Verified)
                {
                    if (!_service.UserExists(userInfo.UniqueId))
                    {
                        _service.CreateOAuthUser(userInfo);
                    }

                    var userId = _service.GetUserIdByLoginId(userInfo.UniqueId);
                    if (userId != 0)
                    {
                        var token = _tokenStorage.CreateToken(userId);
                        parameters.State = parameters.State.Replace("{token}", token);

                        return Redirect(parameters.State);
                    }
                }
            }

            return Redirect(parameters.State);
        }
/*

        [HttpGet]
        public IHttpActionResult FacebookSignIn(string clientRedirectUrl)
        {
            clientRedirectUrl = clientRedirectUrl == null ? "" : clientRedirectUrl.Replace("#", "%23");
            var url =
                string.Format("https://www.facebook.com/dialog/oauth?" +
                              "client_id={0}&" +
                              "response_type=code&" +
                              "scope=public_profile&" +
                              "redirect_uri={1}&" +
                              "state={2}"
                , _facebookClientId, FacebookRedirectUri, clientRedirectUrl);

            return Redirect(url);
        }

        [HttpGet]
        public IHttpActionResult FacebookSignInSuccess([FromUri] OAuthResponseParameters parameters)
        {
            var accessTokenQuery = HttpUtility.ParseQueryString(string.Empty);
            accessTokenQuery.Add("code", parameters.Code);
            accessTokenQuery.Add("client_id", _facebookClientId);
            accessTokenQuery.Add("client_secret", _facebookClientSecret);
            accessTokenQuery.Add("redirect_uri", FacebookRedirectUri);

            var url = "https://graph.facebook.com/oauth/access_token?" + accessTokenQuery; 
            var accessTokenRequest = WebRequest.Create(url);
            accessTokenRequest.Method = "GET";
            
            var responseText = new StreamReader(accessTokenRequest.GetResponse().GetResponseStream()).ReadToEnd();

            var accessToken = HttpUtility.ParseQueryString(responseText)["access_token"];

            var userDataQuery = HttpUtility.ParseQueryString(string.Empty);
            userDataQuery.Add("input_token", accessToken);
            userDataQuery.Add("access_token", _facebookClientId + "|" + _facebookClientSecret);
            var userDataRequest = WebRequest.Create("https://graph.facebook.com/debug_token?" + userDataQuery);

            var userDataString = new StreamReader(userDataRequest.GetResponse().GetResponseStream()).ReadToEnd();

            var userDataJson = new JavaScriptSerializer().Deserialize<FBData>(userDataString);
            var userInfo = userDataJson.FacebookUserInfo;

            if (userInfo.Verified)
            {
                if (!_service.UserExists(userInfo.UniqueId))
                {
                    _service.CreateOAuthUser(userInfo);
                }

                var userId = _service.GetUserIdByLoginId(userInfo.UniqueId);
                var token = _tokenStorage.CreateToken(userId);
                var returnResponse = _cookieHandler.GetAuthenticatedResponse(token);
                returnResponse.StatusCode = HttpStatusCode.Moved;
                parameters.State = parameters.State.Replace("{token}", token);
                returnResponse.Headers.Location = new Uri(parameters.State);

                return ResponseMessage(returnResponse);
            }

            return Ok(new FailedResponse("Email address is not verified"));
        }
*/

        protected override void Dispose(bool disposing)
        {
            _tokenStorage.Dispose();
            _service.Dispose();
            base.Dispose(disposing);
        }
    }
}