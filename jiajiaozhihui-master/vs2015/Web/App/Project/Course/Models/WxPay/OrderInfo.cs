using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace SfSoft.web.Course.Models.WxPay
{
    public class OrderInfo
    {
        public int CourseId { get; set; }
        public int OrderType { get; set; }
        public string Name { get; set; }
        public string OpenId { get; set; }
        public string TelePhone { get; set; }
        public string Tradeno { get; set; }
        public int Price { get; set; }
        public string Remark { get; set; }
    }
}