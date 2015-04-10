using System;
using System.Collections.Generic;
using System.Net.Http;
using System.Web;
using System.Web.Http;

namespace FileServerApi.Controllers
{
    public class ImageController : ApiController
    {
        [HttpPost]
        public IHttpActionResult UploadImage()
        {
            var httpRequest = HttpContext.Current.Request;

            var imageBaseUrl = Request.RequestUri.Scheme + "://" + Request.RequestUri.Authority +
                            Request.GetRequestContext().VirtualPathRoot+"/images/";

            var imagesPaths = new List<String>();

            for (var i = 0; i < httpRequest.Files.Count; i++)
            {
                var imageName = Guid.NewGuid() + ".jpeg";
                var imagePath = HttpContext.Current.Server.MapPath("~/Images/" + imageName);
                var postedFile = httpRequest.Files[i];
                if (postedFile != null)
                {
                    postedFile.SaveAs(imagePath);
                    imagesPaths.Add(imageBaseUrl + imageName);
                }
            }
               
            return Ok(new { imagesPaths });
        }
    }
}
