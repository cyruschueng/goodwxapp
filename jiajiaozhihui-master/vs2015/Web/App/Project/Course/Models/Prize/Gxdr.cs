using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace SfSoft.web.Course.Models.Prize
{
    public class Gxdr
    {
        public int LowLimit{get;set;}
        public int UpperLimit { get; set; }
        public int Ranking { get; set; }
        public int GoodsId { get; set; }
        public string GoodsName { get; set; }
        public string GoodsImg { get; set; }
        public int CourseId { get; set; }
    }
}