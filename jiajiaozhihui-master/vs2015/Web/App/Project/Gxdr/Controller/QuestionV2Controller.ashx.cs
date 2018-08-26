using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace SfSoft.web.Gxdr.Controller
{
    /// <summary>
    /// QuestionV2Controller 的摘要说明
    /// </summary>
    public class QuestionV2Controller : IHttpHandler
    {

        public void ProcessRequest(HttpContext context)
        {
            context.Response.ContentType = "text/plain";
            var method = context.Request.QueryString["method"];
            switch (method)
            {
                case "get":
                    GetQuestion(context);
                    break;
            }
        }
        private void GetQuestion(HttpContext context)
        {
            var activeId = context.Request["activeid"];
            var openId = context.Request["openid"];
            var type = context.Request["type"];
            if (string.IsNullOrEmpty(type))
            {
                var list = Helper.QuestionV2Provide.GetQuestion(int.Parse(activeId), openId, Enum.GxdrComputeEnum.None);
                context.Response.Write(Newtonsoft.Json.JsonConvert.SerializeObject(list, new Newtonsoft.Json.JsonSerializerSettings() { ContractResolver = new App.Helper.UnderlineSplitContractResolver() }));
            }
            else
            {
                var list = Helper.QuestionV2Provide.GetQuestion(int.Parse(activeId), openId, Enum.GxdrComputeEnum.Restart);
                context.Response.Write(Newtonsoft.Json.JsonConvert.SerializeObject(list, new Newtonsoft.Json.JsonSerializerSettings() { ContractResolver = new App.Helper.UnderlineSplitContractResolver() }));
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