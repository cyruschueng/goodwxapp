using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using WxPayAPI;
using Newtonsoft.Json.Linq;

namespace SfSoft.web.wxrrd.Controller
{
    /// <summary>
    /// GuiderController 的摘要说明
    /// </summary>
    public class GuiderController : IHttpHandler
    {
        private int _limit = 1;
        private int _offset = 1;
        public void ProcessRequest(HttpContext context)
        {
            context.Response.ContentType = "text/plain";
            var method = context.Request.QueryString["method"];
            var result = "";
            switch (method)
            {
                case "down":
                    DownData(context);
                    break;
                case "search":
                    Search(context);
                    break;
            }
            DownData(context);
        }


        private void DownData(HttpContext context)
        {
            var appid = "6365925a4cb27585";
            var method = "weiba.wxrrd.guider.lists";
            var secret = "5758b6365925a4cb27585d6cd03c77d9";
            var access_token = context.Request["access_token"];

            Helper.GuiderProvide provide = new Helper.GuiderProvide(access_token, appid, method, secret, 1, 1);
            string result = provide.DownData();
            context.Response.Write(result);
        }

        private void Search(HttpContext context)
        {
            var memberId = context.Request["member_id"];
            Helper.GuiderProvide provide = new Helper.GuiderProvide();
            var list = provide.Search(memberId);
            context.Response.Write(list.Count);
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