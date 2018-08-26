using System;
using System.Collections.Generic;
using System.Configuration;
using System.Linq;
using System.Web;

namespace ShenerWeiXin
{
    public static class WXConfig
    {
        public static string Token = System.Configuration.ConfigurationSettings.AppSettings["Token"]; //与微信公众账号后台的Token设置保持一致，区分大小写。
        public static string appId = System.Configuration.ConfigurationSettings.AppSettings["AppID"]; //创建菜单会使用
        public static string appSecret = System.Configuration.ConfigurationSettings.AppSettings["AppSecret"]; //创建菜单会使用
        public static string AgentAppID = System.Configuration.ConfigurationSettings.AppSettings["AgentAppID"]; //没有高级接口用第三方的AppID
        public static string AgentAppSecret = System.Configuration.ConfigurationSettings.AppSettings["AgentAppSecret"]; //没有高级接口用第三方的AppSecret
        public static string AuthURL = System.Configuration.ConfigurationSettings.AppSettings["AuthURL"]; //Auth认证回调域
        public static string TenPayV3_MchId = System.Configuration.ConfigurationSettings.AppSettings["TenPayV3_MchId"]; //商户号
        public static string TenPayV3_Key = System.Configuration.ConfigurationSettings.AppSettings["TenPayV3_Key"]; //商户号
        public static string TenPayV3_TenpayNotify = System.Configuration.ConfigurationSettings.AppSettings["TenPayV3_TenpayNotify"]; //商户号
        public static string EncryptKey = System.Configuration.ConfigurationSettings.AppSettings["EncrtptKey"]; //加密字符WeiXinID
        public static string WeiXinID = System.Configuration.ConfigurationSettings.AppSettings["WeiXinID"]; //默认WeiXinID
        public static bool Kf = System.Configuration.ConfigurationSettings.AppSettings["IsKf"]=="1"?true:false;  //启用多客户
    }
}