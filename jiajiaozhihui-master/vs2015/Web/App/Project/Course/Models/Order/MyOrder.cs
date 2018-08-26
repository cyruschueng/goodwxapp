using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace SfSoft.web.Course.Models.Order
{
    public class MyOrder
    {
        /// <summary>
        /// 完成订单
        /// </summary>
        public IEnumerable<OrderInfo> CompletedOrders { get; set; }
        /// <summary>
        /// 未完成的订单
        /// </summary>
        public IEnumerable<OrderInfo> UnCompletedOrders { get; set; }
    }
}