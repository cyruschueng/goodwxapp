using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using SfSoft.web.wxpay.jsapi;
using ShenerWeiXin.WxApi.WxJs;

namespace SfSoft.web.wxpay.server
{
    /// <summary>
    /// pay 的摘要说明
    /// </summary>
    public class pay : IHttpHandler, System.Web.SessionState.IRequiresSessionState
    {

        public void ProcessRequest(HttpContext context)
        {
            context.Response.ContentType = "text/plain";
            string type = context.Request.QueryString["type"];
            string result = "";
            if (type == "sdk") {
                result = GetJsSdkConfig(context);
            }else if (type=="pay"){
                result = GetJsPayConfig(context);
            }
            context.Response.Write(result);
        }

        private string GetJsSdkConfig(HttpContext context)
        {
            WxJsSdkData data = context.Session["WXJSDKDATA"] as WxJsSdkData;
            ShenerWeiXin.WxApi.WxJs.WeixXinJsAPI2 jsapi = new ShenerWeiXin.WxApi.WxJs.WeixXinJsAPI2();
            WXJsSdkConfig config= jsapi.GetWxJsSdkConfig(data.Uri);
            return Newtonsoft.Json.JsonConvert.SerializeObject(config);
        }
        private string GetJsPayConfig(HttpContext context)
        {
            WxJsPayData data = context.Session["WXJSPAYDATA"] as WxJsPayData;
            ShenerWeiXin.WxApi.WxPay.WeiXinJSPayAPI pay = new ShenerWeiXin.WxApi.WxPay.WeiXinJSPayAPI(null);
            pay.openid = data.OpenId;
            
            pay.total_fee = Convert.ToInt32(data.Price);
            string body = data.Body;
            pay.GetUnifiedOrderResult(body,data.Attach, data.Tradeno, data.GoodsTag);
            return pay.GetJsApiParameters();
        }
        public bool IsReusable
        {
            get
            {
                return false;
            }
        }
    }
}