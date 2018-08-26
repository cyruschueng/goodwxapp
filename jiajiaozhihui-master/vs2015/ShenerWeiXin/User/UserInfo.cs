using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;

namespace ShenerWeiXin.User
{
    public class UserInfo
    {
        public UserInfo(string openid)
        {
            GetHomeCardModel(openid);
        }
        /// <summary>
        /// 填加新的用户
        /// </summary>
        /// <param name="userInfo"></param>
        public void EditUserInfo(Senparc.Weixin.MP.AdvancedAPIs.OAuth.OAuthUserInfo userInfo)
        {
            if (HomeCardModel == null) 
            {
                SfSoft.Model.WX_HomeCard model = new SfSoft.Model.WX_HomeCard();
                model.CardId = "";
                model.City = userInfo.city;
                model.Province = userInfo.province;
                model.Country = userInfo.country;
                model.CreateDate = DateTime.Now;
                model.HeadimgUrl = userInfo.headimgurl;
                model.NickName = userInfo.nickname;
                model.OpenId = userInfo.openid;
                model.Sex = userInfo.sex;
                SfSoft.BLL.WX_HomeCard bll = new SfSoft.BLL.WX_HomeCard();
                bll.Add(model);
            }
            else {
                HomeCardModel.City = userInfo.city;
                HomeCardModel.Province = userInfo.province;
                HomeCardModel.Country = userInfo.country;
                HomeCardModel.HeadimgUrl = userInfo.headimgurl;
                HomeCardModel.NickName = userInfo.nickname;
                HomeCardModel.Sex = userInfo.sex;
                SfSoft.BLL.WX_HomeCard bll = new SfSoft.BLL.WX_HomeCard();
                bll.Update(HomeCardModel);
            }
        }
        public SfSoft.Model.WX_HomeCard HomeCardModel { get; private set; }

        /// <summary>
        /// 
        /// </summary>
        /// <param name="openid">服务号openid</param>
        /// <returns></returns>
        private  void  GetHomeCardModel(string openid)
        {
            SfSoft.BLL.WX_HomeCard bll = new SfSoft.BLL.WX_HomeCard();
            HomeCardModel= bll.GetModelByAgentId(openid);
        }
    }
}
