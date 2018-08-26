using System;
using System.Collections.Generic;
using System.Linq;
using System.Net;
using System.Net.Http;
using System.Web.Http;

namespace SfSoft.web.WxOpen.Controller.Habit
{
    /// <summary>
    /// 打卡
    /// </summary>
    public class PunchCardController : ApiController
    {
        /// <summary>
        /// 获取今天打卡数据
        /// </summary>
        /// <param name="openid"></param>
        /// <param name="habitid"></param>
        /// <returns></returns>
        [HttpGet]
        [Route("api/punchcard/today/{habitid}/{sessionid}")]
        public IHttpActionResult GetPunchCard(int habitid, string sessionid)
        {
            try
            {
                Provide.Habit.PunchCard provide = new Provide.Habit.PunchCard();
                var openId = Helper.SessionKeyProvide.GetOpenIdBySessionId(sessionid);
                var model = provide.GetDayPunchCard(habitid, openId);

                Provide.Habit.Habit provideHabit = new Provide.Habit.Habit();
                var modelHabit= provideHabit.GetHabit(habitid);

                Provide.Habit.HabitMy provideHabitMy = new Provide.Habit.HabitMy();
                var modelHabitMy= provideHabitMy.GetHabitMy(openId, habitid);

                if (model != null) {
                    return Json(new {
                        success = true,
                        isPunch = true,
                        habitTitle= modelHabit.title,
                        finishDay= modelHabitMy==null?1:(modelHabitMy.finish??1)
                    });
                }
                return Json(new { success = true,isPunch=false, habitTitle=modelHabit.title });
            }
            catch (Helper.SessionKeyException ex) {
                return Json(new { success = false, msg=ex.Message, sourse = "session" });
            }
            catch (Exception ex)
            {
                return Json(new { success = false, msg = ex.Message, sourse = "sys" });
            }
        }
        [HttpPost]
        [Route("api/punchcard/today")]
        public IHttpActionResult AddPunchCard(dynamic obj)
        {
            try {
                Provide.Habit.PunchCard provide = new Provide.Habit.PunchCard();
                var sessionid = Convert.ToString(obj.sessionid);
                var habitId = Convert.ToInt32(obj.habitid);
                var groupId= Convert.ToInt32(obj.groupid);
                var openId = Helper.SessionKeyProvide.GetOpenIdBySessionId(sessionid);

                var ressult = provide.AddPunchCard(openId, habitId,groupId);
                Action<int, string> action = (a, b) =>
                {
                    Provide.Habit.HabitMy my = new Provide.Habit.HabitMy();
                    my.UpdatePunchCardNum(a, b);
                };
                action.BeginInvoke(habitId, openId,null,null);

                return Json(new { success = true });
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
