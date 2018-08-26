using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace SfSoft.web.Course.Models.Course
{
    public class Details:Base
    {
        public string Intro { get; set; }
        public string Detail { get; set; }
        public Model.WX_JJZH_Expert Teacher { get; set; }
        public IEnumerable<Models.Section.SectionInfo> Section { get; set; }
        public bool IsBuy { get; set; }
        public DateTime Now { get; set; }
    }
}