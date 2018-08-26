using System;
using System.Collections.Generic;
using System.Linq;
using System.Net;
using System.Net.Http;
using System.Web.Http;

namespace SfSoft.web.WxOpen.Controller.Habit
{
    public class HabitController : ApiController
    {
        /// <summary>
        /// 获取所有的习惯
        /// 每两个分一组，每组里面包涵二个元索
        /// </summary>
        /// <returns></returns>
        [HttpGet]
        [Route("api/habit/list")]
        public IHttpActionResult GetHabitList()
        {
            
            Provide.Habit.Habit provide = new Provide.Habit.Habit();
            var list= provide.GetHabits();
            var query = provide.OutHabit(list);
            /*
            List<dynamic> row = new List<dynamic>();
            for (var i = 0; i < list.Count; i = i + 2) {
                try
                {
                    var m = list.GetRange(i, 2);
                    var query = provide.OutHabit(m);
                    row.Add(query);
                }
                catch (ArgumentException ex)
                {
                    var m = list.GetRange(i, 1);
                    m.Add(new Model.wx_habit());
                    var query = provide.OutHabit(m);
                    row.Add(query);
                }
                catch (Exception ex) {
                    return Json(new { success = false });
                }
            }
            */
            return Json(new {
                success=true,
                list= query
            });
        }
        /// <summary>
        /// 获取所有的习惯
        /// 每两个分一组，每组里面包涵二个元索
        /// </summary>
        /// <returns></returns>
        [HttpGet]
        [Route("api/habit/list/{classify}")]
        public IHttpActionResult GetHabitList2(int classify)
        {
            Provide.Habit.Habit provide = new Provide.Habit.Habit();
            var list = provide.GetHabitsByClassify(classify);
            var query = provide.OutHabit(list);

            /*
            List<dynamic> row = new List<dynamic>();
            for (var i = 0; i < list.Count; i = i + 2)
            {
                try
                {
                    var m = list.GetRange(i, 2);
                    var query = provide.OutHabit(m);
                    row.Add(query);
                }
                catch (ArgumentException ex)
                {
                    var m = list.GetRange(i, 1);
                    m.Add(new Model.wx_habit());
                    var query = provide.OutHabit(m);
                    row.Add(query);
                }
                catch (Exception ex)
                {
                    return Json(new { success = false });
                }
            }
            */
            return Json(new
            {
                success = true,
                list = query
            });
        }
        [HttpPost]
        [Route("api/habit/info")]
        public IHttpActionResult GetHabitInfo(dynamic obj)
        {
            try
            {
                var habitId = Convert.ToInt32(obj.habitid);
                var sessionId = Convert.ToString(obj.sessionid);
                var openId = Helper.SessionKeyProvide.GetOpenIdBySessionId(sessionId);
                Provide.Habit.Habit provide = new Provide.Habit.Habit();
                var model= provide.GetHabit(habitId);

                Provide.Habit.HabitMy myProvide = new Provide.Habit.HabitMy();
                var isJoin= myProvide.IsExist(habitId, openId);

                return Json(new {
                    success =true,
                    isJoin= isJoin,
                    info =new {
                        title =model.title,
                        join_num =model.join_num
                    }
                });
            }
            catch (Helper.SessionKeyException ex)
            {
                return Json(new { success = false, msg = ex.Message, sourse = "session" });
            }
            catch (Exception ex) {
                return Json(new { success = false, msg = ex.Message, sourse = "sys" });
            }
        }
    }
}
