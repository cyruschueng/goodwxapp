using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace SfSoft.web.App.Pay
{
    public class Attach
    {
        /// <summary>
        /// 其它一些参数
        /// 多个参数用逗号隔开
        /// 
        /// </summary>
        public string Other { get; set; }
        /// <summary>
        /// 产品ID
        /// </summary>
        public string ProductId { get; set; }
        /// <summary>
        /// 订单类型
        /// </summary>
        public string OrderType { get; set; }
    }
}