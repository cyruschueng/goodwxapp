using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace SfSoft.web.QA.Models.Expert
{
    public class Answers
    {
        public int Id { get; set; }
        public string Answer { get; set; }
        public DateTime? AnswerDate { get; set; }
        public string NickName { get; set; }
        public string UName { get; set; }
        public string HeadImgUrl { get; set; }
        public string ImgUrl { get; set; }
        public string Sex { get; set; }
        public int? ExpertType { get; set; }
        public string ExpertId { get; set; }
    }
}