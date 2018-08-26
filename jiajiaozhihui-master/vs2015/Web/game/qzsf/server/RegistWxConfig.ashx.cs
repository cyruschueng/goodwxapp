using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using Senparc.Weixin.MP.Helpers;

namespace SfSoft.web.game.qzsf.server
{
    /// <summary>
    /// RegistWxConfig 的摘要说明
    /// </summary>
    public class RegistWxConfig : IHttpHandler
    {

        public void ProcessRequest(HttpContext context)
        {
            context.Response.ContentType = "text/plain";
            string result = GetConfig(context);
            context.Response.Write(result);
        }
        private string GetConfig(HttpContext context)
        {
            string url = context.Request["url"];
            var result = WeiXinServer.JsSdkServer.GetJsSdkUiPackage(url, App.Helper.WxBaseConfig.AppID, App.Helper.WxBaseConfig.AppSecret);
            return Newtonsoft.Json.JsonConvert.SerializeObject(result);
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