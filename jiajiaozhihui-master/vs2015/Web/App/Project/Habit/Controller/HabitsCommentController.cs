using System;
using System.Collections.Generic;
using System.Linq;
using System.Net;
using System.Net.Http;
using System.Web.Http;

namespace SfSoft.web.Habit.Controller
{
    [RoutePrefix("api/habits")]
    public class HabitsCommentController : ApiController
    {
        [HttpPost]
        [Route("comment/add/{detailId}")]
        /// <summary>
        /// 添加评论
        /// </summary>
        /// <param name="obj"></param>
        /// <returns></returns>
        public IHttpActionResult AddComment(int detailId, dynamic obj)
        {
            try
            {
                Provide.CommentProvide provide = new Provide.CommentProvide();
                var comment = Convert.ToString(obj.comment);
                var openId = Convert.ToString(obj.openid);
                var habitId = Convert.ToInt32(obj.habitid);
                var appId= Convert.ToString(obj.appid);

                var index = provide.AddComment(comment, detailId, openId, habitId, appId);
                Model.WX_UserInfo user = SfSoft.web.User.Helper.LocaltionUser.GetUserInfo(openId);

                return Json(new
                {
                    success = true,
                    id = index,
                    nickName = user.NickName,
                    comment = comment
                });
            }
            catch (Exception ex)
            {
                return Json(new { success = false, msg = ex.Message, sourse = "sys" });
            }
        }
        [HttpPost]
        [Route("comment/reply/{detailId}")]
        /// <summary>
        /// 评论回复
        /// </summary>
        /// <param name="obj"></param>
        /// <returns></returns>
        public IHttpActionResult ReplyComment(int detailId, dynamic obj)
        {
            try
            {
                Provide.CommentProvide provide = new Provide.CommentProvide();
                var commentId = Convert.ToInt32(obj.commentid);
                var comment = Convert.ToString(obj.comment);
                var openId = Convert.ToString(obj.openid);
                var habitid = Convert.ToInt32(obj.habitid);
                var appId = Convert.ToString(obj.appid);

                var index = provide.RePlyComment(comment, detailId, commentId, openId, habitid, appId);
                Model.WX_UserInfo user = SfSoft.web.User.Helper.LocaltionUser.GetUserInfo(openId);
                return Json<dynamic>(new
                {
                    success = true,
                    id = index,
                    nickName = user.NickName,
                    comment = comment
                });
            }
            catch (Exception ex)
            {
                return Json(new { success = false, msg = ex.Message, sourse = "sys" });
            }
        }
    }
}
