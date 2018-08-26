using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;

namespace ShenerWeiXin.WxApi.WxPay
{
    /// <summary>
    /// 微信支付成功后返回结果
    /// </summary>
    public  class PayResult
    {
        /// <summary>
        /// 成功返回值为:ok 否则error
        /// </summary>
        public string Code { get; set; }
        /// <summary>
        /// 返回的结果集
        /// </summary>
        public PayData DataInfo { get; set; }
    }
}
