using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace SfSoft.web.QA.Models.Home
{
    public class Comment
    {
        public int Id { get; set; }
        public string NickName { get; set; }
        public string UName { get; set; }
        public string HeadImgUrl { get; set; }
        public string ImgUrl { get; set; }
        public string Details { get; set; }
        public string Sex { get; set; }
        public int ExpertType { get; set; }
        public int ExpertId { get; set; }
        public string ReleaseData { get; set; }
        public string OpenId { get; set; }
    }
}