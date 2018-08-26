using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace SfSoft.web.ZXS.Controller
{
    /// <summary>
    /// CourseTaskController 的摘要说明
    /// </summary>
    public class CourseTaskController : IHttpHandler
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
                case "course":
                    GetCourse(context);
                    break;
            }
        }
        private void GetCourse(HttpContext context)
        {
            var courseId = context.Request["courseid"];
            SfSoft.web.Course.Helper.TaskProvide provide = new SfSoft.web.Course.Helper.TaskProvide(int.Parse(courseId));
            var config = provide.GetConfig();
            var redirectUrl= Helper.CourseTaskProvide.GetCourseUrl(config.CourseId);
            var model = new
            {
                Title=config.Zxs.Title,
                Url=redirectUrl
            };
            context.Response.Write(Newtonsoft.Json.JsonConvert.SerializeObject(model, new Newtonsoft.Json.JsonSerializerSettings() { ContractResolver = new App.Helper.UnderlineSplitContractResolver() }));
        }
        public void Get(HttpContext context)
        {
            string appId = context.Request["appId"];
            string openId = context.Request["openId"];
            string themeId = context.Request["themeId"];

            try
            {
                var user = Helper.CourseTaskProvide.GetUser(appId, openId);
                var week = 1; //Helper.CourseTaskProvide.GetWeek(user.StartDate); 定一周

                var theme = Helper.CourseTaskProvide.GetTheme(int.Parse(themeId));

                var weekNo = 1;  //Helper.CourseTaskProvide.GetWeekNo(theme, week);

                var listTask = Helper.CourseTaskProvide.GetTasks();
                var myTasks = Helper.CourseTaskProvide.GetUserTasks(appId, openId, theme.Id);
                var listWeekTask = Helper.CourseTaskProvide.GetWeekTasks(theme.Id, weekNo, listTask, myTasks, appId, openId);
                var listMonthTask = Helper.CourseTaskProvide.GetWeekTasks(theme.Id, 0, listTask, myTasks, appId, openId);

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