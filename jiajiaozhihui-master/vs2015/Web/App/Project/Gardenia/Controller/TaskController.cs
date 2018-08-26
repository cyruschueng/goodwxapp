using System;
using System.Collections.Generic;
using System.Linq;
using System.Net;
using System.Net.Http;
using System.Web.Http;

namespace SfSoft.web.Gardenia.Controller
{
    [RoutePrefix("api/gardenia")]
    public class TaskController : ApiController
    {
        [HttpPost]
        [Route("task")]
        public IHttpActionResult GetTask(dynamic obj)
        {
            try
            {
                var openId = Convert.ToString(obj.openid);
                var groupType = Convert.ToInt32(obj.grouptype);
                Helper.TaskProvide provide = new Helper.TaskProvide();
                var result = provide.GetTask(openId,groupType);
                return Json(new { success = true, task = result });
            }
            catch (Exception ex) {
                return Json(new { success=false,msg=ex.Message});
            }
            
        }
    }
}
