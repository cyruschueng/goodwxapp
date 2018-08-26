using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace SfSoft.web.ZXS.Models.ZxsInfo
{
    public class InitZxs
    {
        public SfSoft.Model.WX_ZXS_Info ZxsInfo { get; set; }
        public SfSoft.Model.WX_ZXS_Players ZxsPlayer { get; set; }
        public SfSoft.Model.WX_UserInfo WxUserInfo { get; set; }
        public bool IsAttention { get; set; }
    }
}