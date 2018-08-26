using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace SfSoft.web.Gxdr.Controller
{
    /// <summary>
    /// 答题记录
    /// </summary>
    public class QuestionAnswerRecordProvide : IHttpHandler
    {

        public void ProcessRequest(HttpContext context)
        {
            context.Response.ContentType = "text/plain";
            var method = context.Request.QueryString["method"];
            switch (method)
            {
                case "addapp001":
                    AddAnswerRecord(context);
                    break;
            }
        }
        private void AddAnswerRecord(HttpContext context)
        {
            var openId = context.Request["openid"];
            var activeId= context.Request["activeid"];
            var appId = context.Request["appid"];
            var answer = context.Request["answer"];
            Helper.QuestionAnswerRecord.AddApp001Record(appId, openId, int.Parse( activeId), answer);
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