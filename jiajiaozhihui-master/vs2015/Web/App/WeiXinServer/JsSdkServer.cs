using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using Senparc.Weixin.MP.Helpers;

namespace SfSoft.web.WeiXinServer
{
    public class JsSdkServer
    {
        public static JsSdkUiPackage GetJsSdkUiPackage(string url, string appid, string appsecret)
        {
            Senparc.Weixin.MP.Helpers.JsSdkUiPackage package =
            Senparc.Weixin.MP.Helpers.JSSDKHelper.GetJsSdkUiPackage(appid, appsecret, url);

            return package;
        }
    }
}