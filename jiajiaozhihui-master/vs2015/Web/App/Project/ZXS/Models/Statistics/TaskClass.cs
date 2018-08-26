using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace SfSoft.web.ZXS.Models.Statistics
{
    public class TaskClass
    {
        /// <summary>
        /// 月任务
        /// </summary>
        public TaskClassDetail MTask { get; set; }
        /// <summary>
        /// 周任务
        /// </summary>
        public TaskClassDetail WTask { get; set; }
    }
}