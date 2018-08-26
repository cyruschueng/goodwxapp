using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace SfSoft.web.Course.Controller
{
    /// <summary>
    /// MyController 的摘要说明
    /// </summary>
    public class MyController : IHttpHandler
    {

        public void ProcessRequest(HttpContext context)
        {
            context.Response.ContentType = "text/plain";
            var method = context.Request.QueryString["method"];
            var result = "";
            switch (method)
            {
                case "my":
                    GetInfo(context);
                    break;
                case "list":
                    GetCourseList(context);
                    break;
            }
        }
        /// <summary>
        /// 我参加的课程
        /// </summary>
        /// <param name="context"></param>
        public void GetCourseList(HttpContext context)
        {
            var theme = context.Request["theme"];
            var openId = context.Request["openId"];
            if (int.Parse(theme) == (int)Enum.CourseThemeEnum.Common) {
                var list = Helper.MyProvide.GetCourseList(Enum.CourseThemeEnum.Common, openId);
                context.Response.Write(Newtonsoft.Json.JsonConvert.SerializeObject(list, new Newtonsoft.Json.JsonSerializerSettings() { ContractResolver = new App.Helper.UnderlineSplitContractResolver() }));
            }
            else if (int.Parse(theme) == (int)Enum.CourseThemeEnum.Live) {
                var list = Helper.MyProvide.GetCourseList(Enum.CourseThemeEnum.Live, openId);
                context.Response.Write(Newtonsoft.Json.JsonConvert.SerializeObject(list, new Newtonsoft.Json.JsonSerializerSettings() { ContractResolver = new App.Helper.UnderlineSplitContractResolver() }));
            }
            else if (int.Parse(theme) == (int)Enum.CourseThemeEnum.Bag)
            {
                var list = Helper.MyProvide.GetBags(openId);
                context.Response.Write(Newtonsoft.Json.JsonConvert.SerializeObject(list, new Newtonsoft.Json.JsonSerializerSettings() { ContractResolver = new App.Helper.UnderlineSplitContractResolver() }));
            }
        }

        private void GetInfo(HttpContext context)
        {
            string openId = context.Request["openId"];
            Models.My.MyInfo info = new Models.My.MyInfo();
            var list = Helper.MyProvide.GetMyCourseList(openId);
            info.CourseNumber = Helper.MyProvide.GetMyCourseList(openId).Count;
            var data = new { 
                online=list.Count(e=>(e.OnlineId??0)!=0),
                bag=list.Where(e=>(e.BagId??0)!=0).Distinct(new Helper.CompareProvide.Compare<Model.WX_Course_Personal>(
                        (x,y)=>(null != x && null != y) && (x.BagId == y.BagId))).ToList().Count(),
                common=list.Count(e=>(e.BagId??0)==0 && (e.OnlineId??0)==0)
            };
            context.Response.Write(Newtonsoft.Json.JsonConvert.SerializeObject(data, new Newtonsoft.Json.JsonSerializerSettings() { ContractResolver = new App.Helper.UnderlineSplitContractResolver() }));
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