using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace SfSoft.web.App.Tool
{
    /// <summary>
    /// fzWxJsConfig 的摘要说明
    /// </summary>
    public class fzWxJsConfig : IHttpHandler
    {

        public void ProcessRequest(HttpContext context)
        {
            context.Response.ContentType = "text/plain";
            GetFZJsSdk(context);
        }
        private void GetFZJsSdk(HttpContext context)
        {
            var appId = "wxe73fe4691cb78622";
            var appSecret = "66ec84db5645a28114c15c5a124e8ab7";
            var url = context.Request["url"];
            var package = Senparc.Weixin.MP.Helpers.JSSDKHelper.GetJsSdkUiPackage(appId, appSecret, url);
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