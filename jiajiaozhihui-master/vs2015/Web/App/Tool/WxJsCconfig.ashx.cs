using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace SfSoft.web.App.Tool
{
    /// <summary>
    /// WxJsCconfig 的摘要说明
    /// </summary>
    public class WxJsCconfig : IHttpHandler
    {

        public void ProcessRequest(HttpContext context)
        {
            context.Response.ContentType = "text/plain";
            context.Response.AddHeader("Access-Control-Allow-Origin", "*");
            getConfig(context);

        }
        private void getConfig(HttpContext context)
        {
            var appId = App.Helper.WxBaseConfig.AppID;
            var appSecret = App.Helper.WxBaseConfig.AppSecret;
            var url = context.Request["url"];
            var package= Senparc.Weixin.MP.Helpers.JSSDKHelper.GetJsSdkUiPackage(appId, appSecret, url);
            context.Response.Write(Newtonsoft.Json.JsonConvert.SerializeObject(package, new Newtonsoft.Json.JsonSerializerSettings() { ContractResolver = new App.Helper.UnderlineSplitContractResolver() }));
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