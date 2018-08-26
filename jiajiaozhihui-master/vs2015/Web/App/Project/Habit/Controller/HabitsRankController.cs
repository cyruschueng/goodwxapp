using System;
using System.Collections.Generic;
using System.Linq;
using System.Net;
using System.Net.Http;
using System.Web.Http;

namespace SfSoft.web.Habit.Controller
{
    [RoutePrefix("api/habits")]
    public class HabitsRankController : ApiController
    {
        [HttpGet]
        [Route("rank/{habitid}")]
        public IHttpActionResult Get(int habitid)
        {
            try
            {
                Provide.RankProvide provide = new Provide.RankProvide();
                var list = provide.GetRank(habitid);
                return Json(new { success = true, list = list });
            }
            catch (Exception ex)
            {
                return Json(new { success = false });
            }
        }
    }
}
