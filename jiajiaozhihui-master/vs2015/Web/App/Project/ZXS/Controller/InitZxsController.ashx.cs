using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using SfSoft.web.App.Helper;

namespace SfSoft.web.ZXS.Controller
{
    /// <summary>
    /// InitZxsController 的摘要说明
    /// </summary>
    public class InitZxsController : IHttpHandler
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
            
            Models.ZxsInfo.InitZxs model = new Models.ZxsInfo.InitZxs();
            model.WxUserInfo = Helper.InitZxsProvide.GetUserInfo(openId);
            model.ZxsInfo = Helper.InitZxsProvide.GetZxsInfo(appId);
            model.ZxsPlayer = Helper.InitZxsProvide.GetZxsPlayer(appId, openId);
            model.IsAttention = Helper.InitZxsProvide.IsAttention(openId);
            context.Response.Write(Newtonsoft.Json.JsonConvert.SerializeObject(model, new Newtonsoft.Json.JsonSerializerSettings() { ContractResolver = new UnderlineSplitContractResolver() }));
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