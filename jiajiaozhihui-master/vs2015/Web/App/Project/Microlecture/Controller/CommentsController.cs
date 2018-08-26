using System;
using System.Collections.Generic;
using System.Linq;
using System.Net;
using System.Net.Http;
using System.Web.Http;

namespace SfSoft.web.Microlecture.Controller
{
    [RoutePrefix("app/microlecture/courses")]
    public class CommentsController : ApiController
    {
        /// <summary>
        ///  
        /// </summary>
        /// <param name="courseid">课程id</param>
        /// <returns></returns>
        [HttpPost]
        [Route("{courseid}/comments/add")]
        public IHttpActionResult AddComment(int courseid,dynamic obj)
        {
            try
            {
                var message = Convert.ToString(obj.msg);
                var sender = Convert.ToString(obj.sender);
                var headimg = Convert.ToString(obj.headimg);
                var nickname = Convert.ToString(obj.nickname);
                Provide.CommentsProvide provide = new Provide.CommentsProvide();
                Model.wx_comments model= provide.AddComment(courseid, message, sender, headimg, nickname);
                
                return Json(new {
                    success=true,
                    data=new {
                        id =model.id,
                        sender =model.sender,
                        headImgUrl =model.sender_headimage,
                        nickName =model.sender_nickname,
                        message =model.message,
                        createDate =model.create_date,
                        courseId=courseid
                    }
                });
            }
            catch (Exception ex) {
                return Json(new {
                    success = false,
                    msg=ex.Message
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
                var replier = Convert.ToString(obj.sender);
                var headimg = Convert.ToString(obj.headimg);
                var nickname = Convert.ToString(obj.nickname);
                var message = Convert.ToString(obj.msg);

                Provide.CommentsProvide provide = new Provide.CommentsProvide();
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
            catch (Exception ex) {
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
                Provide.CommentsProvide provide = new Provide.CommentsProvide();
                provide.AddLike(commentid, liker, nickname, headimg);

                return Json(new
                {
                    success = true,
                });
            }
            catch (Exception ex) {
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
                Provide.CommentsProvide provide = new Provide.CommentsProvide();
                provide.CancelLike(commentid, liker);
                return Json(new
                {
                    success = true,
                    
                });
            }
            catch (Exception ex) {
                return Json(new
                {
                    success = false,
                    msg = ex.Message
                });
            }
        }
        [HttpPost]
        [Route("{courseid}/comments/{pagesize}/{pageindex}")]
        public IHttpActionResult GetCommentsList(int courseid, int pagesize, int pageindex,dynamic obj)
        {
            try
            {
                var liker = Convert.ToString(obj.liker);
                Provide.CommentsProvide provide = new Provide.CommentsProvide();
                var list = provide.GetComments(courseid, pagesize, pageindex,liker);
                return Json(new
                {
                    success = true,
                    list = list
                });
            }
            catch (Exception ex) {
                return Json(new
                {
                    success = false,
                    msg = ex.Message
                });
            }
        }
    }
}
