using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace SfSoft.web.ZXS.Models.Statistics
{
    public class Task
    {
        public int ThemeId { get; set; }
        public int ThemeSn { get; set; }
        public int Week { get; set; }
        public int Number { get; set; }
        public int Time { get; set; }
        public int Optional { get; set; }
        public int TaskClass { get; set; }
        /// <summary>
        /// 对于人工审核的要手动
        /// </summary>
        public bool IsCheck { get; set; }
    }
}