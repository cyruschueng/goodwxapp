using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using SfSoft.web.Service.Helper.Provide;

namespace SfSoft.web.Service
{
    /// <summary>
    /// SpecialArticle 的摘要说明
    /// </summary>
    public class SpecialArticle : IHttpHandler
    {

        public void ProcessRequest(HttpContext context)
        {
            var method = context.Request.QueryString["method"];
            switch (method)
            {
                case "get":
                    GetArticle(context);
                    break;
            }
        }
        private void GetArticle(HttpContext context)
        {
            var type = context.Request["type"];
            JinHuanProvide provide = new JinHuanProvide();
            var list= provide.GetJinHuan(int.Parse(type));
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