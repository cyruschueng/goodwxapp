using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace SfSoft.web.ZXS.Controller
{
    /// <summary>
    /// StatisticsController 的摘要说明
    /// </summary>
    public class StatisticsController : IHttpHandler
    {

        public void ProcessRequest(HttpContext context)
        {
            var method = context.Request.QueryString["method"];
            var result = "";
            switch (method)
            {
                case "get":
                    Get(context);
                    break;
            }
        }
        public void Get(HttpContext context)
        {
            string appId= context.Request["appId"];
            string openId= context.Request["openId"];

            Helper.StatisticsProvide provide = new Helper.StatisticsProvide(appId, openId);
            List<SfSoft.Model.WX_ZXS_Theme> themes = provide.GetThemes(appId);
            List<Models.Statistics.Themes> themsTask = provide.GetThemesTask();
            SfSoft.Model.WX_ZXS_Players player = provide.GetUser(appId, openId);
            Models.Statistics.User user = new Models.Statistics.User();
            user.AppId = appId;
            user.OpenId = openId;
            user.StartDate = player.StartDate;
            user.EndDate = player.EndDate;
            user.State = player.State ?? 0;
            user.ThemeNumber = themes.Count();
            user.ThemeName = themsTask.Where(e => e.IsOpen == true && e.IsOver == false).First().ThemeName;
            user.UnOpenNumber = themsTask.Where(e => e.IsOpen == false).Count();
            user.UserTaskClass = new Models.Statistics.UserTaskClass()
            {
                MTask = new Models.Statistics.UserTaskClassDetail()
                {
                    CheckingNumber = themsTask.Where(e => e.TaskClass.MTask.IsCheck == false && e.IsOpen == true).Count(),
                    CompletedNumber = themsTask.Where(e => e.IsOver == true && e.TaskClass.MTask.IsCheck == true && e.IsOpen == true).Count(),
                    FailNumber = themsTask.Where(e => e.TaskClass.MTask.IsSuccess == false && e.IsOver == true && e.TaskClass.MTask.IsCheck == true && e.IsOpen == true).Count(),
                    SuccessNumber = themsTask.Where(e => e.TaskClass.MTask.IsSuccess == true && e.IsOver == true && e.TaskClass.MTask.IsCheck == true && e.IsOpen == true).Count(),
                },
                WTask = new Models.Statistics.UserTaskClassDetail()
                {
                    CheckingNumber = themsTask.Where(e => e.TaskClass.WTask.IsCheck == false && e.IsOpen == true).Count(),
                    CompletedNumber = themsTask.Where(e => e.IsOver == true && e.TaskClass.WTask.IsCheck == true && e.IsOpen == true).Count(),
                    FailNumber = themsTask.Where(e => e.TaskClass.WTask.IsSuccess == false && e.IsOver == true && e.TaskClass.WTask.IsCheck == true && e.IsOpen == true).Count(),
                    SuccessNumber = themsTask.Where(e => e.TaskClass.WTask.IsSuccess == true && e.IsOver == true && e.TaskClass.WTask.IsCheck == true && e.IsOpen == true).Count(),
                }
            };
            context.Response.Write(Newtonsoft.Json.JsonConvert.SerializeObject(user, new Newtonsoft.Json.JsonSerializerSettings() { ContractResolver = new App.Helper.UnderlineSplitContractResolver() }));
        }
        public bool IsReusable
        {
            get
            {
                return false;
            }
        }
    }
}