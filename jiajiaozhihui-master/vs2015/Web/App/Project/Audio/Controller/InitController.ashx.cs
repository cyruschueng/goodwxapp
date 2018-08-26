using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace SfSoft.web.Audio.Controller
{
    /// <summary>
    /// InitController 的摘要说明
    /// </summary>
    public class InitController : IHttpHandler
    {

        public void ProcessRequest(HttpContext context)
        {
            var method = context.Request.QueryString["method"];
            switch (method)
            {
                case "get":
                    Get(context);
                    break;
            }
        }
        public void Get(HttpContext context)
        {
            string appId = context.Request["appId"];
            string openId = context.Request["openId"];

            Helper.InitProvide.RegistUser(appId, openId);

            Models.Init.InitInfo model = new Models.Init.InitInfo();
            model.WxUserInfo = Helper.InitProvide.GetWxUserInfo(openId);
            model.UserInfo = Helper.InitProvide.GetReadUserInfo(appId, openId);
            model.IsAttention = Helper.InitProvide.IsAttention(openId);
            model.IsWarrantyRegistration = new SfSoft.web.WarrantyCard.Helper.MemberProvide().GetWarrantyCardList(openId).Count > 0 ? true : false;
            context.Response.Write(Newtonsoft.Json.JsonConvert.SerializeObject(model,
                new Newtonsoft.Json.JsonSerializerSettings() { ContractResolver = new App.Helper.UnderlineSplitContractResolver() }));
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