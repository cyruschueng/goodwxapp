using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace SfSoft.web.Course.Models.Course
{
    public class MyCourse
    {
        public int CourseId { get; set; }
        public string Title{ get; set; }
        public int CurrSection { get; set; }
        public int TotalSection { get; set; }
        public string ImgUrl { get; set; }
        public string MiniImgUrl { get; set; }
        public string Teacher { get; set; }
        public int Theme { get; set; }
        public int MediaType { get; set; }
    }
}