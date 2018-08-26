using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace SfSoft.web.Generalize.Controller
{
    /// <summary>
    /// LoginController 的摘要说明
    /// </summary>
    public class LoginController : IHttpHandler
    {

        public void ProcessRequest(HttpContext context)
        {
            context.Response.ContentType = "text/plain";
            Login(context);
        }
        private void Login(HttpContext context)
        {
            var accounts = context.Request["accounts"];
            var password = context.Request["password"];
            Helper.LoginProvide provide = new Helper.LoginProvide();
            var model= provide.Login(accounts, password);
            if (model != null)
            {
                var info = new
                {
                    Id = model.id,
                    GroupName = model.group_name,
                    Introduce = model.introduce,
                    ImgUrl = model.img_url,
                    IsAct = model.is_act,
                    CreateDate = model.create_date,
                    Accounts = model.Accounts
                };
                context.Response.Write(Newtonsoft.Json.JsonConvert.SerializeObject(info, new Newtonsoft.Json.JsonSerializerSettings() { ContractResolver = new App.Helper.UnderlineSplitContractResolver() }));
            }
            else {
                context.Response.Write("");
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