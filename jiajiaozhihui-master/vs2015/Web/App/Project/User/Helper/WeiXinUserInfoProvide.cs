using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace SfSoft.web.User.Helper
{
    public class WeiXinUserInfoProvide
    {
        /// <summary>
        /// 从微信服务器获取用户信息
        /// </summary>
        /// <param name="openId"></param>
        /// <returns></returns>
        public static Senparc.Weixin.MP.AdvancedAPIs.User.UserInfoJson GetUserInfo(string openId)
        {
            var userInfo= Senparc.Weixin.MP.AdvancedAPIs.UserApi.Info(App.Helper.WxBaseConfig.AppID, openId);
            return userInfo;
        }
        
    }
}