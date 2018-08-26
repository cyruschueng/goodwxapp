using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace SfSoft.web.QA.Models.Expert
{
    public class Detail
    {
        public string ExpertId { get; set; }
        public int ExpertType { get; set; }
        public string NickName { get; set; }
        public string UName { get; set; }
        public string Intro { get; set; }
        public string ImgUrl { get; set; }
        public string HeadImgUrl { get; set; }
        public int LikeNumber { get; set; }
        public string Sex { get; set; }
        public int IsMyExpert { get; set; }
        public UserInfo UserData { get; set; }
        public PageData Qus { get; set; }
        public string OpenId { get; set; }
    }
}