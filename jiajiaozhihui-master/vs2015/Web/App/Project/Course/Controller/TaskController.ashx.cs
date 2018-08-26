using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using SfSoft.web.App.Helper;

namespace SfSoft.web.Course.Controller
{
    /// <summary>
    /// TaskController 的摘要说明
    /// </summary>
    public class TaskController : IHttpHandler
    {

        public void ProcessRequest(HttpContext context)
        {
            /*
            if (WxBaseConfig.Debug == "true")
            {
                context.Response.AddHeader("Access-Control-Allow-Origin", "*");

                App.Helper.Log.WriteNode("origin*****", "origin.txt");
            }
            else
            {
                context.Response.AddHeader("Access-Control-Allow-Origin", "*.jiajiaozhihui.cn");
                App.Helper.Log.WriteNode("origin jiajiaozhihui.cn", "origin.txt");
            }
             * */
            var method = context.Request.QueryString["method"];
            switch (method)
            {
                case "config":
                    GetConfig(context);
                    break;
            }
        }

        private void GetConfig(HttpContext context)
        {
            var courseId=context.Request["courseid"];
            Helper.TaskProvide provide = new Helper.TaskProvide(int.Parse(courseId));
            var model= provide.GetConfig();
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