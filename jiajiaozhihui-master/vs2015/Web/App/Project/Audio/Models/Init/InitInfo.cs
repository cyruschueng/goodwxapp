using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace SfSoft.web.Audio.Models.Init
{
    public class InitInfo
    {
        public SfSoft.Model.WX_Audio_User UserInfo { get; set; }
        public SfSoft.Model.WX_UserInfo WxUserInfo { get; set; }
        public bool IsAttention { get; set; }
        public bool IsWarrantyRegistration { get; set; }
    }
}