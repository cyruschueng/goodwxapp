using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace SfSoft.web.QA.Helper
{
    public class UserProvide
    {
        public static Models.Expert.ExpertInfo GetExpert(string appId, string openId)
        {
            BLL.WX_QA_User bll = new BLL.WX_QA_User();
            var model= bll.GetModel(appId, openId);
            if (model != null && model.ExpertId != "") {
                return Helper.ExpertProvide.GetExperts().Where(e => e.Id == int.Parse(model.ExpertId)).FirstOrDefault();
            }
            return new Models.Expert.ExpertInfo();
        }
        public static int GetNewQuestionNumber(string openId,string appId)
        {
            var expert = Helper.ExpertProvide.GetExperts().Where(e => e.OpenId == openId).FirstOrDefault();
            if (expert != null)
            {
                BLL.WX_QA_File bll = new BLL.WX_QA_File();
                var list = bll.GetModelList("Expert='" + expert.Id.ToString() + "' and IsNew=1 and Status=1 and AppId='" + appId + "' and Expert<>'' and Expert<>0");
                return list.Count;
            }
            else {
                return 0;
            }
        }
    }
}