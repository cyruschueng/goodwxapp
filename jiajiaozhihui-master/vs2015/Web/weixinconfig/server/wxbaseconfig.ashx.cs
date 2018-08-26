using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using ShenerWeiXin.WxApi.WxJs;

namespace SfSoft.web.weixinconfig.server
{
    /// <summary>
    /// wxbaseconfig 的摘要说明
    /// </summary>
    public class wxbaseconfig : IHttpHandler
    {

        public void ProcessRequest(HttpContext context)
        {
            context.Response.ContentType = "text/plain";
            string result = GetJsSdkConfig(context);
            context.Response.Write(result);
        }
        private string GetJsSdkConfig(HttpContext context)
        {
            var url = context.Request.QueryString["url"];
            Uri uri = new Uri(url);
            
            ShenerWeiXin.WXHelper.WriteNode(url, "url.txt");
            ShenerWeiXin.WxApi.WxJs.WeixXinJsAPI2 jsapi = new ShenerWeiXin.WxApi.WxJs.WeixXinJsAPI2();
            WXJsSdkConfig config = jsapi.GetWxJsSdkConfig(url);
            return Newtonsoft.Json.JsonConvert.SerializeObject(config);
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