using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace SfSoft.web.QA.Helper
{
    public class JoinProvide
    {
        public static int ExpertState(string openId)
        {
            BLL.WX_QA_ExpertApplication bll = new BLL.WX_QA_ExpertApplication();
            var model= bll.GetModelList("OpenId='" + openId + "'").OrderByDescending(e=>e.CreateDate).FirstOrDefault();
            if (model != null)
            {
                return model.IsAct ?? 0;
            }
            else {
                return -1;//未申请过
            }
        }
        public static Models.Join.ExpertInfo AddExpert(Models.Join.ExpertInfo expertInfo)
        {
            try
            {
                Model.WX_QA_ExpertApplication model = new Model.WX_QA_ExpertApplication();
                model.CName = expertInfo.CName;
                model.CreateDate = DateTime.Now;
                model.HeadImgUrl = expertInfo.HeadImgUrl;
                model.IsAct = 0;
                model.NickName = expertInfo.NickName;
                model.OpenId = expertInfo.OpenId;
                model.Sex = expertInfo.Sex;
                BLL.WX_QA_ExpertApplication bll = new BLL.WX_QA_ExpertApplication();
                bll.Add(model);
                return expertInfo;
            }
            catch (Exception ex) {
                return new Models.Join.ExpertInfo();
            }
        }
    }
}