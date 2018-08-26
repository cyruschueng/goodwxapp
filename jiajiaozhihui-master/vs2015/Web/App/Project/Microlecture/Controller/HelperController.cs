using System;
using System.Collections.Generic;
using System.Linq;
using System.Net;
using System.Net.Http;
using System.Web.Http;

namespace SfSoft.web.Microlecture.Controller
{
    [RoutePrefix("app/microlecture")]
    public class HelperController : ApiController
    {
        [HttpGet]
        [Route("helper/{id}")]
        public IHttpActionResult GetHelper(int id)
        {
            Provide.HelperProvide provide = new Provide.HelperProvide();
            var model= provide.GetArticle(id);
            return Json(model);

        }
    }
}
