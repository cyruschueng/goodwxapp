using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace SfSoft.web.Audio.Controller
{
    /// <summary>
    /// CalculateController 的摘要说明
    /// </summary>
    public class CalculateController : IHttpHandler
    {

        public void ProcessRequest(HttpContext context)
        {
            var method = context.Request.QueryString["method"];
            switch (method)
            {
                case "count":
                    Calculate(context);
                    break;
            }
        }
        private void Calculate(HttpContext context)
        {
            string id = context.Request["audioId"];
            var number = Helper.AudioProvide.PlayNumber(int.Parse(id));
            context.Response.Write(number);
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