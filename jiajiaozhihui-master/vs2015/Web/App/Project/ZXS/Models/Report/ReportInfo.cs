using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace SfSoft.web.ZXS.Models.Report
{
    public class ReportInfo
    {
        public string AppId { get; set; }
        public string OpenId { get; set; }
        public bool IsTaskStart { get; set; }
        public bool IsTaskEnd { get; set; }
        public SfSoft.Model.WX_ZXS_Theme Theme { get; set; }
        public SfSoft.Model.WX_ZXS_Players User { get; set; }
        /// <summary>
        /// 月任务
        /// </summary>
        public IEnumerable<Models.ThemeTasks.TaskInfo> MonthTaskInfos { get; set; }
        /// <summary>
        /// 周任务
        /// </summary>
        public IEnumerable<Models.Report.Weeks> WeekTaskInfo { get; set; }
    }
}