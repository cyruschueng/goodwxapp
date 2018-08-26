using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace SfSoft.web.Course.Models.WxPay
{
    public class WxPayInfo
    {
        public string Body { get; set; }
        public string OutTradeNo { get; set; }
        public string Openid { get; set; }
        public string Attach { get; set; }
        public string NotifyPage { get; set; }
    }
}