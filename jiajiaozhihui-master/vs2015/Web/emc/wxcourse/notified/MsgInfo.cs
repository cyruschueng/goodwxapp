using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace SfSoft.web.emc.wxcourse.notified
{
    public class MsgInfo
    {
        public string Teacher { get; set; }
        public string CourseName { get; set; }
        public string Intro { get; set; }
        public DateTime SchoolTime { get; set; }
        public string Remark { get; set; }
        public int CourseId { get; set; }
    }
}