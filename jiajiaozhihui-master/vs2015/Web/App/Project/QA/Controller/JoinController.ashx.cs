using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.IO;

namespace SfSoft.web.QA.Controller
{
    /// <summary>
    /// JoinController 的摘要说明
    /// </summary>
    public class JoinController : IHttpHandler
    {

        public void ProcessRequest(HttpContext context)
        {
            context.Response.ContentType = "text/plain";
            var method = context.Request.QueryString["method"];
            var result = "";
            switch (method)
            {
                case "join":
                    Join(context);
                    break;
                case "isjoin":
                    IsJoin(context);
                    break;
            }
        }
        private void Join(HttpContext context)
        {
            StreamReader reader = new StreamReader(context.Request.InputStream);
            String strJson = HttpUtility.UrlDecode(reader.ReadToEnd());
            Models.Join.ExpertInfo model = Newtonsoft.Json.JsonConvert.DeserializeObject<Models.Join.ExpertInfo>(strJson);
            var state=Helper.JoinProvide.ExpertState(model.OpenId);
            if (state==-1 || state==2)
            {
                var result= Helper.JoinProvide.AddExpert (model);
                context.Response.Write(Newtonsoft.Json.JsonConvert.SerializeObject(result, new Newtonsoft.Json.JsonSerializerSettings() { ContractResolver = new App.Helper.UnderlineSplitContractResolver() }));
            }
        }
        private void IsJoin(HttpContext context)
        {
            string openId = context.Request["openId"];
            var isExist= Helper.JoinProvide.ExpertState(openId);
            context.Response.Write(isExist);
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