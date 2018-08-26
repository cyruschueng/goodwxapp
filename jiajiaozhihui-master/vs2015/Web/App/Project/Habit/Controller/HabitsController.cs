using System;
using System.Collections.Generic;
using System.Linq;
using System.Net;
using System.Net.Http;
using System.Web.Http;

namespace SfSoft.web.Habit.Controller
{
    [RoutePrefix("api/habits")]
    public class HabitsController : ApiController
    {
        
        /// <summary>
        /// 获取所有的习惯
        /// 每两个分一组，每组里面包涵二个元索
        /// </summary>
        /// <returns></returns>
        [HttpGet]
        [Route("list/{appId}")]
        public IHttpActionResult GetHabitList(string appId)
        {

            Provide.HabitsProvide provide = new Provide.HabitsProvide();
            try {
                var list = provide.GetFormatHabits(appId);
                return Json(new
                {
                    success = true,
                    list = list
                });
            }
            catch (Exception ex) {
                return Json(new { success = false });
            }
            
        }
        /// <summary>
        /// 获取所有的习惯
        /// 每两个分一组，每组里面包涵二个元索
        /// </summary>
        /// <returns></returns>
        [HttpGet]
        [Route("list/{appId}/{classify}")]
        public IHttpActionResult GetHabitList2(string appId,int classify)
        {
            Provide.HabitsProvide provide = new Provide.HabitsProvide();
            try
            {
                var list = provide.GetFormatHabits(appId, classify);
                return Json(new
                {
                    success = true,
                    list = list
                });
            }
            catch (Exception ex) {
                return Json(new { success = false });
            }
        }
        [HttpPost]
        [Route("info/{habitId}")]
        public IHttpActionResult GetHabitInfo(int habitId, dynamic obj)
        {
            try
            {
                var openId = Convert.ToString(obj.openid);
                var appId=Convert.ToString(obj.appid);
                Provide.HabitsProvide provide = new Provide.HabitsProvide();
                var model = provide.GetHabit(habitId);

                Provide.HabitMyProvide myProvide = new Provide.HabitMyProvide();
                var isJoin = myProvide.IsExist(habitId, openId, appId);

                return Json(new
                {
                    success = true,isJoin = isJoin,info = new{title = model.title,join_num = model.join_num}
                });
            }
            catch (Exception ex) {
                return Json(new{success = false});
            }
        }
    }
}
