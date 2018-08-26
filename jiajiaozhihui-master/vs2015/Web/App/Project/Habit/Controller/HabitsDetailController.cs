using System;
using System.Collections.Generic;
using System.Linq;
using System.Net;
using System.Net.Http;
using System.Web.Http;

namespace SfSoft.web.Habit.Controller
{
    [RoutePrefix("api/habits")]
    public class HabitsDetailController : ApiController
    {
        /// <summary>
        /// 单个习惯
        /// </summary>
        /// <param name="obj"></param>
        /// <returns></returns>
        [HttpPost]
        [Route("detail/{habitId}")]
        public IHttpActionResult GetHabit(int habitId, dynamic obj)
        {
            try
            {
                //var habitId = Convert.ToInt32(obj.habitid);
                var startIndex = Convert.ToInt32(obj.startindex);
                var endIndex = Convert.ToInt32(obj.endindex);
                var openId = Convert.ToString(obj.openid);
                var appId = Convert.ToString(obj.appid);

                Provide.HabitDetailProvide provide = new Provide.HabitDetailProvide();
                var list = new List<dynamic>();
                list = provide.GetHabitDetail("habit_id=" + habitId + " and is_act=1", "id desc", startIndex, endIndex, openId, habitId,appId);
                var total = provide.GetPageTotal(habitId);

                return Json(new { success = true, list = list, total = total });
            }
            catch (Exception ex)
            {
                return Json(new { success = false, msg = ex.Message, sourse = "sys" });
            }
            
        }
        /// <summary>
        /// 所有的
        /// </summary>
        /// <param name="obj"></param>
        /// <returns></returns>
        [HttpPost]
        [Route("detail/all")]
        public IHttpActionResult GetHabit2(dynamic obj)
        {
            try
            {
                var startIndex = Convert.ToInt32(obj.startindex);
                var endIndex = Convert.ToInt32(obj.endindex);
                var openId = Convert.ToString(obj.openid);
                var appId = Convert.ToString(obj.appid);

                Provide.HabitDetailProvide provide = new Provide.HabitDetailProvide();

                var list = provide.GetHabitDetail("is_act=1", "id desc", startIndex, endIndex, openId,appId);

                var total = provide.GetPageTotal("is_act=1");

                return Json(new { success = true, list = list, total = total });
            }
            catch (Exception ex)
            {
                return Json(new { success = false, msg = ex.Message, sourse = "sys" });
            }


        }
        /// <summary>
        /// 所有的推荐的
        /// </summary>
        /// <param name="obj"></param>
        /// <returns></returns>
        [HttpPost]
        [Route("detail/all/recommend")]
        public IHttpActionResult GetHabit3(dynamic obj)
        {
            try
            {
                var startindex = Convert.ToInt32(obj.startindex);
                var endindex = Convert.ToInt32(obj.endindex);
                var openId = Convert.ToString(obj.openid);
                var appId = Convert.ToString(obj.appid);

                Provide.HabitDetailProvide provide = new Provide.HabitDetailProvide();
                var list = provide.GetHabitDetail("is_act=1 and is_recommend=1", "id desc", startindex, endindex, openId, appId);

                var total = provide.GetPageTotal("is_act=1 and is_recommend=1");

                return Json(new { success = true, list = list, total = total });
            }
            
            catch (Exception ex)
            {
                return Json(new { success = false, msg = ex.Message, sourse = "sys" });
            }

        }
        /// <summary>
        /// 单个习惯 热门推荐
        /// </summary>
        /// <param name="obj"></param>
        /// <returns></returns>
        [HttpPost]
        [Route("detail/habitid/recommend")]
        public IHttpActionResult GetHabit5(dynamic obj)
        {
            try
            {
                var habitId = Convert.ToInt32(obj.habitid);
                var startindex = Convert.ToInt32(obj.startindex);
                var endindex = Convert.ToInt32(obj.endindex);
                var openId = Convert.ToString(obj.openid);
                var appId = Convert.ToString(obj.appid);

                Provide.HabitDetailProvide provide = new Provide.HabitDetailProvide();
                var list = provide.GetHabitDetail("habit_id=" + habitId + " and is_act = 1 and is_recommend=1", "id desc", startindex, endindex, openId,appId);

                var total = provide.GetPageTotal("habit_id=" + habitId + " and is_act = 1 and is_recommend=1");

                return Json(new { success = true, list = list, total = total });
            }
            catch (Exception ex)
            {
                return Json(new { success = false, msg = ex.Message, sourse = "sys" });
            }

        }
        [HttpPost]
        [Route("detail/my")]
        public IHttpActionResult GetHabit6(dynamic obj)
        {
            try
            {
                var startindex = Convert.ToInt32(obj.startindex);
                var endindex = Convert.ToInt32(obj.endindex);
                var openId = Convert.ToString(obj.openid);
                var appId = Convert.ToString(obj.appid);

                Provide.HabitDetailProvide provide = new Provide.HabitDetailProvide();
                var list = provide.GetHabitDetail("openId='" + openId + "' and is_act=1", "id desc", startindex, endindex, openId,appId);

                var total = provide.GetPageTotal("openId='" + openId + "' and is_act=1");

                return Json(new { success = true, list = list, total = total });
            }
            catch (Exception ex)
            {
                return Json(new { success = false, msg = ex.Message, sourse = "sys" });
            }

        }
        [HttpPost]
        [Route("detail/my/habitid")]
        public IHttpActionResult GetHabit7(dynamic obj)
        {
            try
            {
                var habitId = Convert.ToInt32(obj.habitid);
                var startindex = Convert.ToInt32(obj.startindex);
                var endindex = Convert.ToInt32(obj.endindex);
                var openId = Convert.ToString(obj.openid);
                var appId = Convert.ToString(obj.appid);

                Provide.HabitDetailProvide provide = new Provide.HabitDetailProvide();
                var list = provide.GetHabitDetail("openId='" + openId + "' and is_act=1 and habit_id=" + habitId, "id desc", startindex, endindex, openId,appId);

                var total = provide.GetPageTotal("openId='" + openId + "' and is_act=1 and habit_id=" + habitId);

                return Json(new { success = true, list = list, total = total });
            }
            catch (Exception ex)
            {
                return Json(new { success = false, msg = ex.Message, sourse = "sys" });
            }
        }
    }
}
