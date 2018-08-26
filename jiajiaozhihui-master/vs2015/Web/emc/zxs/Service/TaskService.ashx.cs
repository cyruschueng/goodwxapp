using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace SfSoft.web.emc.zxs.Service
{
    /// <summary>
    /// TaskService 的摘要说明
    /// </summary>
    public class TaskService : IHttpHandler
    {

        public void ProcessRequest(HttpContext context)
        {
            context.Response.ContentType = "text/plain";
            string result = AddTask(context);
            context.Response.Write(result);
        }
        private string AddTask(HttpContext context)
        {
            try
            {
                var themeId = context.Request["themeid"]; 
                var tasks = context.Request["tasks"];
                var week = context.Request["week"];
                BLL.WX_ZXS_WeekTask bll = new BLL.WX_ZXS_WeekTask();
                Model.WX_ZXS_WeekTask model = null;
                string[] arrTask = tasks.Split(new char[] { ',' });
                //if (arrTask.Length > 0) {
                //    DeleteTask(themeId, week);
                //}
                foreach (string task in arrTask)
                {
                    if (!IsExist(themeId, week, task)) {
                        model = new Model.WX_ZXS_WeekTask();
                        model.IsAct = 1;
                        model.TaskId = int.Parse(task);
                        model.ThemeId = int.Parse(themeId);
                        model.Week = int.Parse(week);
                        if (week == "0")
                        {
                            model.TaskClass = 1;
                        }
                        else {
                            model.TaskClass = 0;
                        }
                        bll.Add(model);
                    }
                }
                return "ok";
            }
            catch (Exception ex) {
                return "error";
            }
        }
        private void DeleteTask(string themeId, string week)
        {
            string sql = "delete WX_ZXS_WeekTask where ThemeId=" + themeId + " and Week=" + week;
            SfSoft.DBUtility.DbHelperSQL.ExecuteSql(sql);
        }
        private bool IsExist(string themeId, string week,string taskId)
        {
            BLL.WX_ZXS_WeekTask bll = new BLL.WX_ZXS_WeekTask();
            int row= bll.GetModelList("ThemeId=" + themeId + " and Week=" + week + " and TaskId="+taskId+" and IsAct=1").Count;
            return row > 0 ? true : false;
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