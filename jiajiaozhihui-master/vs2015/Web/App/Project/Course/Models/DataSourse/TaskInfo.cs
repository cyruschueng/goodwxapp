using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace SfSoft.web.Course.Models.DataSourse
{
    public class TaskInfo
    {
        public int CourseId { get; set; }
        public int Gxdr { get; set; }
        public int GuWen { get; set; }
        public TaskZxs Zxs { get; set; }
    }
}