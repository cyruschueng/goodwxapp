using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace SfSoft.web.Parents.Controller
{
    /// <summary>
    /// InitParents 的摘要说明
    /// </summary>
    public class InitParentsController : IHttpHandler
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

            Helper.InitParentsProvide.RegistUser(appId, openId);

            Models.Init.Init model = new Models.Init.Init();

            model.WxUserInfo = Helper.InitParentsProvide.GetWxUserInfo(openId);
            model.ParentsUserInfo = Helper.InitParentsProvide.GetParentsUserInfo(appId, openId);
            model.IsAttention = Helper.InitParentsProvide.IsAttention(openId);
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