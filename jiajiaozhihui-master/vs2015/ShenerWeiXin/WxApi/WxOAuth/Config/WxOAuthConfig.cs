using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;

namespace ShenerWeiXin.WxApi.WxOAuth
{
    public class WxOAuthConfig
    {
        //=======【基本信息设置】=====================================
        /* 微信公众号信息配置
        * ExpireshIn：Refresh_token 过期时间
        */
        public const int ExpireshIn = 2592000;

        //=======【服务号信息设置】=====================================
        public const string APPID = "wxa0f624ad8cdb46c4";
        public const string APPSECRET = "951d20b853350b559ec625a6f3573714";

        //=======【测试服务号信息设置】=====================================
        //public const string APPID = "wx576711c98a9973f0";
        //public const string APPSECRET = "6b0fed56334b7c7693d92800ef1f8384";
        
    }
}
