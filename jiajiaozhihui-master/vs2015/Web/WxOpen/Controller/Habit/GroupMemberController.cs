using System;
using System.Collections.Generic;
using System.Linq;
using System.Net;
using System.Net.Http;
using System.Web.Http;

namespace SfSoft.web.WxOpen.Controller.Habit
{
    public class GroupMemberController : ApiController
    {
        [HttpPost]
        [Route("api/habit/group/member")]
        public IHttpActionResult PostGroupMember(dynamic obj)
        {
            var groupId = Convert.ToInt32(obj.groupid);
            var sessionId = Convert.ToString(obj.sessionid);
            var openId = Helper.SessionKeyProvide.GetOpenIdBySessionId(sessionId);
            Provide.Habit.Group  provide = new Provide.Habit.Group();
            provide.UpdateGroupMember(groupId, openId);
            return Ok();
        }
    }
}
