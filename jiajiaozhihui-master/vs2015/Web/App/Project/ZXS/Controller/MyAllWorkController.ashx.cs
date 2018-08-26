﻿using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using SfSoft.web.App.Helper;

namespace SfSoft.web.ZXS.Controller
{
    /// <summary>
    /// MyAllWorkController 的摘要说明
    /// </summary>
    public class MyAllWorkController : IHttpHandler
    {

        public void ProcessRequest(HttpContext context)
        {
            context.Response.ContentType = "text/plain";
            string method = context.Request.QueryString["method"];
            switch (method) { 
                case "all":
                    Get(context);
                    break;
            }
        }
        private void Get(HttpContext context)
        {
            string appId=context.Request["appId"];
            string openId=context.Request["openId"];
            int pageIndex=int.Parse(context.Request["pageIndex"]);
            int pageSize = int.Parse(context.Request["pageSize"]);
            Helper.ZxsHomeProvide provide = new Helper.ZxsHomeProvide(appId, openId);
            string where = "AppId='" + appId + "' and OpenId='" + openId + "' and Status=1";
            string orderBy = "Sn asc,CreateDate desc";
            context.Response.Write(Newtonsoft.Json.JsonConvert.SerializeObject(provide.GetTaks(where, pageSize, pageIndex, orderBy), new Newtonsoft.Json.JsonSerializerSettings() { ContractResolver = new UnderlineSplitContractResolver() }));
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