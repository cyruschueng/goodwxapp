using System;
using System.Collections.Generic;
using System.Linq;
using System.Net;
using System.Net.Http;
using System.Web.Http;

namespace SfSoft.web.Gardenia.Controller
{
    [RoutePrefix("api/gardenia")]
    /// <summary>
    /// 每天一课，每周一课
    /// </summary>
    public class HistoryController : ApiController
    {
        /// <summary>
        /// 每天一课
        /// </summary>
        /// <param name="classid"></param>
        /// <returns></returns>
        [HttpGet]
        [Route("history/everyday/{classid}")]
        public IHttpActionResult GetHistoryEveryDayData(int classid)
        {
            try
            {
                Helper.HistoryProvide provide = new Helper.HistoryProvide();
                var list = provide.GetHistoryEveryDayData(classid);
                return Json(new { success = true, data = list });
            }
            catch (Exception ex) {
                return Json(new { success = false, msg = ex.Message });
            }
        }
        /// <summary>
        /// 每同一课数据
        /// </summary>
        /// <param name="classid"></param>
        /// <returns></returns>
        [HttpGet]
        [Route("history/everyweek/{classid}")]
        public IHttpActionResult GetHistoryEveryWeekData(int classid)
        {
            try
            {
                Helper.HistoryProvide provide = new Helper.HistoryProvide();
                var list = provide.GetHistoryEveryWeekData(classid);
                return Json(new { success = true, data = list });
            }
            catch (Exception ex)
            {
                return Json(new { success = false, msg = ex.Message });
            }
        }
    }
}
