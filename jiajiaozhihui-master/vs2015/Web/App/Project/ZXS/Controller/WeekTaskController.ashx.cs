using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace SfSoft.web.ZXS.Controller
{
    /// <summary>
    /// WeekTaskController 的摘要说明
    /// </summary>
    public class WeekTaskController : IHttpHandler
    {

        public void ProcessRequest(HttpContext context)
        {
            context.Response.ContentType = "text/plain";
            var method = context.Request.QueryString["method"];
            switch (method)
            {
                case "info":
                    Get(context);
                    break;
            }
        }
        public void Get(HttpContext context)
        {
            string appId = context.Request["appId"];
            string openId = context.Request["openId"];

            try
            {
                var user = Helper.WeekTaskProvide.GetUser(appId, openId);
                var week = Helper.WeekTaskProvide.GetWeek(user.StartDate);

                var theme = Helper.WeekTaskProvide.GetThemeByWeek(week, appId);
                var weekNo = Helper.WeekTaskProvide.GetWeekNo(theme, week);


                var listTask = Helper.WeekTaskProvide.GetTasks();
                var myTasks = Helper.WeekTaskProvide.GetUserTasks(appId, openId, theme.Id);
                var listWeekTask = Helper.WeekTaskProvide.GetWeekTasks(theme.Id, weekNo, listTask, myTasks, appId, openId);
                var listMonthTask = Helper.WeekTaskProvide.GetWeekTasks(theme.Id, 0, listTask, myTasks, appId, openId);

                Models.ThemeTasks.Tasks tasks = new Models.ThemeTasks.Tasks();
                tasks.AppId = appId;
                tasks.OpenId = openId;
                tasks.MarkTaskInfos = listMonthTask;
                tasks.CommonTaskInfos = listWeekTask;
                //tasks.OptionalTaskInfos = listWeekTask.Where(e => e.Optional == 1);
                tasks.Theme = theme;
                tasks.User = user;
                if (user != null && user.StartDate != null && user.EndDate != null)
                {
                    var seconds = user.StartDate.Value.Date.Subtract(DateTime.Now.Date).Days;
                    tasks.IsTaskStart = seconds >= 1 ? false : true;
                    seconds = DateTime.Now.Date.Subtract(user.EndDate.Value.Date).Days;
                    tasks.IsTaskEnd = seconds >= 1 ? true : false;
                }
                context.Response.Write(Newtonsoft.Json.JsonConvert.SerializeObject(tasks, new Newtonsoft.Json.JsonSerializerSettings() { ContractResolver = new App.Helper.UnderlineSplitContractResolver() }));
            }
            catch (Exception ex)
            {
                context.Response.Write(Newtonsoft.Json.JsonConvert.SerializeObject(new Models.ThemeTasks.Tasks(), new Newtonsoft.Json.JsonSerializerSettings() { ContractResolver = new App.Helper.UnderlineSplitContractResolver() }));
            }
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