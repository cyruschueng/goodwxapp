using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace SfSoft.web.Parents.Helper
{
    public class InitParentsProvide
    {
        public static SfSoft.Model.WX_Parents_User GetParentsUserInfo(string appId, string openId)
        {
            SfSoft.BLL.WX_Parents_User bll = new SfSoft.BLL.WX_Parents_User();
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
                var readUser = GetParentsUserInfo(appId, openId);
                if (readUser == null)
                {
                    SfSoft.BLL.WX_Parents_User bll = new SfSoft.BLL.WX_Parents_User();
                    SfSoft.Model.WX_Parents_User model = new Model.WX_Parents_User();
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
            Senparc.Weixin.MP.AdvancedAPIs.User.UserInfoJson result = Senparc.Weixin.MP.AdvancedAPIs.UserApi.Info(App.Helper.WxBaseConfig.AppID, openId);
            return result.subscribe == 0 ? false : true;
        }
    }
}