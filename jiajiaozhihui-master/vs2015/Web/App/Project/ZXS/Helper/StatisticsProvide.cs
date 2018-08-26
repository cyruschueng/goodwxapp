using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace SfSoft.web.ZXS.Helper
{
    public class StatisticsProvide
    {
        private string _appId;
        private string _openId;
        private SfSoft.Model.WX_ZXS_Players _user;
        private IEnumerable<SfSoft.Model.WX_ZXS_PlayerTask> _userTasks;
        private List<SfSoft.Model.WX_ZXS_Signin> _signInList;
        private int _weekNo;
        private int _themeId;
        public StatisticsProvide(string appId, string openId)
        {
            this._appId = appId;
            this._openId = openId;
            _user = GetUser(appId, openId);
        }
        public List<Models.Statistics.Themes> GetThemesTask()
        {
            List<Models.Statistics.Themes> myThemes = new List<Models.Statistics.Themes>();

            SfSoft.BLL.WX_ZXS_Theme bll = new SfSoft.BLL.WX_ZXS_Theme();
            var themeList = bll.GetModelList("IsAct=1").OrderBy(e => e.Sn);
            foreach (var theme in themeList)
            {
                _themeId = theme.Id;
                List<SfSoft.Model.WX_ZXS_WeekTask> weekTaskList = GetWeekTaskList(theme.Id);
                List<Models.Statistics.Task> tasks = GetTasks(theme, weekTaskList);
                myThemes.Add(new Models.Statistics.Themes()
                {
                    Sn = theme.Sn ?? 0,
                    Weeks = theme.Weeks ?? 0,
                    IsOpen = IsOpen(theme),
                    IsOver = IsOver(theme),

                    TaskClass = new Models.Statistics.TaskClass()
                    {
                        MTask = new Models.Statistics.TaskClassDetail()
                        {
                            Type = 1,
                            IsCheck = tasks.Where(e => e.IsCheck == false && e.TaskClass == 1).Count() > 0 ? false : true,
                            IsSuccess = tasks.Where(e => e.Optional != 1 && e.Number < e.Time && e.TaskClass == 1).Count() > 0 || tasks.Count == 0 ? false : true,
                        },
                        WTask = new Models.Statistics.TaskClassDetail()
                        {
                            Type = 0,
                            IsCheck = tasks.Where(e => e.IsCheck == false && (e.TaskClass == 0)).Count() > 0 ? false : true,
                            IsSuccess = tasks.Where(e => e.Optional != 1 && e.Number < e.Time && (e.TaskClass == 0)).Count() > 0 || tasks.Count == 0 ? false : true,
                        }
                    },
                    ThemeName = theme.Title
                });
            }
            return myThemes;
        }
        private List<Models.Statistics.Task> GetTasks(SfSoft.Model.WX_ZXS_Theme theme, List<SfSoft.Model.WX_ZXS_WeekTask> weekTaskList)
        {
            List<SfSoft.Model.WX_ZXS_Task> taskList = GetTaskList();
            List<Models.Statistics.Task> myTask = new List<Models.Statistics.Task>();
            for (var week = 1; week < theme.Weeks + 1; week++)
            {
                _weekNo = week;
                SignInCompleteList();
                var weekTasks = weekTaskList.Where(e => e.Week == week);
                _userTasks = GetUserTasks(week);
                foreach (var weekTask in weekTasks)
                {

                    var task = taskList.FirstOrDefault(e => e.Id == weekTask.TaskId);
                    var time = task.Time;
                    var type = task.TaskType ?? 0;
                    var taskId = task.Id;
                    var optional = weekTask.Optional;
                    myTask.Add(new Models.Statistics.Task()
                    {
                        ThemeId = theme.Id,
                        Week = week,
                        Time = time ?? 0,
                        Number = CompleteNumber(type, taskId),
                        Optional = optional ?? 0,
                        IsCheck = IsCheck(type),
                        TaskClass = weekTask.TaskClass ?? 0
                    });
                }
            }
            return myTask;
        }

        public SfSoft.Model.WX_ZXS_Players GetUser(string appId, string openId)
        {
            SfSoft.BLL.WX_ZXS_Players bll = new SfSoft.BLL.WX_ZXS_Players();
            SfSoft.Model.WX_ZXS_Players model = bll.GetModel(appId, openId);
            if (model != null)
            {
                return model;
            };
            return new SfSoft.Model.WX_ZXS_Players();
        }
        /// <summary>
        /// 活动是不是开启
        /// </summary>
        /// <param name="theme"></param>
        /// <returns></returns>
        private bool IsOpen(SfSoft.Model.WX_ZXS_Theme theme)
        {
            var startDay = ((theme.StartWeek ?? 0) - 1) * 7;
            var endDay = (theme.EndWeek ?? 0) * 7;

            if (DateTime.Now.Date.Subtract(_user.StartDate.Value.AddDays(startDay).Date).Days >= 0 && DateTime.Now.Date.Subtract(_user.StartDate.Value.AddDays(endDay).Date).Days <= 0)
            {
                return true;
            }
            return false;
        }
        /// <summary>
        /// 活动是不是结束
        /// </summary>
        /// <param name="theme"></param>
        /// <returns></returns>
        private bool IsOver(SfSoft.Model.WX_ZXS_Theme theme)
        {
            var endDay = (theme.EndWeek ?? 0) * 7;
            if (DateTime.Now.Date.Subtract(_user.StartDate.Value.AddDays(endDay).Date).Days > 0)
            {
                return true;
            }
            return false;
        }
        private List<SfSoft.Model.WX_ZXS_WeekTask> GetWeekTaskList(int themeId)
        {
            SfSoft.BLL.WX_ZXS_WeekTask bll = new SfSoft.BLL.WX_ZXS_WeekTask();
            return bll.GetModelList("ThemeId=" + themeId);
        }
        private List<SfSoft.Model.WX_ZXS_Task> GetTaskList()
        {
            SfSoft.BLL.WX_ZXS_Task bll = new SfSoft.BLL.WX_ZXS_Task();
            return bll.GetModelList("");
        }

        private IEnumerable<SfSoft.Model.WX_ZXS_PlayerTask> GetUserTasks(int themeId)
        {
            SfSoft.BLL.WX_ZXS_PlayerTask bll = new SfSoft.BLL.WX_ZXS_PlayerTask();
            return bll.GetModelList("AppId='" + _appId + "' and OpenId='" + _openId + "' and ThemeId=" + themeId).AsEnumerable();
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
        private int MediaCompleteNumber(int taskId)
        {

            return _userTasks.Where(e => e.AppId == _appId && e.OpenId == _openId && e.ThemeId == _themeId && e.TaskId == taskId && e.Week == _weekNo).Count();
        }
        private void SignInCompleteList()
        {
            SfSoft.BLL.WX_ZXS_Signin bll = new SfSoft.BLL.WX_ZXS_Signin();
            var list = bll.GetModelList("AppId='" + _appId + "' and OpenId='" + _openId + "' and Week=" + _weekNo);
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
        private int WitnessCompleteNumber()
        {
            SfSoft.BLL.WX_ZXS_Witness bll = new SfSoft.BLL.WX_ZXS_Witness();
            return bll.GetModelList("AppId='" + _appId + "' and OpenId='" + _openId + "' and ThemeId=" + _themeId).Count;
        }
        private int CompleteNumber(int taskType, int taskId)
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
        private bool IsCheck(int taskType)
        {
            bool isCheck = false;
            switch (taskType)
            {
                case 7:
                    isCheck = false;
                    break;
                default:
                    isCheck = true;
                    break;
            }
            return isCheck;
        }
        public List<SfSoft.Model.WX_ZXS_Theme> GetThemes(string appId)
        {
            SfSoft.BLL.WX_ZXS_Theme bll = new SfSoft.BLL.WX_ZXS_Theme();
            return bll.GetModelList("AppId='" + appId + "' and IsAct=1 ");
        }
    }
}