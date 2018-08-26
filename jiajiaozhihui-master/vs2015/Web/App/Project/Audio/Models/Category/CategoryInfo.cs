using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace SfSoft.web.Audio.Models.Category
{
    public class CategoryInfo
    {
        public int CategoryId { get; set; }
        public string FullName { get; set; }
        public string ShortName { get; set; }
        public string MiniImgUrl { get; set; }
        public string MaxImgUrl { get; set; }
        public int Pid { get; set; }
        public int IsAct { get; set; }
    }
}