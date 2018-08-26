using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace SfSoft.web.ZXS.Models.ThemeTasks
{
    public class Tasks
    {
        public string AppId { get; set; }
        public string OpenId { get; set; }
        public bool IsTaskStart { get; set; }
        public bool IsTaskEnd { get; set; }
        public SfSoft.Model.WX_ZXS_Theme Theme { get; set; }
        public SfSoft.Model.WX_ZXS_Players User { get; set; }
        /// <summary>
        /// 大关
        /// </summary>
        public IEnumerable<Models.ThemeTasks.TaskInfo> MarkTaskInfos { get; set; }
        /// <summary>
        /// 普通关
        /// </summary>
        public IEnumerable<Models.ThemeTasks.TaskInfo> CommonTaskInfos { get; set; }
        /// <summary>
        /// 可选
        /// </summary>
        public IEnumerable<Models.ThemeTasks.TaskInfo> OptionalTaskInfos { get; set; }
    }
}