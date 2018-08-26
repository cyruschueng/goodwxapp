using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace SfSoft.web.Course.Models.Course
{
    public class CourseIntro
    {
        public int CourseId { get; set; }
        public string Title { get; set; }
        public DateTime? CreateDate { get; set; }
        public string Desc { get; set; }
        public string ImgUrl { get; set; }
        public int ViewNumber { get; set; }
        public Models.Expert.ExpertInfo Expert { get; set; }
        public bool IsBuy { get; set; }
        public bool IsFree { get; set; }
        public decimal? Price { get; set; }
        /// <summary>
        /// /*2:课程包 ; 1:单课程*/
        /// </summary>
        public int CourseType { get; set; }
        public string Intro { get; set; }
    }
}