using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace Weixin.Service.Order.Entity
{
    public class OrderEntity
    {
        /// <summary>
        /// 订单ID
        /// </summary>
        public int OrderId { get; set; }
        /// <summary>
        /// 产品名称
        /// </summary>
        public string ProductName { get; set; }
        /// <summary>
        /// 手机号码
        /// </summary>
        public string TelePhone { get; set; }
        /// <summary>
        /// 地址
        /// </summary>
        public string Address { get; set; }
        /// <summary>
        /// 收件人
        /// </summary>
        public string Consignee { get; set; }
        /// <summary>
        /// 物流信息
        /// </summary>
        public string Logistics { get; set; }
        /// <summary>
        /// 订单日期
        /// </summary>
        public DateTime OrderDate { get; set; }
        /// <summary>
        /// 订单状态
        /// </summary>
        public string OrderStatus { get; set; }
    }
}