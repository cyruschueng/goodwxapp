using System;
using System.Collections.Generic;
using System.Linq;
using System.Net;
using System.Net.Http;
using System.Web.Http;

namespace SfSoft.web.WxOpen.Controller.Habit
{
    public class CommentController : ApiController
    {
        [HttpPost]
        [Route("api/habit/comment/add")]
        /// <summary>
        /// 添加评论
        /// </summary>
        /// <param name="obj"></param>
        /// <returns></returns>
        public IHttpActionResult AddComment(dynamic obj)
        {
            try
            {
                Provide.Habit.Comment provide = new Provide.Habit.Comment();
                var comment = Convert.ToString(obj.comment);
                var detailId = Convert.ToInt32(obj.detailid);
                var sessionId = Convert.ToString(obj.sessionid);
                var habitId = Convert.ToInt32(obj.habitid);
                var groupId = Convert.ToInt32(obj.groupid);

                var openId = Helper.SessionKeyProvide.GetOpenIdBySessionId(sessionId);

                var index = provide.AddComment(comment, detailId, openId, habitId,groupId);

                Provide.Habit.UserInfo userProvide = new Provide.Habit.UserInfo();
                Model.WX_UserInfo user = userProvide.GetUserInfo(openId);

                return Json(new
                {
                    success=true,
                    id = index,
                    nickName = user.NickName,
                    comment = comment
                });
            }
            catch (Helper.SessionKeyException ex)
            {
                return Json(new { success=false,msg=ex.Message, sourse = "session" });
            }
            catch (Exception ex) {
                return Json(new { success = false, msg = ex.Message, sourse = "sys" });
            }
        }
        [HttpPost]
        [Route("api/habit/comment/reply")]
        /// <summary>
        /// 评论回复
        /// </summary>
        /// <param name="obj"></param>
        /// <returns></returns>
        public IHttpActionResult ReplyComment(dynamic obj)
        {
            try
            {
                Provide.Habit.Comment provide = new Provide.Habit.Comment();
                var commentId = Convert.ToInt32(obj.commentid);
                var comment = Convert.ToString(obj.comment);
                var detailId = Convert.ToInt32(obj.detailid);
                var sessionid = Convert.ToString(obj.sessionid);
                var habitid = Convert.ToInt32(obj.habitid);
                var groupId = Convert.ToInt32(obj.groupid);

                var openId = Helper.SessionKeyProvide.GetOpenIdBySessionId(sessionid);

                var index = provide.RePlyComment(comment, detailId, commentId, openId, habitid,groupId);
                Provide.Habit.UserInfo userProvide = new Provide.Habit.UserInfo();
                Model.WX_UserInfo user = userProvide.GetUserInfo(openId);
                return Json<dynamic>(new
                {
                    success = true,
                    id = index,
                    nickName = user.NickName,
                    comment = comment
                });
            }
            catch (Helper.SessionKeyException ex)
            {
                return Json(new { success = false, msg = ex.Message,sourse="session" });
            }
            catch (Exception ex)
            {
                return Json(new { success = false, msg = ex.Message, sourse = "sys" });
            }
        }
    }
}
