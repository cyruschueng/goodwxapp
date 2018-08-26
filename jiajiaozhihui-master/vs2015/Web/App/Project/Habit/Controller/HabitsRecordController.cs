using SfSoft.web.Habit.Provide;
using System;
using System.Collections.Generic;
using System.IO;
using System.Linq;
using System.Net;
using System.Net.Http;
using System.Threading.Tasks;
using System.Web.Http;

namespace SfSoft.web.Habit.Controller
{
    [RoutePrefix("api/habits")]
    public class HabitsRecordController : ApiController
    {
        /// <summary>
        /// 添加打卡记录
        /// </summary>
        /// <param name="habitId"></param>
        /// <param name="obj"></param>
        /// <returns></returns>
        [HttpPost]
        [Route("records/add/{habitId}")]
        public IHttpActionResult AddDetail(int habitId, dynamic obj)
        {
            try
            {
                var openId = Convert.ToString(obj.openid);
                var appId = Convert.ToString(obj.appid);
                var notes = Convert.ToString(obj.notes);

                Provide.HabitsRecordProvide provide = new Provide.HabitsRecordProvide();

                var result = provide.AddDetail(habitId, openId, notes, appId);

                return Json(new { success = true, index = result });
            }
            catch (Exception ex)
            {
                return Json(new { success = false, sourse = "sys" });
            }
        }
        /// <summary>
        /// 添加打卡记录图片
        /// </summary>
        /// <param name="id"></param>
        /// <returns></returns>
        [HttpPost]
        [Route("records/uploadfile/{id}")]
        public async Task<string> Post(int id,dynamic obj)
        {
            try {
                // 设置上传目录
                var root = System.Web.HttpContext.Current.Server.MapPath("~/Files/habit");
                if (Directory.Exists(root) == false)
                {
                    Directory.CreateDirectory(root);
                }
                var serverId = Convert.ToString(obj.serverid);
                SfSoft.Common.LogHelper.WriteLog(serverId);
                
                string result= await Senparc.Weixin.MP.AdvancedAPIs.MediaApi.GetAsync(web.App.Helper.WxBaseConfig.AppID, serverId, root);
                if (!string.IsNullOrEmpty(result)) {
                    var fileName= result.Substring(result.LastIndexOf(@"\") + 1);
                    Provide.HabitsRecordProvide provide = new Provide.HabitsRecordProvide();
                    provide.UpdateImage(id, "/Files/habit/" + fileName);
                }
                return "seccuess";
            }
            catch (Exception ex)
            {
                SfSoft.Common.LogHelper.ErrorLog("上传错误", ex);
                return "error";
            }
        }
        [HttpPost]
        [Route("records/card/add/{habitId}")]
        public IHttpActionResult AddHabitCard(int habitId, dynamic obj)
        {
            try
            {
                var openId = Convert.ToString(obj.openid);
                var appId = Convert.ToString(obj.appid);

                Provide.HabitsRecordProvide provide = new Provide.HabitsRecordProvide();
                provide.AddPunchCard(openId, habitId, appId);

                HabitMyProvide myProvide = new HabitMyProvide();
                myProvide.UpdatePunchCardNumAnsy(habitId, openId, appId);

                return Json(new { success = true});
            }
            catch (Exception ex) {
                return Json(new { success = false });
            }
        }
        [HttpPost]
        [Route("records/card/get/{habitId}")]
        public IHttpActionResult GetHabitCard(int habitId, dynamic obj)
        {
            try
            {
                var openId = Convert.ToString(obj.openid);
                var appId = Convert.ToString(obj.appid);

                Provide.HabitsRecordProvide provide = new Provide.HabitsRecordProvide();
                var model= provide.GetDayPunchCard(habitId, openId, appId);
                return Json(new { success = true,is_punch= model == null ? false : true });
            }
            catch (Exception ex)
            {
                return Json(new { success = false });
            }
        }
    }
}
