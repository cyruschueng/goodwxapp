using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace SfSoft.web.Generalize.Controller
{
    /// <summary>
    /// MemberController 的摘要说明
    /// </summary>
    public class MemberController : IHttpHandler
    {

        public void ProcessRequest(HttpContext context)
        {
            context.Response.ContentType = "text/plain";
            var method = context.Request.QueryString["method"];
            switch (method)
            {
                case "list":
                    GetList(context);
                    break;
                case "modify":
                    Modify(context);
                    break;
                case "delete":
                    Delete(context);
                    break;
                case "classlist":
                    GetClassList(context);
                    break;
            }
        }

        private void GetClassList(HttpContext context)
        {
            var groupId = context.Request["groupId"];
            Helper.MemberProvide provide = new Helper.MemberProvide();
            var data= provide.GetClassList(int.Parse(groupId));
            context.Response.Write(Newtonsoft.Json.JsonConvert.SerializeObject(data, new Newtonsoft.Json.JsonSerializerSettings() { ContractResolver = new App.Helper.UnderlineSplitContractResolver() }));
        }

        private void Delete(HttpContext context)
        {
            var openId = context.Request["openid"];
            Helper.MemberProvide provide = new Helper.MemberProvide();
            provide.Delete(openId);
            context.Response.Write("ok");
        }

        private void Modify(HttpContext context)
        {
            var openId = context.Request["openid"];
            Helper.MemberProvide provide = new Helper.MemberProvide();
            provide.Modify(openId);
            context.Response.Write("ok");
        }

        private void GetList(HttpContext context)
        {
            var classId = context.Request["classid"];
            Helper.MemberProvide provide = new Helper.MemberProvide();
            var list= provide.GetList(int.Parse(classId));
            context.Response.Write(Newtonsoft.Json.JsonConvert.SerializeObject(list, new Newtonsoft.Json.JsonSerializerSettings() { ContractResolver = new App.Helper.UnderlineSplitContractResolver() }));
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