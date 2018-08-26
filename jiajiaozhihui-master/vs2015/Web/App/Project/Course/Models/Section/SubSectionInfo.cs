using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace SfSoft.web.Course.Models.Section
{
    public class SubSectionInfo
    {
        public int CourseId { get; set; }
        public string SectionId { get; set; }
        public string SectionName { get; set; }
        public int SectionSn { get; set; }
        public List<CourseContent> Contents { get; set; }
    }
}