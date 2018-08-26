using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace SfSoft.web.Parents.Controller
{
    /// <summary>
    /// QuestionBankController 的摘要说明
    /// </summary>
    public class QuestionBankController : IHttpHandler
    {

        public void ProcessRequest(HttpContext context)
        {
            var method = context.Request.QueryString["method"];
            switch (method)
            {
                case "get":
                    GetList(context);
                    break;
            }
        }
        private void GetList(HttpContext context)
        {
            string parentId = context.Request["parentId"];
            string openId = context.Request["openId"];
            var list = Helper.QuestionBankProvide.GetQuestionBank(int.Parse(parentId), openId);
            context.Response.Write(Newtonsoft.Json.JsonConvert.SerializeObject(list,
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