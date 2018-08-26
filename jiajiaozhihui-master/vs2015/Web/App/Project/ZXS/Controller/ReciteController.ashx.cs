using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.IO;

namespace SfSoft.web.ZXS.Controller
{
    /// <summary>
    /// ReciteController 的摘要说明
    /// </summary>
    public class ReciteController : IHttpHandler
    {

        public void ProcessRequest(HttpContext context)
        {
            var method = context.Request.QueryString["method"];
            var result = "";
            switch (method)
            {
                case "info":
                    GetRecite(context);
                    break;
                case "add":
                    Add(context);
                    break;
            }
        }
        public void GetRecite(HttpContext context)
        {
            string appId= context.Request["appId"];
            string openId= context.Request["openId"];

            var recites= Helper.ReciteProvide.GetRecites(appId, openId);
            context.Response.Write(Newtonsoft.Json.JsonConvert.SerializeObject(recites, new Newtonsoft.Json.JsonSerializerSettings() { ContractResolver = new App.Helper.UnderlineSplitContractResolver() }));
        }
        public void Add(HttpContext context)
        {
            StreamReader reader = new StreamReader(context.Request.InputStream);
            String strJson = HttpUtility.UrlDecode(reader.ReadToEnd());
            SfSoft.Model.WX_ZXS_ApplyRecite entity = Newtonsoft.Json.JsonConvert.DeserializeObject<SfSoft.Model.WX_ZXS_ApplyRecite>(strJson);
            var result= Helper.ReciteProvide.Add(entity);
            context.Response.Write(Newtonsoft.Json.JsonConvert.SerializeObject(result, new Newtonsoft.Json.JsonSerializerSettings() { ContractResolver = new App.Helper.UnderlineSplitContractResolver() }));
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