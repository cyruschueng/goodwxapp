using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace SfSoft.web.Audio.Helper
{
    public class InitProvide
    {
        public static SfSoft.Model.WX_Audio_User GetReadUserInfo(string appId, string openId)
        {
            SfSoft.BLL.WX_Audio_User bll = new SfSoft.BLL.WX_Audio_User();
            return bll.GetModelList("AppId='" + appId + "' and OpenId='" + openId + "'").AsEnumerable().FirstOrDefault();
        }
        public static SfSoft.Model.WX_UserInfo GetWxUserInfo(string openId)
        {
            SfSoft.BLL.WX_UserInfo bll = new SfSoft.BLL.WX_UserInfo();
            return bll.GetModelList("openId='" + openId + "'").AsEnumerable().FirstOrDefault();
        }
        public static void RegistUser(string appId, string openId)
        {
            var wxUser = GetWxUserInfo(openId);
            if (wxUser != null)
            {
                var readUser = GetReadUserInfo(appId, openId);
                if (readUser == null)
                {
                    SfSoft.BLL.WX_Audio_User bll = new SfSoft.BLL.WX_Audio_User();
                    SfSoft.Model.WX_Audio_User model = new Model.WX_Audio_User();
                    model.AppId = appId;
                    model.IsAct = 1;
                    model.OpenId = openId;
                    model.RegionDate = DateTime.Now;
                    bll.Add(model);
                }
            }
        }
        public static bool IsAttention(string openId)
        {
            var accessToken = Senparc.Weixin.MP.Containers.AccessTokenContainer.TryGetAccessToken(App.Helper.WxBaseConfig.AppID, App.Helper.WxBaseConfig.AppSecret);
            
            Senparc.Weixin.MP.AdvancedAPIs.User.UserInfoJson result = Senparc.Weixin.MP.AdvancedAPIs.UserApi.Info(accessToken, openId);
            return result.subscribe == 0 ? false : true;
        }
    }
}