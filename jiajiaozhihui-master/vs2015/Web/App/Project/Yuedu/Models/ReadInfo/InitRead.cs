using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace SfSoft.web.Yuedu.Models.ReadInfo
{
    public class InitRead
    {
        public SfSoft.Model.WX_Yuedu_Info ReadInfo { get; set; }
        public SfSoft.Model.WX_Yuedu_User ReadUserInfo { get; set; }
        public SfSoft.Model.WX_UserInfo WxUserInfo { get; set; }
        public Models.Award.AwardInfo Award { get; set; }
        public bool IsAttention { get; set; }
    }
}