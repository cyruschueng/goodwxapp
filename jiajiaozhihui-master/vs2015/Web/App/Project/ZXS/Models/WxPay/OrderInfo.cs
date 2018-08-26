using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace SfSoft.web.ZXS.Models.WxPay
{
    public class OrderInfo
    {
        public string Detail { get; set; }
        public string Province { get; set; }
        public string City { get; set; }
        public string District { get; set; }
        public string Name { get; set; }
        public string OpenId { get; set; }
        public string TelePhone { get; set; }
        public string Tradeno { get; set; }
    }
}