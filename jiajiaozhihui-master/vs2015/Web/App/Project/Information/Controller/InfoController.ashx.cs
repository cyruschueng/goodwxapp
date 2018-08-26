using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace SfSoft.web.Information.Controller
{
    /// <summary>
    /// InfoController 的摘要说明
    /// </summary>
    public class InfoController : IHttpHandler
    {

        public void ProcessRequest(HttpContext context)
        {
            context.Response.ContentType = "text/plain";
            var method = context.Request.QueryString["method"];
            var result = "";
            switch (method)
            {
                case "info":
                    GetInfo(context);
                    break;
            }
        }

        private void GetInfo(HttpContext context)
        {
            string id = context.Request["id"];
            SfSoft.BLL.WX_Article_Release bll = new BLL.WX_Article_Release();
            var model = bll.GetModel(int.Parse(id));
            context.Response.Write(Newtonsoft.Json.JsonConvert.SerializeObject(model, new Newtonsoft.Json.JsonSerializerSettings() { ContractResolver = new App.Helper.UnderlineSplitContractResolver() }));
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