using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace SfSoft.web.emc.QA.q
{
    public class Quizzer
    {
        public string OpenId { get; set; }
        public string NickName { get; set; }
        public string HeadImgUrl { get; set; }
        public string Province { get; set; }
        public string City { get; set; }
        public bool Default { get; set; }
    }
}