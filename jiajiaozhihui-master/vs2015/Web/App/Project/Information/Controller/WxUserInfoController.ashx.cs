using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace SfSoft.web.Information.Controller
{
    /// <summary>
    /// WxUserInfoController 的摘要说明
    /// </summary>
    public class WxUserInfoController : IHttpHandler
    {

        public void ProcessRequest(HttpContext context)
        {
            context.Response.ContentType = "text/plain";
            var method = context.Request.QueryString["method"];
            var result = "";
            switch (method)
            {
                case "info":
                    GetInfo(context);
                    break;
            }
        }
        private void GetInfo(HttpContext context)
        {
            string openId = context.Request["openId"];
            Senparc.Weixin.MP.AdvancedAPIs.User.UserInfoJson userInfo = Senparc.Weixin.MP.AdvancedAPIs.UserApi.Info(App.Helper.WxBaseConfig.AppID, openId);
            context.Response.Write(Newtonsoft.Json.JsonConvert.SerializeObject(userInfo, new Newtonsoft.Json.JsonSerializerSettings() { ContractResolver = new App.Helper.UnderlineSplitContractResolver() }));
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