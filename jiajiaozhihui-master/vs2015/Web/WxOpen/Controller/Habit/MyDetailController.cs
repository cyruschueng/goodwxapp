using System;
using System.Collections.Generic;
using System.Linq;
using System.Net;
using System.Net.Http;
using System.Web.Http;

namespace SfSoft.web.WxOpen.Controller.Habit
{
    public class MyDetailController : ApiController
    {

        [HttpPost]
        [Route("api/habit/card/add")]
        public IHttpActionResult AddDetail(dynamic obj)
        {
            try
            {
                var habitid = Convert.ToInt32(obj.habitid);
                var sessionid = Convert.ToString(obj.sessionid);
                var notes = Convert.ToString(obj.notes);
                var groupId = Convert.ToInt32(obj.groupid);

                var openId = Helper.SessionKeyProvide.GetOpenIdBySessionId(sessionid);

                Provide.Habit.MyDetail provide = new Provide.Habit.MyDetail();

                /*
                //判断是不是重设开始日期
                //当打卡天数中断将重新开始
                Provide.Habit.HabitMy myProvide = new Provide.Habit.HabitMy();
                var isRestart = myProvide.IsRestart(habitid, openId);
                if (isRestart == true)
                {
                    myProvide.UpdateStartDate(habitid, openId);
                }
                */
                var result = provide.AddDetail(habitid, openId, notes, groupId);

                return Json(new { success=true,index=result});
            }
            catch (Helper.SessionKeyException ex) {
                return Json(new { success = false, sourse = "session" });
            }
            catch (Exception ex)
            {
                return Json(new { success = false, sourse = "sys" });
            }
        }
    }
}
