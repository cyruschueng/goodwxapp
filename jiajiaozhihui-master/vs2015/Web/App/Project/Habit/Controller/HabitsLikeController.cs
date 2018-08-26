using System;
using System.Collections.Generic;
using System.Linq;
using System.Net;
using System.Net.Http;
using System.Web.Http;

namespace SfSoft.web.Habit.Controller
{
    [RoutePrefix("api/habits")]
    public class HabitsLikeController : ApiController
    {
        [HttpPost]
        [Route("like/update/{detailId}")]
        public IHttpActionResult Post(int detailId, dynamic obj)
        {
            try
            {
                var habitId = Convert.ToInt32(obj.habitid);
                var appId= Convert.ToString(obj.appid);
                var openId = Convert.ToString(obj.openid);

                Provide.LikeProvide provide = new Provide.LikeProvide();

                if (provide.Exist(detailId, openId) == false)
                {
                    var result = provide.AddLike(habitId, openId, detailId, appId);
                    var user =SfSoft.web.User.Helper.LocaltionUser.GetUserInfo(openId);
                    return Json<dynamic>(new { success = true, state = "add", headImgUrl = user.HeadImgUrl });
                }
                else
                {
                    provide.Delete(detailId, openId);
                    return Json<dynamic>(new { success = true, state = "remove" });
                }
            }
            catch (Exception ex)
            {
                return Json<dynamic>(new { success = false, msg = ex.Message, sourse = "sys" });
            }
        }
    }
}
