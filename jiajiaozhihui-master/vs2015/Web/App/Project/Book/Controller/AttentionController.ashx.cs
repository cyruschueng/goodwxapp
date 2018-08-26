using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace SfSoft.web.Book.Controller
{
    /// <summary>
    /// AttentionController 的摘要说明
    /// </summary>
    public class AttentionController : IHttpHandler
    {

        public void ProcessRequest(HttpContext context)
        {
            GetUserInfo(context);
        }
        private void GetUserInfo(HttpContext context)
        {
            var openid = context.Request["openid"];
            var user = Senparc.Weixin.MP.AdvancedAPIs.UserApi.Info(App.Helper.WxBaseConfig.AppID, openid);
            context.Response.Write(Newtonsoft.Json.JsonConvert.SerializeObject(user, new Newtonsoft.Json.JsonSerializerSettings() { ContractResolver = new App.Helper.UnderlineSplitContractResolver() }));

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