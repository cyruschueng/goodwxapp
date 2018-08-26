using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace SfSoft.web.Audio.Controller
{
    /// <summary>
    /// HomeController 的摘要说明
    /// </summary>
    public class HomeController : IHttpHandler
    {

        public void ProcessRequest(HttpContext context)
        {
            var method = context.Request.QueryString["method"];
            switch (method)
            {
                case "get":
                    GetTodayPlan(context);
                    break;
            }
        }

        private void GetTodayPlan(HttpContext context)
        {
            string appId = context.Request["appId"];
            string openId=context.Request["openId"];
            Helper.HomeProvide provide = new Helper.HomeProvide(appId, openId);
            var model = provide.GetHomeInfo(openId);

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