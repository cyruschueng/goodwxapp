using System;
using System.Collections.Generic;
using System.Linq;
using System.Net;
using System.Net.Http;
using System.Web.Http;

namespace SfSoft.web.Microlecture.Controller
{
    /// <summary>
    /// 打开
    /// </summary>
    [RoutePrefix("app/microlecture")]
    public class SignController : ApiController
    {
        [HttpPost]
        [Route("sign/{habitId}")]
        public IHttpActionResult GetSign(int habitId, dynamic obj)
        {
            try
            {
                var openId = Convert.ToString(obj.openid);
                var appId = Convert.ToString(obj.appid);

                Provide.SignProvide provide = new Provide.SignProvide();
                var list = provide.GetSign(habitId, openId, appId);
                return Json(new { success = true, list = list });
            }
            catch (Exception ex)
            {
                return Json(new { success = false });
            }
        }
        [HttpPost]
        [Route("sign/add/{habitId}")]
        public IHttpActionResult AddHabitCard(int habitId, dynamic obj)
        {
            try
            {
                var openId = Convert.ToString(obj.openid);
                var appId = Convert.ToString(obj.appid);
                Provide.HabitsProvide habitsProvide = new Provide.HabitsProvide();
                if (habitsProvide.ExistHabitByUser(habitId, openId, appId) == false) {
                    habitsProvide.AddHabitMy(habitId, openId,7, appId);
                }

                Provide.SignProvide provide = new Provide.SignProvide();
                provide.AddSign(openId, habitId, appId);

                habitsProvide.UpdateSignNumAnsy(habitId, openId, appId);

                return Json(new { success = true });
            }
            catch (Exception ex)
            {
                return Json(new { success = false });
            }
        }

    }
}
