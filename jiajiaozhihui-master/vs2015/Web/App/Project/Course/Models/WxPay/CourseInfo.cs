using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace SfSoft.web.Course.Models.WxPay
{
    public class CourseInfo
    {
        public string CourseName { get; set; }
        public string MaxImgUrl { get; set; }
        public string MiniImgUrl { get; set; }
        public decimal OriginaPrice { get; set; }
        public decimal Price { get; set; }
        public int CourseType { get; set; }
        public string Intro { get; set; }
        public string Details { get; set; }
    }
}