using System;
using System.Web;
using System.IO;

namespace SfSoft.web.ZXS.Controller
{
    /// <summary>
    /// ApplyController 的摘要说明
    /// </summary>
    public class ApplyController : IHttpHandler
    {
        public void ProcessRequest(HttpContext context)
        {
            context.Response.ContentType = "text/plain";
            var method = context.Request.QueryString["method"];
            var result = "";
            switch (method)
            {
                case "add":
                    Post(context);
                    break;
            }
        }
        private void Post(HttpContext context)
        {
            StreamReader reader = new StreamReader(context.Request.InputStream);
            String strJson = HttpUtility.UrlDecode(reader.ReadToEnd());
            Models.Apply.ApplyInfo model = Newtonsoft.Json.JsonConvert.DeserializeObject<Models.Apply.ApplyInfo>(strJson);

            var apply= Helper.ApplyProvide.Add(model);
            context.Response.Write(Newtonsoft.Json.JsonConvert.SerializeObject(apply, new Newtonsoft.Json.JsonSerializerSettings() { ContractResolver = new App.Helper.UnderlineSplitContractResolver() }));
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