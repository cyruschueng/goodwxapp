using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace SfSoft.web.QA.Models.Personal
{
    public class Personal
    {
        public SfSoft.Model.WX_UserInfo WxUserInfo { get; set; }
        public SfSoft.Model.WX_QA_User ReadUser { get; set; }
        public Models.Personal.ExpertInfo Expert { get; set; }
    }
}