using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace SfSoft.web.ZXS.Models.WxPay
{
    public class WxPayInfo
    {
        public string Body { get; set; }
        public string OutTradeNo { get; set; }
        public string Openid { get; set; }
        public string AppId { get; set; }
        public string NotifyPage { get; set; }
    }
}