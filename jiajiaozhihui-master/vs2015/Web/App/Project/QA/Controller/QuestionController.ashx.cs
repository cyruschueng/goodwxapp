using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.IO;

namespace SfSoft.web.QA.Controller
{
    /// <summary>
    /// QuestionController 的摘要说明
    /// </summary>
    public class QuestionController : IHttpHandler
    {

        public void ProcessRequest(HttpContext context)
        {
            var method = context.Request.QueryString["method"];
            var result = "";
            switch (method)
            {
                case "add":
                    AddFile(context);
                    break;
            }
        }
        private void AddFile(HttpContext context)
        { 
            StreamReader reader = new StreamReader(context.Request.InputStream);
            String strJson = HttpUtility.UrlDecode(reader.ReadToEnd());
            Models.Question.QuestionInfo model = Newtonsoft.Json.JsonConvert.DeserializeObject<Models.Question.QuestionInfo>(strJson);

            int row= Helper.QuestionProvide.AddFile(model);
            context.Response.Write(row.ToString());
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