using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;

namespace ShenerWeiXin.WxApi.WxOAuth
{
    public class Helper
    {
        /// <summary>
        /// 静默获取用户信息
        /// 返回结果
        /// </summary>
        /// <param name="code">值ok正确获取到，否则出错</param>
        /// <param name="msg"></param>
        /// <param name="userInfo"></param>
        /// <returns></returns>
        public static OAuthResult SetBaseOAuthResult(string code, string msg, Senparc.Weixin.MP.AdvancedAPIs.OAuth.OAuthUserInfo userInfo)
        {
            OAuthResult result = new OAuthResult();
            result.Code = code;
            result.Msg = msg;
            result.UserInfo = userInfo;
            return result;
        }
    }
}
