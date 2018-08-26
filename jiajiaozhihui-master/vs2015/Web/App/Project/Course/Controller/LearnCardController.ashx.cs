using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace SfSoft.web.Course.Controller
{
    /// <summary>
    /// LearnCardController 的摘要说明
    /// </summary>
    public class LearnCardController : IHttpHandler
    {

        public void ProcessRequest(HttpContext context)
        {
            context.Response.ContentType = "text/plain";
            var method = context.Request.QueryString["method"];
            switch (method)
            {
                case "info":
                    LearnCardInfo(context);
                    break;
            }
        }

        private void LearnCardInfo(HttpContext context)
        {
            var bagId = context.Request["bagId"];
            var model = Helper.LearnCardProvide.GetCardCoast(int.Parse(bagId));
            context.Response.Write(Newtonsoft.Json.JsonConvert.SerializeObject(model, new Newtonsoft.Json.JsonSerializerSettings() { ContractResolver = new App.Helper.UnderlineSplitContractResolver() }));
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