using System;
using System.Collections.Generic;
using System.Linq;
using System.Net;
using System.Net.Http;
using System.Threading.Tasks;
using System.Web.Http;

namespace SfSoft.web.WxOpen.Controller.Habit
{
    public class GroupController : ApiController
    {
        [HttpPost]
        [Route("api/habit/group/groupid/state")]
        public IHttpActionResult Post(dynamic obj)
        {
            try
            {
                var encryptedData = Convert.ToString(obj.encryptedData);
                var iv = Convert.ToString(obj.iv);
                var sessionId = Convert.ToString(obj.sessionid);
                Provide.Habit.Group provide = new Provide.Habit.Group();


                
                var result = provide.GetGroup(encryptedData, iv, sessionId);
                if (result.id == 0)
                {
                    return Json(new { success = true, group_id=0, result = "empty", msg = "还未创建群" });
                }
                else if (result.id != 0 && result.group_name == "" && result.group_id != "")
                {
                    return Json(new { success = true, group_id = result.id, result = "group_name_empty", msg = "群未命名" });
                }
                else if (result.id != 0 && result.group_name != "" && result.group_id != "")
                {
                    return Json(new { success = true, group_id = result.id, result = "ok", msg = "已创建" });
                }
                else {
                    return Json(new { success = false });
                }
            }
            catch (Exception ex) {
                return Json(new{success = false});
            }
        }
        [HttpPost]
        [Route("api/habit/group/edit")]
        public IHttpActionResult Post2(dynamic obj)
        {
            try
            {
                var encryptedData = Convert.ToString(obj.encryptedData);
                var iv = Convert.ToString(obj.iv);
                var sessionId = Convert.ToString(obj.sessionid);
                var groupName = Convert.ToString(obj.groupname);
                Provide.Habit.Group provide = new Provide.Habit.Group();
                provide.EditGroup(encryptedData, iv, sessionId, groupName);

                return Json(new { success = true });
            }
            catch (Exception) {
                return Json(new { success = false });
            }
        }
        [HttpGet]
        [Route("api/habit/group/list")]
        public IHttpActionResult Get2()
        {
            try
            {
                Provide.Habit.Group provide = new Provide.Habit.Group();
                var list = provide.GetGroupList();
                return Json(new { success = true, list = list });
            }
            catch (Exception ex) {
                return Json(new { success = false});
            }
        }
        /// <summary>
        /// 消息卡片进群
        /// </summary>
        /// <param name="sessionId"></param>
        /// <returns></returns>
        [HttpPost]
        [Route("api/habit/group/enter/scene/1044")]
        public async Task<IHttpActionResult> EnterGroup(dynamic obj)
        {
            try {
                var encryptedData = Convert.ToString(obj.encryptedData);
                var iv = Convert.ToString(obj.iv);
                var sessionId = Convert.ToString(obj.sessionid);
                Provide.Habit.Group provide = new Provide.Habit.Group();
                var openGId = provide.GetOpenGId(encryptedData, iv, sessionId);
                var result= await provide.AddGroupAsync(openGId,sessionId);
                return Json<dynamic>(new { success = true, group=new { id=result.id,name=result.group_name  } });
            }
            catch (Helper.SessionKeyException ex)
            {
                return Json<dynamic>(new { success = false, msg = ex.Message, sourse = "session" });
            }
            catch (Exception ex)
            {
                return Json<dynamic>(new { success = false, msg = ex.Message, sourse = "sys" });
            }            
        }
        /// <summary>
        /// 除消息卡片进群，其它方式进群
        /// </summary>
        /// <param name="sessionId"></param>
        /// <returns></returns>
        [HttpPost]
        [Route("api/habit/group/enter/scene/other")]
        public IHttpActionResult EnterGroup2(dynamic obj)
        {
            try {
                var sessionId = Convert.ToString(obj.sessionid);
                var openId = Helper.SessionKeyProvide.GetOpenIdBySessionId(sessionId);
                Provide.Habit.Group provide = new Provide.Habit.Group();
                List<Model.wx_habit_group> list = provide.GetGroupList(sessionId);
                
                if (list.Count > 0) {
                    var result = list.FirstOrDefault<Model.wx_habit_group>(e => e.is_default == 1);
                    if (result==null) {
                        result = list.First();
                    }
                    return Json<dynamic>(new { success = true, group = new { id = result.id, name = result.group_name } });
                }
                return Json<dynamic>(new { success = true, group = new {id=0,name="" } });
            }
            catch (Helper.SessionKeyException ex)
            {
                return Json<dynamic>(new { success = false, msg = ex.Message, sourse = "session" });
            }
            catch (Exception ex)
            {
                return Json<dynamic>(new { success = false, msg = ex.Message, sourse = "sys" });
            }
        }
    }
}
