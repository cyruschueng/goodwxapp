using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace SfSoft.web.Online.Controller
{
    /// <summary>
    /// HomeController 的摘要说明
    /// </summary>
    public class HomeController : IHttpHandler
    {

        public void ProcessRequest(HttpContext context)
        {
            var method = context.Request.QueryString["method"];
            switch (method)
            {
                case "add":
                    AddUser(context);
                    break;
                case "exist":
                    Exist(context);
                    break;
            }
        }
        private void AddUser(HttpContext context)
        {
            try
            {
                var userName = context.Request["userName"];
                var telephone = context.Request["telephone"];
                var type = context.Request["type"];
                var openId = context.Request["openid"];
                Helper.HomeProvide provide = new Helper.HomeProvide();
                if (provide.Exist(openId, type) == false)
                {
                    provide.AddUser(userName, telephone, type, openId);
                    var result = new
                    {
                        success=true,state="add"
                    };
                    context.Response.Write(Newtonsoft.Json.JsonConvert.SerializeObject(result, new Newtonsoft.Json.JsonSerializerSettings() { ContractResolver = new App.Helper.UnderlineSplitContractResolver() }));

                }
                else
                {
                    var result = new
                    {
                        success = true,
                        state = "update"
                    };
                    context.Response.Write(Newtonsoft.Json.JsonConvert.SerializeObject(result, new Newtonsoft.Json.JsonSerializerSettings() { ContractResolver = new App.Helper.UnderlineSplitContractResolver() }));
                }
            }
            catch (Exception ex) {
                var result = new
                {
                    success = false
                };
                context.Response.Write(Newtonsoft.Json.JsonConvert.SerializeObject(result, new Newtonsoft.Json.JsonSerializerSettings() { ContractResolver = new App.Helper.UnderlineSplitContractResolver() }));
            }
        }
        private void Exist(HttpContext context)
        {
            try
            {
                var openId = context.Request["openid"];
                var type = context.Request["type"];
                Helper.HomeProvide provide = new Helper.HomeProvide();
                var t = provide.Exist(openId, type);
                var result = new
                {
                    success = true,
                    state=t
                };
                context.Response.Write(Newtonsoft.Json.JsonConvert.SerializeObject(result, new Newtonsoft.Json.JsonSerializerSettings() { ContractResolver = new App.Helper.UnderlineSplitContractResolver() }));
            }
            catch (Exception ex) {
                var result = new
                {
                    success = false
                };
                context.Response.Write(Newtonsoft.Json.JsonConvert.SerializeObject(result, new Newtonsoft.Json.JsonSerializerSettings() { ContractResolver = new App.Helper.UnderlineSplitContractResolver() }));
            }
            
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