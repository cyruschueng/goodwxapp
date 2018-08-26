using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace SfSoft.web.AppStart.ZXS.Lib
{
    public class UserInfoProvide
    {
        public bool ExistsOpenId(string openid)
        {
            SfSoft.BLL.WX_UserInfo bll = new SfSoft.BLL.WX_UserInfo();
            SfSoft.Model.WX_UserInfo model = bll.GetModel(openid);
            return model == null ? false : true;
        }
        public SfSoft.Model.WX_UserInfo GetUserInfo(string openid)
        {
            SfSoft.BLL.WX_UserInfo bll = new SfSoft.BLL.WX_UserInfo();
            return bll.GetModel(openid);
        }
        public SfSoft.Model.WX_UserInfo ConvertToUserInfo(string jsonUserInfo)
        {
            Newtonsoft.Json.Linq.JObject jobject = Newtonsoft.Json.Linq.JObject.Parse(jsonUserInfo);
            SfSoft.Model.WX_UserInfo userInfo = new SfSoft.Model.WX_UserInfo();
            userInfo.OpenId = jobject["openid"].ToString();
            userInfo.NickName = jobject["nickname"].ToString();
            userInfo.Province = jobject["province"].ToString();
            userInfo.City = jobject["city"].ToString();
            userInfo.HeadImgUrl = jobject["headimgurl"].ToString();
            userInfo.Sex = jobject["sex"].ToString();
            userInfo.RegistDate = DateTime.Now;
            userInfo.IsSubscibe = IsSubscribe(jobject["openid"].ToString());
            return userInfo;
        }
        public SfSoft.Model.WX_UserInfo Add(SfSoft.Model.WX_UserInfo userInfo)
        {
            SfSoft.BLL.WX_UserInfo bll = new SfSoft.BLL.WX_UserInfo();
            bll.Add(userInfo);
            return userInfo;
        }
        public void Update(SfSoft.Model.WX_UserInfo userInfo)
        {
            SfSoft.BLL.WX_UserInfo bll = new SfSoft.BLL.WX_UserInfo();
            bll.Update(userInfo);
        }
        public int IsSubscribe(string openId)
        {
            try
            {
                var model = Senparc.Weixin.MP.AdvancedAPIs.UserApi.Info(App.Helper.WxBaseConfig.AppID,openId);
                return model.subscribe;
            }
            catch (Exception ex) {
                return 0;
            }
        }
    }
}