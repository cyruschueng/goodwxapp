using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace SfSoft.web.ZXS.Controller
{
    /// <summary>
    /// ThemeController 的摘要说明
    /// </summary>
    public class ThemeController : IHttpHandler
    {

        public void ProcessRequest(HttpContext context)
        {
            context.Response.ContentType = "text/plain";
            var method = context.Request.QueryString["method"];
            switch (method)
            {
                case "info":
                    Get(context);
                    break;
                case "list":
                    GetList(context);
                    break;
            }
        }
        public void Get(HttpContext context)
        {
            string appId=context.Request["appId"];
            int themeId = int.Parse(context.Request["themeId"]);
            SfSoft.BLL.WX_ZXS_Theme bll = new SfSoft.BLL.WX_ZXS_Theme();
            context.Response.Write(Newtonsoft.Json.JsonConvert.SerializeObject(bll.GetModel(themeId), new Newtonsoft.Json.JsonSerializerSettings() { ContractResolver = new App.Helper.UnderlineSplitContractResolver() }));
        }
        public void  GetList(HttpContext context)
        {
            string appId = context.Request["appId"];
            SfSoft.BLL.WX_ZXS_Theme bll = new SfSoft.BLL.WX_ZXS_Theme();
            var list= bll.GetModelList("AppId='" + appId + "'");
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