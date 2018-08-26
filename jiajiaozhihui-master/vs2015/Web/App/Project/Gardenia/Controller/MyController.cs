using System;
using System.Collections.Generic;
using System.Linq;
using System.Net;
using System.Net.Http;
using System.Web.Http;

namespace SfSoft.web.Gardenia.Controller
{
    [RoutePrefix("api/gardenia")]
    public class MyController : ApiController
    {
        [HttpPost]
        [Route("member/advice")]
        public IHttpActionResult GetAdvice(dynamic obj)
        {
            try
            {
                var openId = Convert.ToString(obj.openid);
                Helper.MyProvide provide = new Helper.MyProvide();
                string url = provide.GetAdvice(openId);
                return Json(new { success = true, url = url });
            }
            catch (Exception ex) {
                return Json(new { success = false, msg = ex.Message });
            }
        }
    }
}
