using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace SfSoft.web.Course.Models.Expert
{
    public class ExpertInfo
    {
        public int ExpertId { get; set; }
        public string Name { get; set; }
        public string NickName { get; set; }
        public string ImgUrl { get; set; }
        public string HeadImgUrl { get; set; }
        public string Intro { get; set; }
    }
}