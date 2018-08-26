using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace SfSoft.web.WxOpen.Provide.Habit
{
    public class UserInfo
    {
        public List<Model.WX_UserInfo> GetUserList()
        {
            BLL.WX_UserInfo bll = new BLL.WX_UserInfo();
            var list= bll.GetModelList("AppId='wx4f61727571bee0a2'");
            return list;
        }
        public Model.WX_UserInfo GetUserInfo(string openId)
        {
            BLL.WX_UserInfo bll = new BLL.WX_UserInfo();
            var model= bll.GetModel(openId);
            if (model != null)
            {
                return model;
            }
            return new Model.WX_UserInfo();
        }
        public bool Exist(string openId)
        {
            BLL.WX_UserInfo bll = new BLL.WX_UserInfo();
            return bll.Exists(openId);
        }
        public void AddUser(Model.WX_UserInfo model)
        {
            if (!Exist(model.OpenId)) {
                BLL.WX_UserInfo bll = new BLL.WX_UserInfo();
                bll.Add(model);
            }
        }
    }
}