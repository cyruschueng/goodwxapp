using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.IO;

namespace SfSoft.web.ZXS.Controller
{
    /// <summary>
    /// WitnessController 的摘要说明
    /// </summary>
    public class WitnessController : IHttpHandler
    {

        public void ProcessRequest(HttpContext context)
        {
            var method = context.Request.QueryString["method"];
            var result = "";
            switch (method)
            {
                case "get":
                    Get(context);
                    break;
                case "add":
                    Post(context);
                    break;
            }
        }
        public void Get(HttpContext context)
        {
            string appId = context.Request["appId"];
            string openId = context.Request["openId"];
            int themeId =int.Parse( context.Request["themeId"]);
            context.Response.Write(Newtonsoft.Json.JsonConvert.SerializeObject(Helper.WitnessProvide.GetWitnessList(appId, openId, themeId), new Newtonsoft.Json.JsonSerializerSettings() { ContractResolver = new App.Helper.UnderlineSplitContractResolver() }));
        }
        public void Post(HttpContext context)
        {
            StreamReader reader = new StreamReader(context.Request.InputStream);
            String strJson = HttpUtility.UrlDecode(reader.ReadToEnd());
            Models.Witness.WitnessInfo entity = Newtonsoft.Json.JsonConvert.DeserializeObject<Models.Witness.WitnessInfo>(strJson);
            context.Response.Write(Newtonsoft.Json.JsonConvert.SerializeObject(Helper.WitnessProvide.Add(entity), new Newtonsoft.Json.JsonSerializerSettings() { ContractResolver = new App.Helper.UnderlineSplitContractResolver() }));
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