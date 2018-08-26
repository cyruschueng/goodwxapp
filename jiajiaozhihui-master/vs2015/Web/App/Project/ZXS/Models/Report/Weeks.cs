using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace SfSoft.web.ZXS.Models.Report
{
    public class Weeks
    {
        public int Week { get; set; }
        public IEnumerable<Models.ThemeTasks.TaskInfo> Infos { get; set; }
    }
}