using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace SfSoft.web.Course.Controller
{
    /// <summary>
    /// RankingController 的摘要说明
    /// </summary>
    public class RankingController : IHttpHandler
    {

        public void ProcessRequest(HttpContext context)
        {
            var method = context.Request.QueryString["method"];
            switch (method)
            {
                case "gxdrranking":
                    GxdrRanking(context);
                    break;
            }
        }

        private void GxdrRanking(HttpContext context)
        {
            string courseId = context.Request["courseid"];
            string openId = context.Request["openid"];
            string top = context.Request["top"];

            Helper.RankingProvinde helper = new Helper.RankingProvinde(int.Parse(courseId));
            var data = helper.GxdrRanking(openId, top);
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