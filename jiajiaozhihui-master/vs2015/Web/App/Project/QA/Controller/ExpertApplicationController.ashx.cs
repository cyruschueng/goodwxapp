using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace SfSoft.web.App.Project.QA.Controller
{
    /// <summary>
    /// ExpertApplicationController 的摘要说明
    /// </summary>
    public class ExpertApplicationController : IHttpHandler
    {

        public void ProcessRequest(HttpContext context)
        {
            var method = context.Request.QueryString["method"];
            var result = "";
            switch (method)
            {
                case "add":
                    Add(context);
                    break;
            }
        }
        private void Add(HttpContext context)
        { 
            
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