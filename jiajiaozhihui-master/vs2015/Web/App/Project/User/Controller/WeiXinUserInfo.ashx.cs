using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace SfSoft.web.User.Controller
{
    /// <summary>
    /// 获取关注者用户信息
    /// </summary>
    public class WeiXinUserInfo : IHttpHandler
    {

        public void ProcessRequest(HttpContext context)
        {
            context.Response.ContentType = "text/plain";
            GetWeiXinUserInfo(context);
        }
        private void GetWeiXinUserInfo(HttpContext context)
        {
            string openId = context.Request["openId"];
            if (!string.IsNullOrEmpty(openId)) {
                var info = Helper.WeiXinUserInfoProvide.GetUserInfo(openId);
                context.Response.Write(Newtonsoft.Json.JsonConvert.SerializeObject(info, new Newtonsoft.Json.JsonSerializerSettings() { ContractResolver = new App.Helper.UnderlineSplitContractResolver() }));
            }
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