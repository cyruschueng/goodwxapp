using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace SfSoft.web.Course.Models.Course
{
    public class Base
    {
        public int Id { get; set; }
        public string Title { get; set; }
        public string Lecturer { get; set; }
        public string IsFree { get; set; }
        public int? LearnNumber { get; set; }
        public decimal OriginalPrice { get; set; }
        public decimal PreferentialPrice { get; set; }
        public string ImgUrl { get; set; }
        public int Theme { get; set; }
        public string ThemeName { get; set; }
        public int IsOline { get; set; }
        public int MediaType { get; set; }
        public DateTime? StartDate { get; set; }
        public DateTime? EndDate { get; set; }
        public bool IsBuy { get; set; }
        public int? Section { get; set; }
        public string MiniImgUrl { get; set; }
        public Model.WX_JJZH_Expert Expert { get; set; }
        public int? BuyNumber { get; set; }
        public int? CourseType { get; set; }
    }
}