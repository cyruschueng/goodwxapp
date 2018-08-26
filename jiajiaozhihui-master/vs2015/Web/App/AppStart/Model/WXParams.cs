using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace SfSoft.web.AppStart.Model
{
    public class WXParams
    {
        public SfSoft.Model.WX_UserInfo UserInfo { get; set; }
        public Senparc.Weixin.MP.Helpers.JsSdkUiPackage JsSdk { get; set; }
        public string State { get; set; }
        public string Share { get; set; }
        public string PayConfig { get; set; }
    }
}