using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace SfSoft.web.Course.Models.Course
{
    public class BagsDetail 
    {
        public bool IsBuy { get; set; }
        public string CourseName { get; set; }
        public decimal PreferentialPrice { get; set; }
        public string Intro { get; set; }
        public Models.Expert.ExpertInfo Expert { get; set; }
        public List<Base> Detail { get; set; }
        public string BagImgUrl { get; set; }
    }
}