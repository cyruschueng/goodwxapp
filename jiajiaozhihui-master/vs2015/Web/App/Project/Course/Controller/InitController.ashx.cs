using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace SfSoft.web.Course.Controller
{
    /// <summary>
    /// InitController 的摘要说明
    /// </summary>
    public class InitController : IHttpHandler
    {

        public void ProcessRequest(HttpContext context)
        {
            context.Response.ContentType = "text/plain";
            context.Response.Write("Hello World");
            
        }
        private void GetCourse(int courseId)
        {
            SfSoft.BLL.WX_Course bll = new BLL.WX_Course();
            var model = bll.GetModel(courseId);
            
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