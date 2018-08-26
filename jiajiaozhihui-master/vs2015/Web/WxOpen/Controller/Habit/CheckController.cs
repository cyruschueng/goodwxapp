using System;
using System.Collections.Generic;
using System.Linq;
using System.Net;
using System.Net.Http;
using System.Web.Http;

namespace SfSoft.web.WxOpen.Controller.Habit
{
    public class CheckController : ApiController
    {
        [HttpGet]
        [Route("api/habit/checksessionid/{sessionId}")]
        public IHttpActionResult CheckSession(string sessionId)
        {
            var bag= Senparc.Weixin.WxOpen.Containers.SessionContainer.GetSession(sessionId);
            if (bag != null) {
                return Json(new { success = true });
            }
            return Json(new { success = false });
        }
    }
}
