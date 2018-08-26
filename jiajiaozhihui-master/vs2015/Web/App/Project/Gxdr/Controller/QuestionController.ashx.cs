using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace SfSoft.web.Gxdr.Controller
{
    /// <summary>
    /// QuestionController 的摘要说明
    /// </summary>
    public class QuestionController : IHttpHandler
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
            var type=context.Request["type"];
            if (string.IsNullOrEmpty(type))
            {
                var list = Helper.QuestionProvide.GetQuestion(int.Parse(activeId), openId, Enum.GxdrComputeEnum.None);
                context.Response.Write(Newtonsoft.Json.JsonConvert.SerializeObject(list));
            }
            else {
                var list = Helper.QuestionProvide.GetQuestion(int.Parse(activeId), openId, Enum.GxdrComputeEnum.Restart);
                context.Response.Write(Newtonsoft.Json.JsonConvert.SerializeObject(list));
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