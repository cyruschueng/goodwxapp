using System;
using System.Collections.Generic;
using System.Linq;
using System.Net;
using System.Net.Http;
using System.Web.Http;

namespace SfSoft.web.WxOpen.Controller.Habit
{
    public class HabitDetailController : ApiController
    {
        [HttpGet]
        [Route("api/habit/detail/{habitid}/{startindex}/{endindex}/{sessionid}")]
        public IHttpActionResult GetHabit(int habitid,int startindex,int endindex,string sessionid)
        {
            try
            {

                var openId = Helper.SessionKeyProvide.GetOpenIdBySessionId(sessionid);
                Provide.Habit.HabitDetail provide = new Provide.Habit.HabitDetail();
                var list =new List<dynamic>();
                if (habitid == 0)
                {
                    list = provide.GetHabitDetail("is_act=1", "id desc", startindex, endindex, openId);
                }
                else {
                    list = provide.GetHabitDetail("habit_id=" + habitid + " and is_act=1", "id desc", startindex, endindex, openId, habitid);
                }
                
                var total = provide.GetPageTotal(habitid);

                return Json(new{success=true,list=list,total= total });
            }
            catch (Helper.SessionKeyException ex)
            {
                return Json(new { success = false, msg=ex.Message, sourse = "session" });
            }
            catch (Exception ex) {
                return Json(new { success = false, msg = ex.Message, sourse = "sys" });
            }
        }
        /// <summary>
        /// 所有的
        /// </summary>
        /// <param name="obj"></param>
        /// <returns></returns>
        [HttpPost]
        [Route("api/habit/detail/all")]
        public IHttpActionResult GetHabit(dynamic obj)
        {
            try {
                var startindex = Convert.ToInt32(obj.startindex);
                var endindex = Convert.ToInt32(obj.endindex);
                var sessionId = Convert.ToString(obj.sessionid);
                var openId = Helper.SessionKeyProvide.GetOpenIdBySessionId(sessionId);

                Provide.Habit.HabitDetail provide = new Provide.Habit.HabitDetail();
                var list = provide.GetHabitDetail("is_act=1", "id desc", startindex, endindex, openId);

                var total = provide.GetPageTotal("is_act=1");

                return Json(new { success = true, list = list, total = total });
            }
            catch (Helper.SessionKeyException ex)
            {
                return Json(new { success = false, msg = ex.Message, sourse = "session" });
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
        [Route("api/habit/detail/all/recommend")]
        public IHttpActionResult GetHabit2(dynamic obj)
        {
            try
            {
                var startindex = Convert.ToInt32(obj.startindex);
                var endindex = Convert.ToInt32(obj.endindex);
                var sessionId = Convert.ToString(obj.sessionid);
                var openId = Helper.SessionKeyProvide.GetOpenIdBySessionId(sessionId);

                Provide.Habit.HabitDetail provide = new Provide.Habit.HabitDetail();
                var list = provide.GetHabitDetail("is_act=1 and is_recommend=1", "id desc", startindex, endindex, openId);

                var total = provide.GetPageTotal("is_act=1 and is_recommend=1");

                return Json(new { success = true, list = list, total = total });
            }
            catch (Helper.SessionKeyException ex)
            {
                return Json(new { success = false, msg = ex.Message, sourse = "session" });
            }
            catch (Exception ex)
            {
                return Json(new { success = false, msg = ex.Message, sourse = "sys" });
            }

        }
        /// <summary>
        /// 单个习惯
        /// </summary>
        /// <param name="obj"></param>
        /// <returns></returns>
        [HttpPost]
        [Route("api/habit/detail/habitid")]
        public IHttpActionResult GetHabit3(dynamic obj)
        {
            try
            {
                var habitId = Convert.ToInt32(obj.habitid);
                var startindex = Convert.ToInt32(obj.startindex);
                var endindex = Convert.ToInt32(obj.endindex);
                var sessionId = Convert.ToString(obj.sessionid);
                var openId = Helper.SessionKeyProvide.GetOpenIdBySessionId(sessionId);

                Provide.Habit.HabitDetail provide = new Provide.Habit.HabitDetail();
                var list = provide.GetHabitDetail("habit_id=" + habitId + " and is_act = 1", "id desc", startindex, endindex, openId);

                var total = provide.GetPageTotal("habit_id=" + habitId + " and is_act = 1");

                return Json(new { success = true, list = list, total = total });
            }
            catch (Helper.SessionKeyException ex)
            {
                return Json(new { success = false, msg = ex.Message, sourse = "session" });
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
        [Route("api/habit/detail/habitid/recommend")]
        public IHttpActionResult GetHabit4(dynamic obj)
        {
            try
            {
                var habitId = Convert.ToInt32(obj.habitid);
                var startindex = Convert.ToInt32(obj.startindex);
                var endindex = Convert.ToInt32(obj.endindex);
                var sessionId = Convert.ToString(obj.sessionid);
                var openId = Helper.SessionKeyProvide.GetOpenIdBySessionId(sessionId);

                Provide.Habit.HabitDetail provide = new Provide.Habit.HabitDetail();
                var list = provide.GetHabitDetail("habit_id=" + habitId + " and is_act = 1 and is_recommend=1", "id desc", startindex, endindex, openId);
                
                var total = provide.GetPageTotal("habit_id=" + habitId + " and is_act = 1 and is_recommend=1");

                return Json(new { success = true, list = list, total = total });
            }
            catch (Helper.SessionKeyException ex)
            {
                return Json(new { success = false, msg = ex.Message, sourse = "session" });
            }
            catch (Exception ex)
            {
                return Json(new { success = false, msg = ex.Message, sourse = "sys" });
            }

        }
        [HttpPost]
        [Route("api/habit/detail/my")]
        public IHttpActionResult GetHabit5(dynamic obj)
        {
            try
            {
                var startindex = Convert.ToInt32(obj.startindex);
                var endindex = Convert.ToInt32(obj.endindex);
                var sessionId = Convert.ToString(obj.sessionid);
                var openId = Helper.SessionKeyProvide.GetOpenIdBySessionId(sessionId);

                Provide.Habit.HabitDetail provide = new Provide.Habit.HabitDetail();
                var list = provide.GetHabitDetail("openId='"+openId+"' and is_act=1", "id desc", startindex, endindex, openId);

                var total = provide.GetPageTotal("openId='" + openId + "' and is_act=1");

                return Json(new { success = true, list = list, total = total });
            }
            catch (Helper.SessionKeyException ex)
            {
                return Json(new { success = false, msg = ex.Message, sourse = "session" });
            }
            catch (Exception ex)
            {
                return Json(new { success = false, msg = ex.Message, sourse = "sys" });
            }

        }
        [HttpPost]
        [Route("api/habit/detail/my/habitid")]
        public IHttpActionResult GetHabit6(dynamic obj)
        {
            try
            {
                var habitId = Convert.ToInt32(obj.habitid);
                var startindex = Convert.ToInt32(obj.startindex);
                var endindex = Convert.ToInt32(obj.endindex);
                var sessionId = Convert.ToString(obj.sessionid);
                var openId = Helper.SessionKeyProvide.GetOpenIdBySessionId(sessionId);

                Provide.Habit.HabitDetail provide = new Provide.Habit.HabitDetail();
                var list = provide.GetHabitDetail("openId='" + openId + "' and is_act=1 and habit_id="+habitId, "id desc", startindex, endindex, openId);

                var total = provide.GetPageTotal("openId='" + openId + "' and is_act=1 and habit_id="+habitId);

                return Json(new { success = true, list = list, total = total });
            }
            catch (Helper.SessionKeyException ex)
            {
                return Json(new { success = false, msg = ex.Message, sourse = "session" });
            }
            catch (Exception ex)
            {
                return Json(new { success = false, msg = ex.Message, sourse = "sys" });
            }
        }
    }
}
