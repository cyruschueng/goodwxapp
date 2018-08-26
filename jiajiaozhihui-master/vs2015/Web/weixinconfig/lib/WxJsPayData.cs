using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace SfSoft.web.weixinconfig
{
    public class WxJsPayData
    {
        /// <summary>
        /// 购买数量 
        /// </summary>
        public int BuyNumber { get; set; }
        /// <summary>
        /// 单价
        /// </summary>
        public decimal Price { get; set; }
        /// <summary>
        /// 订单号
        /// </summary>
        public string Tradeno { get; set; }
        /// <summary>
        /// 商品说明
        /// </summary>
        public string Body { get; set; }
        /// <summary>
        /// 注解
        /// </summary>
        public string Attach { get; set; }
        /// <summary>
        /// 商品标签
        /// </summary>
        public string GoodsTag { get; set; }
        /// <summary>
        /// 用户
        /// </summary>
        public string OpenId { get; set; }
        /// <summary>
        /// 回调更新的表
        /// </summary>
        public string Table { get; set; }
    }
}