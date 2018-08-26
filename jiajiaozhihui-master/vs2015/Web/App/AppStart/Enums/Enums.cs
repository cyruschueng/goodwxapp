using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace SfSoft.web.AppStart.Enums
{
    public enum EnumOAuthState
    {
        未设置回调 = 1000,
        snsapi_userinfo请求失败 = 1001,
        参数解析失败 = 1002,

        snsapi_userinfo请求成功 = 1,
        参数解析成功 = 2,
    }
}