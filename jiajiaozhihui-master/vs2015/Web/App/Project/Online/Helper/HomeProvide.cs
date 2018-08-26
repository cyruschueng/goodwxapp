using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace SfSoft.web.Online.Helper
{
    public class HomeProvide
    {
        public int AddUser(string userName,string telephone,string type,string openId)
        {
            var model = new Model.wx_online()
            {
                openid=openId,
                course_type = type,
                create_date = DateTime.Now,
                is_act = 1,
                telephone = telephone,
                username = userName,
            };
            BLL.wx_online bll = new BLL.wx_online();
            return bll.Add(model);
        }
        public bool Exist(string openid, string type)
        {
            BLL.wx_online bll = new BLL.wx_online();
            var list= bll.GetModelList("openid='" + openid + "' and course_type='"+ type + "'");
            return list.Count > 0 ? true : false;
        }
    }
}