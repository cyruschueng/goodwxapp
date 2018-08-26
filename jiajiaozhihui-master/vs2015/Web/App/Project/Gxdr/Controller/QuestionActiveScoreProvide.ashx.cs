using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace SfSoft.web.Gxdr.Controller
{
    /// <summary>
    /// QuestionActiveScoreProvide 的摘要说明
    /// </summary>
    public class QuestionActiveScoreProvide : IHttpHandler
    {

        public void ProcessRequest(HttpContext context)
        {
            context.Response.ContentType = "text/plain";
            var method = context.Request.QueryString["method"];
            switch (method)
            {
                case "addapp001":
                    AddAnswerScore(context);
                    break;
                case "rankschool":
                    GetSchoolRank(context);
                    break;
                case "rankclass":
                    GetClassRank(context);
                    break;
            }
        }
        private void AddAnswerScore(HttpContext context)
        {
            var openId = context.Request["openid"];
            var activeId = context.Request["activeid"];
            var appId = context.Request["appid"];
            var score = context.Request["score"];
            var catalogue = context.Request["catalogue"];
            var totalTime= context.Request["totaltime"];
            if (Helper.QuestionScoreProvide.ExistTestQuestionActiveScore(appId, openId, activeId,catalogue) == false)
            {
                Helper.QuestionScoreProvide.AddApp001QuesstionScore(appId, openId, activeId, catalogue, totalTime, score);
                context.Response.Write(Newtonsoft.Json.JsonConvert.SerializeObject(new { score=score }, 
                    new Newtonsoft.Json.JsonSerializerSettings() { ContractResolver = new App.Helper.UnderlineSplitContractResolver() }));
            }
            else {
                context.Response.Write(Newtonsoft.Json.JsonConvert.SerializeObject(new { score=0}, 
                    new Newtonsoft.Json.JsonSerializerSettings() { ContractResolver = new App.Helper.UnderlineSplitContractResolver() }));
            }
        }
        /// <summary>
        /// 全校排名
        /// </summary>
        /// <param name="context"></param>
        private void GetSchoolRank(HttpContext context)
        {
            var activeId = context.Request["activeid"];
            var appId = context.Request["appId"];
            var top = context.Request["top"];
            var where = "QuestionActiveId="+activeId + " order by score desc, UsingTime asc";
            var result= Helper.QuestionScoreProvide.GetRank(where,appId, string.IsNullOrEmpty(top)?20:int.Parse(top));
            context.Response.Write(Newtonsoft.Json.JsonConvert.SerializeObject(result,
                    new Newtonsoft.Json.JsonSerializerSettings() { ContractResolver = new App.Helper.UnderlineSplitContractResolver() }));
        }
        /// <summary>
        /// 全班排名
        /// </summary>
        /// <param name="context"></param>
        private void GetClassRank(HttpContext context)
        {
            var activeId = context.Request["activeid"];
            var appId = context.Request["appId"];
            var top = context.Request["top"];
            var classId=context.Request["class"];

            var where = "QuestionActiveId=" + activeId + " and Catalogue="+ classId + " order by score desc, UsingTime asc";

            var result = Helper.QuestionScoreProvide.GetRank(where, appId, string.IsNullOrEmpty(top) ? 20 : int.Parse(top));

            context.Response.Write(Newtonsoft.Json.JsonConvert.SerializeObject(result,
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