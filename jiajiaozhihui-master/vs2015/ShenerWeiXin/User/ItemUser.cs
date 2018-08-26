using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;

namespace ShenerWeiXin.User
{
    public  class ItemUser
    {
        public  SfSoft.Model.WX_Items_User Register(Senparc.Weixin.MP.AdvancedAPIs.OAuth.OAuthUserInfo UserInfo, int isact, ItemObject Item, decimal latitude, decimal longitude)
        {
            SfSoft.Model.WX_Items_User user = new SfSoft.Model.WX_Items_User();
            user.City = UserInfo.city;
            user.Country = UserInfo.country;
            user.HeadImgUrl = UserInfo.headimgurl;
            user.IsAct = isact;
            user.ItemsId = (int)Item;
            user.Latitude=latitude;
            user.Longitude = longitude;
            user.NickName = UserInfo.nickname;
            user.OpenId = UserInfo.openid;
            user.Privilege = "";
            user.Province = UserInfo.province;
            user.Sex = UserInfo.sex;
            user.IsAct = 1;

            SfSoft.BLL.WX_Items_User bll = new SfSoft.BLL.WX_Items_User();
            bll.AddUpdate(user);

            return user;
        }
        public SfSoft.Model.WX_Items_User GetUserInfo(string openid, ItemObject Item)
        {
            SfSoft.BLL.WX_Items_User user = new SfSoft.BLL.WX_Items_User();
            return user.GetModel(openid, (int)Item);
        }
    }
}
