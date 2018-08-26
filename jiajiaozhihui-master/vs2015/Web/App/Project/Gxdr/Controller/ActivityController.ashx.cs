using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace SfSoft.web.App.Project.Gxdr.Controller
{
    /// <summary>
    /// ActivityController 的摘要说明
    /// </summary>
    public class ActivityController : IHttpHandler
    {

        public void ProcessRequest(HttpContext context)
        {
            context.Response.ContentType = "text/plain";
            var method = context.Request.QueryString["method"];
            switch (method)
            {
                case "activity":
                    GetActivityList(context);
                    break;
            }
        }
        private void GetActivityList(HttpContext context)
        {
            var appId = context.Request["appId"];
            Helper.ActivityProvide provide = new Helper.ActivityProvide();
            var results = new List<dynamic>();
            var list= provide.GetActivity(appId);
            foreach (var m in list) {
                results.Add(new
                {
                    Id=m.ID,
                    Name=m.ActivityName
                });
            }
            context.Response.Write(Newtonsoft.Json.JsonConvert.SerializeObject(results, new Newtonsoft.Json.JsonSerializerSettings() { ContractResolver = new App.Helper.UnderlineSplitContractResolver() }));
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