using System;
using System.Collections.Generic;
using System.Linq;
using System.Net;
using System.Net.Http;
using System.Web.Http;

namespace SfSoft.web.Microlecture.Controller
{
    [RoutePrefix("app/microlecture/user")]
    public class UserController : ApiController
    {
        [HttpPost]
        [Route("add/aa")]
        public IHttpActionResult AddUser(dynamic obj)
        {
            try
            {
                var userId = Convert.ToString(obj.userid);
                var groupRelationId = Convert.ToInt32(obj.relationid);
                Provide.UserProvide provide = new Provide.UserProvide();
                provide.AddUser(userId, groupRelationId);

                return Json(new { success = true });
            }
            catch (Exception ex) {
                return Json(new { success = false });
            }
        }

        [HttpPost]
        [Route("add/aa")]
        public IHttpActionResult AddUser(dynamic obj)
        {
            try
            {
                var userId = Convert.ToString(obj.userid);
                var groupRelationId = Convert.ToInt32(obj.relationid);
                Provide.UserProvide provide = new Provide.UserProvide();
                provide.AddUser(userId, groupRelationId);

                return Json(new { success = true });
            }
            catch (Exception ex)
            {
                return Json(new { success = false });
            }
        }
    }
}
