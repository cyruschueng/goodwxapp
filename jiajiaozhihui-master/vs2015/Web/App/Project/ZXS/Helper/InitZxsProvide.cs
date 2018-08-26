using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace SfSoft.web.ZXS.Helper
{
    public class InitZxsProvide
    {
        public static SfSoft.Model.WX_ZXS_Info GetZxsInfo(string appId)
        {
            SfSoft.BLL.WX_ZXS_Info bll = new SfSoft.BLL.WX_ZXS_Info();
            return bll.GetModelList("").AsEnumerable().FirstOrDefault(e => e.AppId == appId);
        }
        public static SfSoft.Model.WX_ZXS_Players GetZxsPlayer(string appId, string openId)
        {
            SfSoft.BLL.WX_ZXS_Players bll = new SfSoft.BLL.WX_ZXS_Players();
            return bll.GetModelList("Appid='" + appId + "' and OpenId='" + openId + "'").AsEnumerable().FirstOrDefault();
        }
        public static SfSoft.Model.WX_UserInfo GetUserInfo(string openId)
        {
            SfSoft.BLL.WX_UserInfo bll = new SfSoft.BLL.WX_UserInfo();
            return bll.GetModelList("openId='" + openId + "'").AsEnumerable().FirstOrDefault();
        }
        public static bool IsAttention(string openId)
        {
            Senparc.Weixin.MP.AdvancedAPIs.User.UserInfoJson result = Senparc.Weixin.MP.AdvancedAPIs.UserApi.Info(App.Helper.WxBaseConfig.AppID, openId);
            return result.subscribe == 0 ? false : true;
        }
    }
}