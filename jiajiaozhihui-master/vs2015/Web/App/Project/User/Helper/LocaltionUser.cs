using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace SfSoft.web.User.Helper
{
    public class LocaltionUser
    {
        public static List<Model.WX_UserInfo> GetUserList()
        {
            BLL.WX_UserInfo bll = new BLL.WX_UserInfo();
            var list = bll.GetModelList("");
            return list;
        }
        public static Model.WX_UserInfo GetUserInfo(string openId)
        {
            BLL.WX_UserInfo bll = new BLL.WX_UserInfo();
            var model = bll.GetModel(openId);
            if (model != null)
            {
                return model;
            }
            return new Model.WX_UserInfo();
        }
        public static bool Exist(string openId)
        {
            BLL.WX_UserInfo bll = new BLL.WX_UserInfo();
            return bll.Exists(openId);
        }
        public static void AddUser(Model.WX_UserInfo model)
        {
            if (!Exist(model.OpenId))
            {
                BLL.WX_UserInfo bll = new BLL.WX_UserInfo();
                bll.Add(model);
            }
        }
    }
}