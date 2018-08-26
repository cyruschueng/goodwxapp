using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace SfSoft.web.Course.Helper
{
    public class PersonalProvide
    {
        public static SfSoft.Model.WX_Course_User GetCourseUser(string openId)
        {
            SfSoft.BLL.WX_Course_User bll = new SfSoft.BLL.WX_Course_User();
            return bll.GetModelList("OpenId='" + openId + "'").AsEnumerable().FirstOrDefault();
        }
        public static int GetCourseUserCount()
        {
            SfSoft.BLL.WX_Course_User bll = new SfSoft.BLL.WX_Course_User();
            return bll.GetModelList("isnull(IsAct,0)=1").Count;
        }
        public static SfSoft.Model.WX_UserInfo GetWxUserInfo(string openId)
        {
            SfSoft.BLL.WX_UserInfo bll = new SfSoft.BLL.WX_UserInfo();
            return bll.GetModelList("OpenId='" + openId + "'").AsEnumerable().FirstOrDefault();
        }
        public static bool IsExist(string openId)
        {
            SfSoft.BLL.WX_Course_User bll = new SfSoft.BLL.WX_Course_User();
            return bll.Exists(openId);
        }
        public static Model.WX_Course_User Update(Models.Personal.UserInfo userInfo)
        { 
            SfSoft.BLL.WX_Course_User bll = new SfSoft.BLL.WX_Course_User();
            SfSoft.Model.WX_Course_User model = new SfSoft.Model.WX_Course_User();
            if (IsExist(userInfo.openId))
            {
                model = bll.GetModel(userInfo.openId);
                model.Age = userInfo.Age ?? 0;
                model.Birthday = DateTime.Now.AddYears(-userInfo.Age??0);
                model.Telephone = userInfo.TelePhone;
                model.Sex = userInfo.Sex;
                bll.Update(model);
            }
            return model;
        }
        public static void Add(Models.Personal.UserInfo entity)
        { 
            SfSoft.BLL.WX_Course_User bll = new SfSoft.BLL.WX_Course_User();
            SfSoft.Model.WX_Course_User model = bll.GetModel(entity.openId);
            if (model == null)
            {
                model = new SfSoft.Model.WX_Course_User();
                model.Birthday = DateTime.Now.AddYears(-(entity.Age ?? 0));
                model.Age = entity.Age ?? 0;
                model.OpenId = entity.openId;
                model.UserType = 0;
                model.RegionDate = DateTime.Now;
                model.IsAct = 1;
                bll.Add(model);
            }
        }
    }
}