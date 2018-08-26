using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace SfSoft.web.ZXS.Controller
{
    /// <summary>
    /// UserInfoController 的摘要说明
    /// </summary>
    public class UserInfoController : IHttpHandler
    {

        public void ProcessRequest(HttpContext context)
        {
            var method = context.Request.QueryString["method"];
            var result = "";
            switch (method)
            {
                case "get":
                    Get(context);
                    break;
            }
        }
        public void Get(HttpContext context)
        {
            string openId = context.Request["openId"];
            SfSoft.BLL.WX_UserInfo bll = new SfSoft.BLL.WX_UserInfo();
            context.Response.Write(Newtonsoft.Json.JsonConvert.SerializeObject(bll.GetModel(openId), new Newtonsoft.Json.JsonSerializerSettings() { ContractResolver = new App.Helper.UnderlineSplitContractResolver() }));
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