using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace SfSoft.web.QA.Models.Expert
{
    public class ExpertInfo
    {
        public int Id { get; set; }
        public string  OpenId{get;set;}
        public string  NickName{get;set;}
        public string  HeadImgUrl{get;set;}
        public string  ImgUrl{get;set;}
        public string  Uname{get;set;}
        public string  Intro{get;set;}
        public string  TelePhone{get;set;}
        public string Sex { get; set; }
        public int? ExpertType { get; set; }
        public int? ExpertId { get; set; }
    }
}