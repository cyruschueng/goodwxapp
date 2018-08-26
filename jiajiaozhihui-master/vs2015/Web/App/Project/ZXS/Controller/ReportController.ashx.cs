using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace SfSoft.web.ZXS.Controller
{
    /// <summary>
    /// ReportController 的摘要说明
    /// </summary>
    public class ReportController : IHttpHandler
    {

        public void ProcessRequest(HttpContext context)
        {
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
            int themeId =int.Parse(context.Request["themeId"]);

            try
            {
                var user = Helper.WeekTaskProvide.GetUser(appId, openId);
                var theme = new SfSoft.Model.WX_ZXS_Theme();
                if (themeId == 0)
                {
                    var week = Helper.WeekTaskProvide.GetWeek(user.StartDate); //从参加活动到现在是第几周
                    theme = Helper.WeekTaskProvide.GetThemeByWeek(week, appId); //通过周找到主题
                }
                else
                {
                    theme = Helper.ReportProvide.GetThemeById(appId, themeId);
                }

                var listTask = Helper.WeekTaskProvide.GetTasks();//所有的任务
                var myTasks = Helper.WeekTaskProvide.GetUserTasks(appId, openId, theme.Id);//已完成的任务
                //var weekNo = Helper.WeekTaskProvide.GetWeekNo(theme, week);// 确定这周是这个主题的第几周任务（如：第二个主题的第三周任务）
                List<Models.Report.Weeks> myWeekTask = new List<Models.Report.Weeks>();
                for (int weekNo = 1; weekNo < theme.Weeks + 1; weekNo++)
                {
                    myWeekTask.Add(new Models.Report.Weeks()
                    {
                        Week = weekNo,
                        Infos = Helper.WeekTaskProvide.GetWeekTasks(theme.Id, weekNo, listTask, myTasks, appId, openId)
                    });
                }
                var listMonthTask = Helper.WeekTaskProvide.GetWeekTasks(theme.Id, 0, listTask, myTasks, appId, openId);

                Models.Report.ReportInfo tasks = new Models.Report.ReportInfo();
                tasks.AppId = appId;
                tasks.OpenId = openId;
                tasks.MonthTaskInfos = listMonthTask;
                tasks.WeekTaskInfo = myWeekTask;
                //tasks.OptionalTaskInfos = listWeekTask.Where(e => e.Optional == 1);
                tasks.Theme = theme;
                tasks.User = user;
                if (user != null && user.StartDate != null && user.EndDate != null)
                {
                    var seconds = user.StartDate.Value.Subtract(DateTime.Now).Seconds;
                    tasks.IsTaskStart = seconds > 0 ? false : true;
                    seconds = DateTime.Now.Subtract(user.EndDate.Value).Seconds;
                    tasks.IsTaskEnd = seconds > 0 ? true : false;
                }
                context.Response.Write(Newtonsoft.Json.JsonConvert.SerializeObject(tasks, new Newtonsoft.Json.JsonSerializerSettings() { ContractResolver = new App.Helper.UnderlineSplitContractResolver() }));
            }
            catch (Exception ex)
            {
                context.Response.Write(Newtonsoft.Json.JsonConvert.SerializeObject(new Models.Report.ReportInfo(), new Newtonsoft.Json.JsonSerializerSettings() { ContractResolver = new App.Helper.UnderlineSplitContractResolver() }));
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