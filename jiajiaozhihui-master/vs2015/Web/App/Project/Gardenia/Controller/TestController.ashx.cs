using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace SfSoft.web.Gardenia.Controller
{
    /// <summary>
    /// TestController 的摘要说明
    /// </summary>
    public class TestController : IHttpHandler
    {

        public void ProcessRequest(HttpContext context)
        {
            context.Response.ContentType = "text/plain";
            get(context);
        }

        private void get(HttpContext context)
        {
            var score =Convert.ToDecimal( context.Request["score"]);
            var timer = Convert.ToDecimal( context.Request["timer"]);
            var openId = context.Request["openid"];

            Helper.TestProvide provide = new Helper.TestProvide();
            provide.DoTest(openId, score, timer);
            var list= provide.GetList();

            var data = new
            {
                my = list.Find(e => e.openid == openId),
                top = list.OrderBy(e => e.index).Take(20).ToList()
            };
            context.Response.Write(Newtonsoft.Json.JsonConvert.SerializeObject(data, new Newtonsoft.Json.JsonSerializerSettings() { ContractResolver = new App.Helper.UnderlineSplitContractResolver() }));
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