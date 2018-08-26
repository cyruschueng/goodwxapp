using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace SfSoft.web.Read.Controller
{
    /// <summary>
    /// InitReadController 的摘要说明
    /// </summary>
    public class InitReadController : IHttpHandler
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

            Helper.InitReadProvide.RegistUser(appId, openId);

            Models.ReadInfo.InitRead model = new Models.ReadInfo.InitRead();
            model.WxUserInfo = Helper.InitReadProvide.GetWxUserInfo(openId);
            model.ReadInfo = Helper.InitReadProvide.GetReadInfo(appId);
            model.ReadUserInfo = Helper.InitReadProvide.GetReadUserInfo(appId, openId);
            model.Award = Helper.InitReadProvide.GetAwardList(openId);
            model.IsAttention = Helper.InitReadProvide.IsAttention(openId);
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