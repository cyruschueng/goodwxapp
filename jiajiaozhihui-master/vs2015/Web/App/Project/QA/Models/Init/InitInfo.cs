using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace SfSoft.web.QA.Models.Init
{
    public class InitInfo
    {
        public SfSoft.Model.WX_QA_Info BaseInfo { get; set; }
        public SfSoft.Model.WX_QA_User UserInfo { get; set; }
        public SfSoft.Model.WX_UserInfo WxUserInfo { get; set; }
        public Models.Award.AwardInfo Award { get; set; }
        /// <summary>
        /// 专家类型
        /// </summary>
        public int ExpertType { get; set; }
        public bool IsAttention { get; set; }
        public int ExpertNumber { get; set; }
        public Models.Expert.ExpertInfo Expert { get; set; }
        public int MemberShipNumber { get; set; }
    }
}