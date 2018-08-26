using System;
using System.Collections.Generic;
using System.Configuration;
using System.Linq;
using System.Web;

namespace SfSoft.web.App.Api.Config
{
    public class GxlmWxConfig
    {
        public static string AppId = ConfigurationManager.AppSettings["GxlmAppId"];
        public static string AppSecret = ConfigurationManager.AppSettings["GxlmAppSecret"];
        public static string RedirectUrl= ConfigurationManager.AppSettings["GxlmRedirectUrl"];
    }
}