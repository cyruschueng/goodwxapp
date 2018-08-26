using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace SfSoft.web.QA.Controller
{
    /// <summary>
    /// myController 的摘要说明
    /// </summary>
    public class myController : IHttpHandler
    {

        public void ProcessRequest(HttpContext context)
        {
            context.Response.ContentType = "text/plain";
            string method = context.Request.QueryString["method"];
            switch (method)
            {
                case "init":
                    Init(context);
                    break;
            }
        }
        private void Init(HttpContext context)
        { 
            string openId = context.Request["openId"];
            string appId = context.Request["appId"];
            var expert = Helper.UserProvide.GetExpert(appId, openId);
            Models.My.InitInfo info = new Models.My.InitInfo();
            info.Expert = expert;
            info.NewQuestionNumber = Helper.UserProvide.GetNewQuestionNumber(openId, appId);
            context.Response.Write(Newtonsoft.Json.JsonConvert.SerializeObject(info, new Newtonsoft.Json.JsonSerializerSettings() { ContractResolver = new App.Helper.UnderlineSplitContractResolver() }));
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