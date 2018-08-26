using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace SfSoft.web.Course.Controller
{
    /// <summary>
    /// CourseListController 的摘要说明
    /// </summary>
    public class CourseListController : IHttpHandler
    {

        public void ProcessRequest(HttpContext context)
        {
            context.Response.ContentType = "text/plain";
            var method = context.Request.QueryString["method"];
            var result = "";
            switch (method)
            {
                case "online":
                    GetOnline(context);
                    break;
                case "bag":
                    GetBag(context);
                    break;
                case "common":
                    GetCommon(context);
                    break;
            }
        }
        private void GetOnline(HttpContext context)
        {
            string openId = context.Request["openId"];
            var live = Helper.HomeProvide.GetCourseList(Enum.CourseThemeEnum.Live, openId);
            var data = new { 
                Now=DateTime.Now,
                Info=live
            };
            context.Response.Write(Newtonsoft.Json.JsonConvert.SerializeObject(data, new Newtonsoft.Json.JsonSerializerSettings() { ContractResolver = new App.Helper.UnderlineSplitContractResolver() }));
        }
        private void GetBag(HttpContext context)
        {
            string openId = context.Request["openId"];
            var bags = Helper.HomeProvide.GetBags(openId);
            context.Response.Write(Newtonsoft.Json.JsonConvert.SerializeObject(bags, new Newtonsoft.Json.JsonSerializerSettings() { ContractResolver = new App.Helper.UnderlineSplitContractResolver() }));
        }
        private void GetCommon(HttpContext context)
        {
            string openId = context.Request["openId"];
            var common = Helper.HomeProvide.GetCourseList(Enum.CourseThemeEnum.Common, openId);
            context.Response.Write(Newtonsoft.Json.JsonConvert.SerializeObject(common, new Newtonsoft.Json.JsonSerializerSettings() { ContractResolver = new App.Helper.UnderlineSplitContractResolver() }));
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