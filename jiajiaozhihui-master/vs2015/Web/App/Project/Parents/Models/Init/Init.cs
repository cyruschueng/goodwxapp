using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace SfSoft.web.Parents.Models.Init
{
    public class Init
    {
        public SfSoft.Model.WX_Parents_User ParentsUserInfo { get; set; }
        public SfSoft.Model.WX_UserInfo WxUserInfo { get; set; }
        public bool IsAttention { get; set; }
    }
}