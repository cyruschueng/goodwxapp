using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace SfSoft.web.Test.SimulateLogin
{
    /// <summary>
    /// login 的摘要说明
    /// </summary>
    public class login : IHttpHandler
    {

        public void ProcessRequest(HttpContext context)
        {
            context.Response.ContentType = "text/plain";
            HttpUtils utils = new HttpUtils();
            utils.requestM("jjzh:xieyan", "jjzhYY7738");
        }
        private void Entery()
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