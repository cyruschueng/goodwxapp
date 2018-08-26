using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using System.Web;

namespace SfSoft.web.AppStart.Lib
{
    public class GardeniaUserProvide
    {
        public bool ExistsOpenId(string openid)
        {
            SfSoft.BLL.wx_gardenia_user bll = new SfSoft.BLL.wx_gardenia_user();
            var list = bll.GetModelList("openid='"+ openid + "'");
            return list.Count>0 ? true : false;
        }
        public SfSoft.Model.WX_UserInfo GetUserInfo(string openid)
        {
            SfSoft.BLL.WX_UserInfo bll = new SfSoft.BLL.WX_UserInfo();
            var model = bll.GetModel(openid);
            return model;

        }
        public SfSoft.Model.WX_UserInfo AddGardeniaUser(SfSoft.Model.WX_UserInfo userInfo,string  appid,string catalogue)
        {
            SfSoft.Model.WX_SGroup_Content model = new SfSoft.Model.WX_SGroup_Content();
            if (!string.IsNullOrEmpty(appid) && !string.IsNullOrEmpty(catalogue)) {
                
                BLL.WX_SGroup_Content groupBll = new BLL.WX_SGroup_Content();
                var list= groupBll.GetModelList("group_type=" + appid + " and catalogue=" + catalogue);
                if (list.Count > 0) {
                    model = list.First();
                }
            }
            BLL.wx_gardenia_user bll = new BLL.wx_gardenia_user();
            if (ExistsOpenId(userInfo.OpenId) == false) {
                var user = new SfSoft.Model.wx_gardenia_user()
                {
                    child_age = null,
                    child_sex = "",
                    child_grade = "",
                    city = userInfo.City,
                    class_id = model.id,
                    create_date = DateTime.Now,
                    is_act = catalogue=="1" || catalogue==null ? 1:0,
                    nick_name = userInfo.NickName,
                    openid = userInfo.OpenId,
                    order_sn = "0",
                    parent_age = 0,
                    profession = "",
                    real_name = "",
                    telephone = "",
                    user_role =int.Parse(catalogue),
                };
                bll.Add(user);
            }
            Task.Run(() =>
            {
                BLL.WX_UserInfo userInfoBll = new BLL.WX_UserInfo();
                if (userInfoBll.Exists(userInfo.OpenId) == false)
                {
                    Add(userInfo);
                }
                else {
                    Update(userInfo);
                }
            });
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
            return userInfo;
        }

    }
}