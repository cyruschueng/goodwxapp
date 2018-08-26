using System;
using System.Collections.Generic;
using System.Linq;
using System.Net;
using System.Net.Http;
using System.Web.Http;

namespace SfSoft.web.WxOpen.Controller.Habit
{
    public class RankController : ApiController
    {
        [HttpGet]
        [Route("api/habit/rank/{habitid}")]
        public IHttpActionResult Get(int habitid)
        {
            try
            {
                Provide.Habit.Rank provide = new Provide.Habit.Rank();
                var list = provide.GetRank(habitid);
                return Json(new { success = true, list = list });
            }
            catch (Exception ex) {
                return Json(new { success=false });
            }
        }
    }
}
