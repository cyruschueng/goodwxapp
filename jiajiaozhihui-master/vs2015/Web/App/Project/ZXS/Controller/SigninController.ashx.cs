using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.IO;

namespace SfSoft.web.ZXS.Controller
{
    /// <summary>
    /// SigninController 的摘要说明
    /// </summary>
    public class SigninController : IHttpHandler
    {

        public void ProcessRequest(HttpContext context)
        {
            var method = context.Request.QueryString["method"];
            var result = "";
            switch (method)
            {
                case "get":
                    Post(context);
                    break;
            }
        }
        public void Post(HttpContext context)
        {
            StreamReader reader = new StreamReader(context.Request.InputStream);
            String strJson = HttpUtility.UrlDecode(reader.ReadToEnd());

            Models.Signin.SigninInfo info = Newtonsoft.Json.JsonConvert.DeserializeObject<Models.Signin.SigninInfo>(strJson);

            if (!Helper.SigninProvide.IsTodayComplete(info.AppId, info.OpenId, info.ThemeId, info.Week, info.TaskId))
            {
                Helper.SigninProvide.Add(info);
            }
            context.Response.Write(Helper.SigninProvide.SigninList(info.AppId, info.OpenId, info.ThemeId, info.Week, info.TaskId).Count);
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