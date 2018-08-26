using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace SfSoft.web.Course.Controller
{
    /// <summary>
    /// CourseController 的摘要说明
    /// </summary>
    public class CourseController : IHttpHandler
    {

        public void ProcessRequest(HttpContext context)
        {
            context.Response.ContentType = "text/plain";
            var method = context.Request.QueryString["method"];
            var result = "";
            switch (method)
            {
                case "learn":
                    Learn(context);
                    break;
                case "baglearn":
                    BagLearn(context);
                    break;
                case "mycourse":
                    MyCourse(context);
                    break;
                case "bags":
                    Bags(context);
                    break;
                case "view":
                    ViewCourse(context);
                    break;
                case "already":
                    UpdateAlready(context);
                    break;
                case "course":
                    GetCourse(context);
                    break;
            }
        }

        private void ViewCourse(HttpContext context)
        {
            string courseId=context.Request["courseId"]; 
            string themeId=context.Request["themeId"];
            string openId = context.Request["openId"];
            var model=Helper.CourseProvide.ViewCourse(int.Parse(courseId),(Enum.CourseThemeEnum)int.Parse(themeId),openId);
            context.Response.Write(Newtonsoft.Json.JsonConvert.SerializeObject(model, new Newtonsoft.Json.JsonSerializerSettings() { ContractResolver = new App.Helper.UnderlineSplitContractResolver() }));
        }

        private void BagLearn(HttpContext context)
        {
            string bagId = context.Request["bagId"];
            string openId = context.Request["openId"];
            //bool t = Helper.CourseProvide.BagLearn(int.Parse(bagId), openId);
            context.Response.Write(false);
        }

        private void Bags(HttpContext context)
        {
            string bagId=context.Request["bagId"];
            string openId=context.Request["openId"];
           var detail=  Helper.CourseProvide.GetCourseBagsList(int.Parse(bagId), openId);
           Action<int> view = Helper.BagsProvide.SetViewNumber;
           view.BeginInvoke(int.Parse(bagId), null, null);
           context.Response.Write(Newtonsoft.Json.JsonConvert.SerializeObject(detail, new Newtonsoft.Json.JsonSerializerSettings() { ContractResolver = new App.Helper.UnderlineSplitContractResolver() }));
        }

        private void MyCourse(HttpContext context)
        {
            string openId = context.Request["openId"];
            var list= Helper.CourseProvide.GetMyCourse(openId);

            context.Response.Write(Newtonsoft.Json.JsonConvert.SerializeObject(list, new Newtonsoft.Json.JsonSerializerSettings() { ContractResolver = new App.Helper.UnderlineSplitContractResolver() }));
        }
        private void GetCourse(HttpContext context)
        {
            string id = context.Request["courseId"];
            var model = Helper.CourseProvide.GetCourse(int.Parse(id));
            context.Response.Write(Newtonsoft.Json.JsonConvert.SerializeObject(model, new Newtonsoft.Json.JsonSerializerSettings() { ContractResolver = new App.Helper.UnderlineSplitContractResolver() }));
        }
        private void MyCourseBag(HttpContext context)
        { 
            
        }

        private void Learn(HttpContext context)
        {
            string courseId = context.Request["courseId"];
            string openId= context.Request["openId"];
            string courseType= context.Request["ctype"];
            bool t= Helper.CourseProvide.Learn(int.Parse(courseId), openId,int.Parse(courseType));
            context.Response.Write(t);
        }
        private void UpdateAlready(HttpContext context)
        {
            string contentId = context.Request["id"];
            Action<int> action = new Action<int>(Helper.CourseProvide.UpdateAlready);
            action.BeginInvoke(int.Parse(contentId), null, null);
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