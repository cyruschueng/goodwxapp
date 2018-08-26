using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace SfSoft.web.App.Helper.HttpResponse
{
    /// <summary>
    /// ErrorProvide 的摘要说明
    /// </summary>
    public class ErrorProvide : IHttpHandler
    {

        public void ProcessRequest(HttpContext context)
        {
            context.Response.ContentType = "text/plain";
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
            var msg = context.Request["msg"];
            var item = context.Request["item"];
            Log.WriteNode(item + ":" + msg);
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