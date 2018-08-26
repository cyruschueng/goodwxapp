using System;
using System.Collections.Generic;
using System.Configuration;
using System.Linq;
using System.Web;

namespace SfSoft.web.common
{
    public static class WXConfig
    {
        public static string Token = System.Configuration.ConfigurationSettings.AppSettings["Token"]; //与微信公众账号后台的Token设置保持一致，区分大小写。
        public static string appId = System.Configuration.ConfigurationSettings.AppSettings["AppID"]; //创建菜单会使用
        public static string appSecret = System.Configuration.ConfigurationSettings.AppSettings["AppSecret"]; //创建菜单会使用
        public static string AgentAppID = System.Configuration.ConfigurationSettings.AppSettings["AgentAppID"]; //没有高级接口用第三方的AppID
        public static string AgentAppSecret = System.Configuration.ConfigurationSettings.AppSettings["AgentAppSecret"]; //没有高级接口用第三方的AppSecret
        public static string AuthURL = System.Configuration.ConfigurationSettings.AppSettings["AuthURL"]; //Auth认证回调域
    }
}