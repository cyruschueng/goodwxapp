using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace SfSoft.web.Yuedu.Helper
{
    public class PersonalProvide
    {
        public static SfSoft.Model.WX_Yuedu_User GetReadUser(string appId, string openId)
        {
            SfSoft.BLL.WX_Yuedu_User bll = new SfSoft.BLL.WX_Yuedu_User();
            return bll.GetModelList("AppId='" + appId + "' and OpenId='" + openId + "'").AsEnumerable().FirstOrDefault();
        }
        public static int GetReadCountCount(string appId)
        {
            SfSoft.BLL.WX_Yuedu_User bll = new SfSoft.BLL.WX_Yuedu_User();
            return bll.GetModelList("isnull(IsAct,0)=1 and AppId='" + appId + "'").Count;
        }
        public static SfSoft.Model.WX_UserInfo GetWxUserInfo(string openId)
        {
            SfSoft.BLL.WX_UserInfo bll = new SfSoft.BLL.WX_UserInfo();
            return bll.GetModelList("OpenId='" + openId + "'").AsEnumerable().FirstOrDefault();
        }
        public static bool IsExist(string appId, string openId)
        {
            SfSoft.BLL.WX_Yuedu_User bll = new SfSoft.BLL.WX_Yuedu_User();
            return bll.Exists(appId, openId);
        }
        public static void UpdateNumber(string appId)
        {
            SfSoft.BLL.WX_Yuedu_Info bll = new SfSoft.BLL.WX_Yuedu_Info();
            SfSoft.Model.WX_Yuedu_Info model = bll.GetModelList("").AsEnumerable().FirstOrDefault(e => e.AppId == appId);
            model.NormalNumber += (model.NormalNumber ?? 0) + 1;
            bll.Update(model);
        }
    }
}