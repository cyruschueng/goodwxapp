using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace SfSoft.web.wxpay.jsapi
{
    public delegate void CallBackPayDelegate(string result);
    public class ThreedPay
    {
        private CallBackPayDelegate callback;
        private string openid = string.Empty;
        private int number = 1;
        private decimal price = 0M;
        private string tradeno = string.Empty;
        /// <summary>
        /// 
        /// </summary>
        /// <param name="openid">用户openid</param>
        /// <param name="number">订购数量</param>
        /// <param name="price">订购单价</param>
        /// <param name="tradeno">订购单号</param>
        /// <param name="callbackDelegate">回调</param>
        public ThreedPay(string openid, int number, decimal price, string tradeno, CallBackPayDelegate callbackDelegate) 
        {
            this.callback = callbackDelegate;
            this.openid = openid;
            this.number = number;
            this.price = price;
        }
        public void InitPay()
        {
            ShenerWeiXin.WxApi.WxPay.WeiXinJSPayAPI pay = new ShenerWeiXin.WxApi.WxPay.WeiXinJSPayAPI(null);
            pay.openid = openid;
            pay.total_fee = Convert.ToInt32(number * price * 100);
            string body = "亲子书法教材";
            ShenerWeiXin.WxApi.WxPay.PayData data = pay.GetUnifiedOrderResult(body, "在线支付", tradeno, "goodsTag");
            if (callback != null) {
                callback(pay.GetJsApiParameters());
            }
        }
    }
}