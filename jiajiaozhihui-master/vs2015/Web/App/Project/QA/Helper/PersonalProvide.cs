using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace SfSoft.web.QA.Helper
{
    public class PersonalProvide
    {
        public static SfSoft.Model.WX_QA_User GetReadUser(string appId, string openId)
        {
            SfSoft.BLL.WX_QA_User bll = new SfSoft.BLL.WX_QA_User();
            return bll.GetModelList("AppId='" + appId + "' and OpenId='" + openId + "'").AsEnumerable().FirstOrDefault();
        }
        public static int GetReadCountCount(string appId)
        {
            SfSoft.BLL.WX_QA_User bll = new SfSoft.BLL.WX_QA_User();
            return bll.GetModelList("isnull(IsAct,0)=1 and AppId='" + appId + "'").Count;
        }
        public static SfSoft.Model.WX_UserInfo GetWxUserInfo(string openId)
        {
            SfSoft.BLL.WX_UserInfo bll = new SfSoft.BLL.WX_UserInfo();
            return bll.GetModelList("OpenId='" + openId + "'").AsEnumerable().FirstOrDefault();
        }
        public static bool IsExist(string appId, string openId)
        {
            SfSoft.BLL.WX_QA_User bll = new SfSoft.BLL.WX_QA_User();
            return bll.Exists(appId, openId);
        }
        public static void UpdateNumber(string appId)
        {
            SfSoft.BLL.WX_QA_Info bll = new SfSoft.BLL.WX_QA_Info();
            SfSoft.Model.WX_QA_Info model = bll.GetModelList("").AsEnumerable().FirstOrDefault(e => e.AppId == appId);
            model.NormalNumber += (model.NormalNumber ?? 0) + 1;
            bll.Update(model);
        }
        public static Models.Personal.ExpertInfo GetExpertInfo(int id)
        {
            BLL.WX_JJZH_Expert bll = new BLL.WX_JJZH_Expert();
            var model = bll.GetModel(id);
            if (model != null) {
                string expertId = ""; string expertName = ""; int expertType = 0;
                if (model.ExpertType == 1) {
                    expertId = model.Id.ToString();
                    expertName = model.UName;
                    expertType = 1;
                }
                else if (model.ExpertType == 2)
                {
                    expertId = model.Id.ToString();
                    expertName = model.NickName;
                    expertType = 2;
                }
                return new Models.Personal.ExpertInfo()
                {
                    ExpertId =expertId,
                    ExpertName = expertName,
                    ExpertType = expertType
                };
            }
            return new Models.Personal.ExpertInfo();
        }
        public static int  UpdateMyExpert(string expertId,string expertType,string openId,string appId)
        { 
            BLL.WX_QA_User bll = new BLL.WX_QA_User();
            var model= bll.GetModel(appId, openId);
            if (model.ExpertId == expertId)
            {
                model.ExpertId = null;
                model.ExpertType = null;
                bll.Update(model);
                return 0;
            }
            else {
                model.ExpertId = expertId;
                model.ExpertType = string.IsNullOrEmpty(expertType) == true ? 0 : int.Parse(expertType);
                bll.Update(model);
                return 1;
            }
        }
    }
}