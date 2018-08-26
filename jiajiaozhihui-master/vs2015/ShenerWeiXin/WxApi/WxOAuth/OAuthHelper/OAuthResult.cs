using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;

namespace ShenerWeiXin.WxApi.WxOAuth
{
    public class OAuthResult
    {
        /// <summary>
        /// 状态码
        /// </summary>
        public  string Code { get; set; }
        /// <summary>
        ///  消息
        /// </summary>
        public  string Msg { get; set; }

        /// <summary>
        /// 用户信息
        /// </summary>
        public  Senparc.Weixin.MP.AdvancedAPIs.OAuth.OAuthUserInfo UserInfo { get; set; }
    }
}
