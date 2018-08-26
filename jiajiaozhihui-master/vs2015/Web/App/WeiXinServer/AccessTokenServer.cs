using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace SfSoft.web.WeiXinServer
{
    public class AccessTokenServer
    {
        public static string GetAccessToken(string appid, string appsecret)
        {
            string accessToken= Senparc.Weixin.MP.Containers.AccessTokenContainer.TryGetAccessToken(appid, appsecret);
            return accessToken;
        }
    }
}
