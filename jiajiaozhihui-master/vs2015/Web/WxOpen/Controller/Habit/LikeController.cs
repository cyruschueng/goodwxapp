using System;
using System.Collections.Generic;
using System.Linq;
using System.Net;
using System.Net.Http;
using System.Web.Http;

namespace SfSoft.web.WxOpen.Controller.Habit
{
    public class LikeController : ApiController
    {
        [HttpPost]
        [Route("api/habit/like/update")]
        public IHttpActionResult Post(dynamic obj)
        {
            try
            {
                var habitId = Convert.ToInt32(obj.habitid);
                var detailId= Convert.ToInt32(obj.detailid);
                var sessionId= Convert.ToString(obj.sessionid);
                var groupId = Convert.ToInt32(obj.groupid);
                var openId = Helper.SessionKeyProvide.GetOpenIdBySessionId(sessionId);
                Provide.Habit.Like provide = new Provide.Habit.Like();

                if (provide.Exist(detailId, openId) == false)
                {
                    var result = provide.AddLike(habitId, openId, detailId,groupId);
                    Provide.Habit.UserInfo userProvide = new Provide.Habit.UserInfo();
                    var user = userProvide.GetUserInfo(openId);
                    return Json<dynamic>(new { success = true, state="add", headImgUrl = user.HeadImgUrl });
                }
                else
                {
                    provide.Delete(detailId, openId);
                    return Json<dynamic>(new { success=true, state = "remove" });
                }
            }
            catch (Helper.SessionKeyException ex)
            {
                return Json<dynamic>(new { success = false,msg=ex.Message, sourse = "session" });
            }
            catch (Exception ex) {
                return Json<dynamic>(new { success = false,  msg = ex.Message, sourse = "sys" });
            }
        }
    }
}
