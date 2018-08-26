using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.UI;

namespace SfSoft.web.wxpay.jsapi
{
    public delegate void CallBackAddressDelegate(string result);
    public class ThreedAddress
    {
        private CallBackAddressDelegate callback = null;
        private string accessToken = string.Empty;
        private Page page = null;
        /// <summary>
        /// 
        /// </summary>
        /// <param name="page"></param>
        /// <param name="accessToken">微信授权时的AccessToken</param>
        /// <param name="callbackAddressDelegate">回调</param>
        public ThreedAddress(Page page, string accessToken, CallBackAddressDelegate callbackAddressDelegate)
        {
            this.page = page;
            this.callback = callbackAddressDelegate;
            this.accessToken = accessToken;
        }
        public void InitAddress()
        {
            ShenerWeiXin.WxApi.WxPay.WeiXinJSPayAPI payApi = new ShenerWeiXin.WxApi.WxPay.WeiXinJSPayAPI(this.page);
            payApi.access_token = accessToken;
            if (callback != null) {
                callback(payApi.GetEditAddressParameters());
            }
        }
    }
}