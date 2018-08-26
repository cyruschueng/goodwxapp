using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace SfSoft.web.ZXS.Helper
{
    public class ReportProvide
    {
        private static IEnumerable<SfSoft.Model.WX_ZXS_PlayerTask> _userTasks;
        private static List<SfSoft.Model.WX_ZXS_Signin> _signInList;
        private static string _appId;
        private static string _oppenId;
        private static int _themeId;
        private static int _week;

        public static SfSoft.Model.WX_ZXS_Players GetUser(string appId, string openId)
        {
            SfSoft.BLL.WX_ZXS_Players bll = new SfSoft.BLL.WX_ZXS_Players();
            return bll.GetModelList("AppId='" + appId + "' and OpenId='" + openId + "'").AsEnumerable().FirstOrDefault();
        }
        public static IEnumerable<Models.ThemeTasks.TaskInfo> GetWeekTasks(int themeId, int week, IEnumerable<SfSoft.Model.WX_ZXS_Task> tasks, IEnumerable<SfSoft.Model.WX_ZXS_PlayerTask> userTasks, string appId, string openId)
        {
            _userTasks = userTasks;
            _appId = appId;
            _oppenId = openId;
            _themeId = themeId;
            _week = week;

            SignInCompleteList();
            SfSoft.BLL.WX_ZXS_WeekTask bll = new SfSoft.BLL.WX_ZXS_WeekTask();
            var lists = bll.GetModelList("ThemeId=" + themeId + " and Week=" + week + " and IsAct=1").OrderBy(e => e.Sn);
            List<Models.ThemeTasks.TaskInfo> listTaskInfo = new List<Models.ThemeTasks.TaskInfo>();
            foreach (var m in lists)
            {
                var task = tasks.FirstOrDefault(e => e.Id == m.TaskId);
                var number = CompleteNumber(task.TaskType ?? 0, m.Id);
                var isTodayComplete = IsTodayComplete(m.Id, task.TaskType ?? 0);
                var reciteState = ReciteState(task.TaskType ?? 0, m.Id, task.Time ?? 0);

                listTaskInfo.Add(new Models.ThemeTasks.TaskInfo()
                {
                    TaskId = m.Id,
                    Hash = m.Hash,
                    Number = number,
                    Quantity = task.Time ?? 0,
                    IsComplete = ((task.Time ?? 0) - number) > 0 ? false : true,
                    Optional = m.Optional ?? 0,
                    TaskClass = m.TaskClass ?? 0,
                    HZ = GetHZName(task.HZ),
                    TaskTitle = task.Title,
                    TaskType = task.TaskType ?? 0,
                    Unit = task.Unit,
                    Expository = task.Remark,
                    Logo = task.ImgLogo,
                    Week = week,
                    IsTodayComplete = isTodayComplete,
                    Other = m.Other,
                    Introduce = task.Introduce,
                    ReciteState = reciteState
                });
            }
            return listTaskInfo.AsEnumerable();
        }

        public static SfSoft.Model.WX_ZXS_Theme GetTheme(int themeId)
        {
            SfSoft.BLL.WX_ZXS_Theme bll = new SfSoft.BLL.WX_ZXS_Theme();
            return bll.GetModel(themeId);
        }
        /// <summary>
        /// 主题信息
        /// </summary>
        /// <param name="week"></param>
        /// <returns></returns>
        public static SfSoft.Model.WX_ZXS_Theme GetThemeByWeek(int week, string appId)
        {
            SfSoft.BLL.WX_ZXS_Theme bll = new SfSoft.BLL.WX_ZXS_Theme();
            return bll.GetModelList("").AsEnumerable().Where(e => e.StartWeek <= week && e.EndWeek >= week && e.AppId == appId).FirstOrDefault();
        }
        /// <summary>
        /// 单个任务
        /// </summary>
        /// <param name="taskId"></param>
        /// <returns></returns>
        public static SfSoft.Model.WX_ZXS_Task GetTask(int? taskId)
        {
            SfSoft.BLL.WX_ZXS_Task bll = new SfSoft.BLL.WX_ZXS_Task();
            return bll.GetModel(Convert.ToInt32(taskId));
        }
        /// <summary>
        /// 所有的任务
        /// </summary>
        /// <returns></returns>
        public static IEnumerable<SfSoft.Model.WX_ZXS_Task> GetTasks()
        {
            SfSoft.BLL.WX_ZXS_Task bll = new SfSoft.BLL.WX_ZXS_Task();
            return bll.GetModelList("").AsEnumerable();
        }
        /// <summary>
        /// 从激活开始算距算在是第几周
        /// </summary>
        /// <param name="startDate"></param>
        /// <returns></returns>
        public static int GetWeek(DateTime? startDate)
        {
            var days = DateTime.Now.Date.Subtract(Convert.ToDateTime(startDate).Date).Days;
            int d = days / 7;
            int s = days % 7;
            if (d == 0) return 1;
            return d + 1;
        }
        public static int GetWeekNo(SfSoft.Model.WX_ZXS_Theme model, int week)
        {
            if (model != null)
            {
                return (week - (model.StartWeek ?? 0)) + 1;
            }
            return 1;
        }
        /// <summary>
        /// 我完成的任务
        /// </summary>
        /// <param name="appId"></param>
        /// <param name="openId"></param>
        /// <param name="themeId"></param>
        /// <returns></returns>
        public static IEnumerable<SfSoft.Model.WX_ZXS_PlayerTask> GetUserTasks(string appId, string openId, int themeId)
        {
            SfSoft.BLL.WX_ZXS_PlayerTask bll = new SfSoft.BLL.WX_ZXS_PlayerTask();
            return bll.GetModelList("AppId='" + appId + "' and OpenId='" + openId + "' and ThemeId=" + themeId).AsEnumerable();
        }
        /// <summary>
        /// 完成数量
        /// </summary>
        /// <param name="tasks"></param>
        /// <param name="appId"></param>
        /// <param name="openId"></param>
        /// <param name="themeId"></param>
        /// <param name="taskId"></param>
        /// <returns></returns>
        private static int MediaCompleteNumber(int taskId)
        {

            return _userTasks.Where(e => e.AppId == _appId && e.OpenId == _oppenId && e.ThemeId == _themeId && e.TaskId == taskId && e.Week == _week).Count();
        }
        private static void SignInCompleteList()
        {
            SfSoft.BLL.WX_ZXS_Signin bll = new SfSoft.BLL.WX_ZXS_Signin();
            var list = bll.GetModelList("AppId='" + _appId + "' and OpenId='" + _oppenId + "' and Week=" + _week);
            if (list == null)
            {
                _signInList = new List<SfSoft.Model.WX_ZXS_Signin>();
            }
            else
            {
                _signInList = list;
            }
        }
        /// <summary>
        /// 见证完成量
        /// </summary>
        /// <param name="appId"></param>
        /// <param name="openId"></param>
        /// <param name="themeId"></param>
        /// <returns></returns>
        private static int WitnessCompleteNumber()
        {
            SfSoft.BLL.WX_ZXS_Witness bll = new SfSoft.BLL.WX_ZXS_Witness();
            return bll.GetModelList("AppId='" + _appId + "' and OpenId='" + _oppenId + "' and ThemeId=" + _themeId).Count;
        }
        private static int CompleteNumber(int taskType, int taskId)
        {
            int number = 0;
            switch (taskType)
            {
                case 4:
                    number = WitnessCompleteNumber();
                    break;
                case 5:
                    number = _signInList.Where(e => e.TaskId == taskId).Count();
                    break;
                case 6:
                    number = 0;
                    break;
                default:
                    number = MediaCompleteNumber(taskId);
                    break;
            }
            return number;
        }
        /// <summary>
        /// 今天有没有完成任务
        /// </summary>
        /// <param name="tasks"></param>
        /// <param name="appId"></param>
        /// <param name="openId"></param>
        /// <param name="themeId"></param>
        /// <param name="taskId"></param>
        /// <returns></returns>
        private static bool IsTodayComplete(int taskId, int taskType)
        {
            int number = 0;
            switch (taskType)
            {
                case 4:
                case 6:
                    number = 0;
                    break;
                case 5:
                    number = _signInList.Where(e => e.TaskId == taskId && e.CreateDate.Value.Subtract(DateTime.Now).Days == 0).Count();
                    break;
                default:
                    number = _userTasks.Where(e => e.AppId == _appId && e.OpenId == _oppenId && e.ThemeId == _themeId && e.TaskId == taskId && DateTime.Now.Date == e.CreateDate.Value.Date && e.Week == _week).Count();
                    break;
            }
            return number > 0 ? true : false;
        }
        private static string GetHZName(int hz)
        {
            string result = "";
            switch (hz)
            {
                case 1:
                    result = "天";
                    break;
                case 2:
                    result = "周";
                    break;
                case 3:
                    result = "月";
                    break;

            }
            return result;
        }
        /// <summary>
        /// 
        /// </summary>
        /// <param name="taskType"></param>
        /// <param name="appId"></param>
        /// <param name="openId"></param>
        /// <param name="themeId"></param>
        /// <param name="taskId"></param>
        /// <param name="time">申请次数</param>
        /// <returns>-1:忽略 0:申请 1：完成 2:等审 3：超过申请次数(失败)</returns>
        private static Models.Recite.ReciteResult ReciteState(int taskType, int taskId, int time)
        {
            if (taskType != 7) return new Models.Recite.ReciteResult();

            var reciteResult = new Models.Recite.ReciteResult();
            SfSoft.BLL.WX_ZXS_ApplyRecite bll = new SfSoft.BLL.WX_ZXS_ApplyRecite();
            var list = bll.GetModelList("AppId='" + _appId + "' and openId='" + _oppenId + "' and ThemeId=" + _themeId + " and TaskId=" + taskId + "");
            if (list.Count() == 0)
            {
                //还没有申请
                reciteResult.ApplyState = 0;
            }
            else
            {

                if (list.Where(e => e.State == 1).Count() > 0)
                {
                    //通过
                    reciteResult.ApplyState = 1;
                }
                else
                {
                    if (list.Count() >= time && list.Where(e => e.State == 0).Count() == 0)
                    {
                        //超过申请次数
                        reciteResult.ApplyState = 3;
                    }
                    else
                    {
                        if (list.Where(e => e.State == 0).Count() > 0)
                        {
                            //正在审核
                            reciteResult.ApplyState = 2;
                        }
                        else
                        {
                            //申请
                            reciteResult.ApplyState = 0;
                        }
                    }
                }
            }
            reciteResult.ApplyNumber = list.Count();
            return reciteResult;
        }
        public static SfSoft.Model.WX_ZXS_Theme GetThemeById(string appId, int themeId)
        {
            SfSoft.BLL.WX_ZXS_Theme bll = new SfSoft.BLL.WX_ZXS_Theme();
            return bll.GetModel(themeId);
        }
    }
}