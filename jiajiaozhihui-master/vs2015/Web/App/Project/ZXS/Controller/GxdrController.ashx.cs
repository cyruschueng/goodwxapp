using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace SfSoft.web.ZXS.Controller
{
    /// <summary>
    /// GxdrController 的摘要说明
    /// </summary>
    public class GxdrController : IHttpHandler
    {
        private delegate void InitGxdrPlayerEventHandler(string openId);
        public void ProcessRequest(HttpContext context)
        {
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
            int id =int.Parse(context.Request["id"]);
            string openId = context.Request["openId"];

            InitGxdrPlayerEventHandler handler = new InitGxdrPlayerEventHandler(Init);
            handler.BeginInvoke(openId, null, null);
            var result = Helper.GxdrProvide.GetGxdrInfo(id, openId);
            context.Response.Write(Newtonsoft.Json.JsonConvert.SerializeObject(result, new Newtonsoft.Json.JsonSerializerSettings() { ContractResolver = new App.Helper.UnderlineSplitContractResolver() }));
        }
        private void Init(string openId)
        {
            Helper.GxdrProvide.Init(openId);
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