using System;
using System.Collections.Generic;
using System.Linq;
using System.Net;
using System.Net.Http;
using System.Web.Http;

namespace SfSoft.web.Microlecture.Controller
{
    [RoutePrefix("app/microlecture/userinfo")]
    public class UserInfoController : ApiController
    {
        [HttpPost]
        [Route("add")]
        public IHttpActionResult AddUser([FromBody] dynamic obj)
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
        [HttpPost]
        [Route("regist")]
        public IHttpActionResult RegistUser( dynamic obj)
        {
            try
            {
                var userId = Convert.ToString(obj.userid);
                var groupName = Convert.ToString(obj.groupname);
                var nickName = Convert.ToString(obj.nickname);
                var groupId = Convert.ToInt32(obj.groupid);
                Provide.UserProvide provide = new Provide.UserProvide();
                provide.RegistUser(userId, groupName, nickName, groupId);

                return Json(new { success = true });
            }
            catch (Exception ex)
            {
                return Json(new { success = false, msg=ex.Message });
            }
        }
        [HttpPost]
        [Route("qrcode/{id}")]
        public IHttpActionResult QRCode(int id)
        {
            try
            {
                BLL.WX_SGroup_Content bll = new BLL.WX_SGroup_Content();
                var model= bll.GetModel(id);

                return Json(new { success = true, data= App.Helper.WxBaseConfig.WebSite+ model.img_url.Substring(1) });
            }
            catch (Exception ex)
            {
                return Json(new { success = false, msg = ex.Message });
            }
        }
        [HttpGet]
        [Route("group/{classid}")]
        public IHttpActionResult  GetGroupContent(int classid)
        {
            try {
                Provide.UserProvide provide = new Provide.UserProvide();
                var list = provide.GetGroupContentList(classid);

                return Json(new { success = true, list = list });
            }
            catch (Exception ex)
            {
                return Json(new { success = false, msg = ex.Message });
            }

        }
    }
}
