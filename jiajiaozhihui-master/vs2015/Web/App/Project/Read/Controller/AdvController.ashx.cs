using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace SfSoft.web.Read.Controller
{
    /// <summary>
    /// AdvController 的摘要说明
    /// </summary>
    public class AdvController : IHttpHandler
    {

        public void ProcessRequest(HttpContext context)
        {
            context.Response.ContentType = "text/plain";
            var method = context.Request.QueryString["method"];
            var result = "";
            switch (method)
            {
                case "adv":
                    Get(context);
                    break;
                case "info":
                    GetInfo(context);
                    break;
            }
        }
        private void Get(HttpContext context)
        {
            context.Response.Write(Newtonsoft.Json.JsonConvert.SerializeObject(Helper.AdvProvide.GetAdv(), new Newtonsoft.Json.JsonSerializerSettings() { ContractResolver = new App.Helper.UnderlineSplitContractResolver() }));
        }
        private void GetInfo(HttpContext context)
        {
            int id = int.Parse(context.Request["id"]);
            var result = Helper.AdvProvide.GetAdvById(id);
            context.Response.Write(Newtonsoft.Json.JsonConvert.SerializeObject(result, new Newtonsoft.Json.JsonSerializerSettings() { ContractResolver = new App.Helper.UnderlineSplitContractResolver() }));
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