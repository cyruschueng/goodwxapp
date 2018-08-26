using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace SfSoft.web.Course.Controller
{
    /// <summary>
    /// BuyController 的摘要说明
    /// </summary>
    public class BuyController : IHttpHandler
    {

        public void ProcessRequest(HttpContext context)
        {
            context.Response.ContentType = "text/plain";
            var method = context.Request.QueryString["method"];
            var result = "";
            switch (method)
            {
                case "ib":
                    IsBuy(context);
                    break;
                case "ba":
                    IsBagBuy(context);
                    break;
            }
        }

        private void IsBuy(HttpContext context)
        {
            string courseId = context.Request["courseId"];
            string openId = context.Request["openId"];
            var t= Helper.BuyProvide.IsBuy(int.Parse(courseId),openId);
            context.Response.Write(t);
        }
        private void IsBagBuy(HttpContext context)
        {
            string courseId = context.Request["courseId"];
            string openId = context.Request["openId"];
            var t = Helper.BuyProvide.IsBagBuy(int.Parse(courseId), openId);
            context.Response.Write(t);
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