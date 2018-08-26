using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Web.UI;
using Senparc.Weixin.MP.Helpers;
using System.Collections;

namespace ShenerWeiXin.WxApi.WxJs
{
    public class WeixXinJsAPI2
    {
        public WeixXinJsAPI2()
        {
            
        }
        /// <summary>
        /// 获取微信jssdk信息
        /// </summary>
        public WXJsSdkConfig GetWxJsSdkConfig(string absoluteUri)
        {
            string appId = WxJsConfig.APPID;
            string nonceStr = JSSDKHelper.GetNoncestr();
            string timesTamp = JSSDKHelper.GetTimestamp();
            string ticket =Senparc.Weixin.MP.Containers.JsApiTicketContainer.TryGetJsApiTicket(WxJsConfig.APPID, WxJsConfig.APPSECRET);
            string signature = Senparc.Weixin.MP.Helpers.JSSDKHelper.GetSignature(ticket, nonceStr, timesTamp, absoluteUri);
            WXJsSdkConfig wxConfig = new WXJsSdkConfig();
            wxConfig.appId = appId;
            wxConfig.timestamp = timesTamp;
            wxConfig.nonceStr = nonceStr;
            wxConfig.signature = signature;
            return wxConfig;
        }
    }
    [Serializable]
    public class WXJsSdkConfig
    {
        public string appId { get; set; }
        public string timestamp { get; set; }
        public string nonceStr { get; set; }
        public string signature { get; set; }
    }
}
