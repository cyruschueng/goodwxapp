using System;
using System.Collections.Generic;
using System.Linq;
using System.Net;
using System.Net.Http;
using System.Web.Http;

namespace SfSoft.web.WxOpen.Controller.Habit
{
    /// <summary>
    /// 习惯订阅
    /// </summary>
    public class HabitMyController : ApiController
    {
        [HttpPost]
        [Route("api/habit/my/set")]
        public IHttpActionResult Post(dynamic obj)
        {
            try
            {
                var habitId = Convert.ToInt32(obj.habitid);
                var sessionId = Convert.ToString(obj.sessionid);
                var openId = Helper.SessionKeyProvide.GetOpenIdBySessionId(sessionId);
                var target = Convert.ToInt32(obj.target);
                Provide.Habit.HabitMy provide = new Provide.Habit.HabitMy();
                var exist = provide.IsExist(habitId, openId);
                if (exist)
                {
                    provide.UpdateHabitMy(habitId, openId, target);
                }
                else
                {
                    provide.AddHabitMy(habitId, openId, target);
                    Provide.Habit.Habit provideHabit = new Provide.Habit.Habit();
                    provideHabit.UpdateJoinNum(habitId);
                }
                return Json(new { success = true});
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
        [Route("api/habit/my/info")]
        public IHttpActionResult GetHabit(dynamic obj)
        {
            try {
                var habitId = Convert.ToInt32(obj.habitid);
                var sessionId = Convert.ToString(obj.sessionid);
                var openId = Helper.SessionKeyProvide.GetOpenIdBySessionId(sessionId);
                Provide.Habit.HabitMy provide = new Provide.Habit.HabitMy();
                var model= provide.GetHabitMy( openId, habitId);
                return Json(new { success = true,exist= model==null?false:true, value=model==null ?-1: model.target });
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
        [Route("api/habit/my/exist")]
        public IHttpActionResult ExitMyHabit(dynamic obj)
        {
            try {
                var habitId = Convert.ToInt32(obj.habitid);
                var sessionId = Convert.ToString(obj.sessionid);
                var openId = Helper.SessionKeyProvide.GetOpenIdBySessionId(sessionId);
                Provide.Habit.HabitMy provide = new Provide.Habit.HabitMy();
                var exist = provide.IsExist(habitId, openId);
                return Json(new { success = true,exist= exist });
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
        [Route("api/habit/my/list")]
        public IHttpActionResult GetMyHabitList(dynamic obj)
        {
            try
            {
                var sessionId = Convert.ToString(obj.sessionid);
                var openId = Helper.SessionKeyProvide.GetOpenIdBySessionId(sessionId);
                Provide.Habit.HabitMy provide = new Provide.Habit.HabitMy();
                List<Model.wx_habit_my> list = provide.GetMyHabitList(openId);

                Provide.Habit.Habit provideHabit = new Provide.Habit.Habit();
                var habits= provideHabit.GetHabits();

                var host = Helper.Url.Host(false);
                var query = from m in list
                            join h in habits on m.habit_id equals h.id
                            select (new {id=m.id,habitId=m.habit_id, finish= m.finish,title=h.title,imgurl= host + h.imgurl });

                return Json(new { success = true, list = query.ToList() });
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
