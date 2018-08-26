using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace SfSoft.web.Audio.Controller
{
    /// <summary>
    /// DownLoadController 的摘要说明
    /// </summary>
    public class DownLoadController : IHttpHandler
    {

        public void ProcessRequest(HttpContext context)
        {
            var method = context.Request.QueryString["method"];
            switch (method)
            {
                case "list":
                    GetDownLoads(context);
                    break;
                case "detail":
                    GetDownLoad(context);
                    break;
            }
        }

        private void GetDownLoad(HttpContext context)
        {
            string id = context.Request["id"];
            var model = Helper.DownLoadProvide.GetDownLoad(int.Parse(id));
            context.Response.Write(Newtonsoft.Json.JsonConvert.SerializeObject(model,
                new Newtonsoft.Json.JsonSerializerSettings() { ContractResolver = new App.Helper.UnderlineSplitContractResolver() }));
        }

        private void GetDownLoads(HttpContext context)
        {
            string tag = context.Request["tag"];
            var list = Helper.DownLoadProvide.GetDownLoads(tag);
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