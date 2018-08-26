using System;
using System.Collections.Generic;
using System.Linq;
using System.Net;
using System.Net.Http;
using System.Web.Http;

namespace SfSoft.web.Habit.Controller
{
    [RoutePrefix("api/habits")]
    public class HabitsMyController : ApiController
    {
        [HttpPost]
        [Route("my/join/{habitId}")]
        public IHttpActionResult Post(int habitId, dynamic obj)
        {
            try
            {
                var appId = Convert.ToString(obj.appid);
                var openId = Convert.ToString(obj.openid);
                var target = Convert.ToInt32(obj.target);
                Provide.HabitMyProvide provide = new Provide.HabitMyProvide();
                var exist = provide.IsExist(habitId, openId,appId);
                if (exist)
                {
                    provide.UpdateHabitMy(habitId, openId, target,appId);
                }
                else
                {
                    provide.AddHabitMy(habitId, openId, target, appId);
                    Provide.HabitsProvide provideHabit = new Provide.HabitsProvide();
                    provideHabit.UpdateJoinNum(habitId);
                }
                return Json(new { success = true });
            }
            catch (Exception ex)
            {
                return Json(new { success = false, msg = ex.Message, sourse = "sys" });
            }
        }
        [HttpPost]
        [Route("my/info")]
        public IHttpActionResult GetHabit(dynamic obj)
        {
            try
            {
                var habitId = Convert.ToInt32(obj.habitid);
                var appId = Convert.ToString(obj.appid);
                var openId = Convert.ToString(obj.openid);
                Provide.HabitMyProvide provide = new Provide.HabitMyProvide();
                var model = provide.GetHabitMy(openId, habitId, appId);
                return Json(new { success = true, exist = model == null ? false : true, value = model == null ? -1 : model.target });
            }
            catch (Exception ex)
            {
                return Json(new { success = false, msg = ex.Message, sourse = "sys" });
            }
        }
        [HttpPost]
        [Route("my/exist")]
        public IHttpActionResult ExitMyHabit(dynamic obj)
        {
            try
            {
                var habitId = Convert.ToInt32(obj.habitid);
                var openId = Convert.ToString(obj.openid);
                var appId= Convert.ToString(obj.appId);
                Provide.HabitMyProvide provide = new Provide.HabitMyProvide();
                var exist = provide.IsExist(habitId, openId, appId);
                return Json(new { success = true, exist = exist });
            }
            catch (Exception ex)
            {
                return Json(new { success = false, msg = ex.Message, sourse = "sys" });
            }

        }
        [HttpPost]
        [Route("my/list")]
        public IHttpActionResult GetMyHabitList(dynamic obj)
        {
            try
            {
                var openId = Convert.ToString(obj.openid);
                var appId = Convert.ToString(obj.appid);

                Provide.HabitMyProvide provide = new Provide.HabitMyProvide();
                List<Model.wx_habit_my> list = provide.GetMyHabitList(openId, appId);

                Provide.HabitsProvide provideHabit = new Provide.HabitsProvide();
                List<Model.wx_habit> habits = provideHabit.GetHabits(appId);

                var host = Helper.Url.Host(false);
                var query = from m in list
                            join h in habits on m.habit_id equals h.id
                            select (new { id = m.id, habitId = m.habit_id, finish = m.finish, title = h.title, imgurl = host + h.imgurl });

                return Json(new { success = true, list = query.ToList() });
            }
            catch (Exception ex)
            {
                return Json(new { success = false, msg = ex.Message, sourse = "sys" });
            }
        }
    }
}
