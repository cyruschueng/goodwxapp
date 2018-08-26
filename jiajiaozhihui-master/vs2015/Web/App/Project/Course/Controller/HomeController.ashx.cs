using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using SfSoft.web.App.Helper;

namespace SfSoft.web.Course.Controller
{
    /// <summary>
    /// HomeController 的摘要说明
    /// </summary>
    public class HomeController : IHttpHandler
    {

        public void ProcessRequest(HttpContext context)
        {
            var method = context.Request.QueryString["method"];
            var result = "";
            switch (method)
            {
                case "infos":
                    GetInfos(context);
                    break;
                case "info":
                    GetInfo(context);
                    break;
            }
        }
        private void GetInfos(HttpContext context)
        {
            string openId = context.Request["openId"];
            var live = Helper.HomeProvide.GetCourseList(Enum.CourseThemeEnum.Wanmama, openId).Where(e=>e.StartDate!=null && e.CourseType==2  && e.StartDate.Value.Date.Equals(DateTime.Now.Date));

            var course = new Models.Course.Details();
            if (live.Count()>0) {
                course = Helper.HomeProvide.GetCourse(live.FirstOrDefault().Id, openId);
            }
            var common = Helper.HomeProvide.GetCourseList(Enum.CourseThemeEnum.MingshiKeTang, openId).Take(40);
            
            Models.Home.HomeInfo homeInfo = new Models.Home.HomeInfo();
            homeInfo.Live = live;
            homeInfo.Common = common;
            homeInfo.Now = DateTime.Now;
            var data = new { 
                WangMaMa=live,
                MingShiKeTing=common,
                Course=course
            };

            context.Response.Write(Newtonsoft.Json.JsonConvert.SerializeObject(data, new Newtonsoft.Json.JsonSerializerSettings() { ContractResolver = new App.Helper.UnderlineSplitContractResolver() }));
        }
        private void GetInfo(HttpContext context)
        {
            var courseId = context.Request["courseId"];
            var openId = context.Request["openId"];
            var model= Helper.HomeProvide.GetCourse(int.Parse(courseId),openId);
            Action<int> view = Helper.CourseProvide.SetViewNumber;
            view.BeginInvoke(int.Parse(courseId), null, null);
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