using System;
using System.Collections.Generic;
using System.Linq;
using System.Net;
using System.Net.Http;
using System.Web.Http;

namespace SfSoft.web.Microlecture.Controller
{
    [RoutePrefix("app/microlecture/news")]
    public class NewController : ApiController
    {
        /// <summary>
        ///  
        /// </summary>
        /// <param name="courseid">课程id</param>
        /// <returns></returns>
        [HttpPost]
        [Route("comments/add")]
        public IHttpActionResult AddComment(dynamic obj)
        {
            try
            {
                var message = Convert.ToString(obj.msg);
                var sender = Convert.ToString(obj.sender);
                var headimg = Convert.ToString(obj.headimg);
                var nickname = Convert.ToString(obj.nickname);
                var imageServerId= Convert.ToString(obj.imgserverid);

                imageServerId = "SAZFikFEwzPw-_SCVqHEg-S7q8TYF_4ABjZPEXXZzL9Fdj69WwP7bE_n8uaa8g1v";

                SfSoft.Common.LogHelper.WriteLog("imageServerId=" + imageServerId);
                Provide.NewProvide provide = new Provide.NewProvide();
                Model.wx_comments model = provide.AddComment(message, sender, headimg, nickname,imageServerId);

                return Json(new
                {
                    success = true,
                    data = new
                    {
                        id = model.id,
                        sender = model.sender,
                        headImgUrl = model.sender_headimage,
                        nickName = model.sender_nickname,
                        message = model.message,
                        createDate = model.create_date
                    }
                });
            }
            catch (Exception ex)
            {
                return Json(new
                {
                    success = false,
                    msg = ex.Message
                });
            }
        }
        /// <summary>
        /// 
        /// </summary>
        /// <param name="commentid"></param>
        /// <param name="obj"></param>
        /// <returns></returns>
        [HttpPost]
        [Route("{commentid}/comments/replay")]
        public IHttpActionResult ReplyComment(int commentid, dynamic obj)
        {
            try
            {
                var replier = Convert.ToString(obj.replier);
                var headimg = Convert.ToString(obj.headimg);
                var nickname = Convert.ToString(obj.nickname);
                var message = Convert.ToString(obj.message);

                Provide.NewProvide provide = new Provide.NewProvide();
                Model.wx_comments model = provide.ReplyComment(commentid, message, replier, nickname, headimg);
                return Json(new
                {
                    success = true,
                    data = new
                    {
                        id = model.id,
                        replier = model.replier,
                        headImgUrl = model.replier_headimage,
                        nickName = model.replier_nickname,
                        message = model.message,
                        createDate = model.create_date
                    }
                });
            }
            catch (Exception ex)
            {
                return Json(new
                {
                    success = false,
                    msg = ex.Message
                });
            }
        }
        /// <summary>
        /// 
        /// </summary>
        /// <param name="commentid"></param>
        /// <param name="obj"></param>
        /// <returns></returns>
        [HttpPost]
        [Route("{commentid}/likes/add")]
        public IHttpActionResult AddLikes(int commentid, dynamic obj)
        {
            try
            {
                var liker = Convert.ToString(obj.liker);
                var headimg = Convert.ToString(obj.headimg);
                var nickname = Convert.ToString(obj.nickname);
                Provide.NewProvide provide = new Provide.NewProvide();
                provide.AddLike(commentid, liker, nickname, headimg);

                return Json(new
                {
                    success = true,
                });
            }
            catch (Exception ex)
            {
                return Json(new
                {
                    success = false,
                    msg = ex.Message
                });
            }

        }
        /// <summary>
        /// 
        /// </summary>
        /// <param name="commentid"></param>
        /// <param name="obj"></param>
        /// <returns></returns>
        [HttpPost]
        [Route("{commentid}/likes/cancell")]
        public IHttpActionResult CancelLikes(int commentid, dynamic obj)
        {
            try
            {
                var liker = Convert.ToString(obj.liker);
                Provide.NewProvide provide = new Provide.NewProvide();
                provide.CancelLike(commentid, liker);
                return Json(new
                {
                    success = true,

                });
            }
            catch (Exception ex)
            {
                return Json(new
                {
                    success = false,
                    msg = ex.Message
                });
            }
        }
        [HttpPost]
        [Route("comments/{pagesize}/{pageindex}")]
        public IHttpActionResult GetCommentsList(int pagesize, int pageindex, dynamic obj)
        {
            try
            {
                var liker = Convert.ToString(obj.liker);
                Provide.NewProvide provide = new Provide.NewProvide();
                var list = provide.GetComments(pagesize, pageindex, liker);
                return Json(new
                {
                    success = true,
                    list = list
                });
            }
            catch (Exception ex)
            {
                return Json(new
                {
                    success = false,
                    msg = ex.Message
                });
            }
        }
    }
}
