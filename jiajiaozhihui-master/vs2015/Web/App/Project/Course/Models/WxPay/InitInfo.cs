using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace SfSoft.web.Course.Models.WxPay
{
    public class InitInfo
    {
        public CourseInfo CourseInfo { get; set; }
        public IEnumerable<Models.Order.OrderInfo> UnCompletedOrderInfo { get; set; }
        public Models.Order.OrderInfo CompletedOrderInfo { get; set; }
    }
}