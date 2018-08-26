using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using SfSoft.web.Read.Enums;
using SfSoft.web.Read.Models.Award;

namespace SfSoft.web.QA.Award
{
    public class Integral
    {
        private EnumIntegral enumIntegral;
        private EnumAwardType enumAwardType;
        private EnumComputeMode enumComputeMode;
        private string _openid;
        private List<Model.WX_QA_Award_Detail> _listAward;
        public Integral(string openid, EnumIntegral integral, EnumComputeMode computeMode)
        {
            enumIntegral = integral;
            enumComputeMode = computeMode;
            enumAwardType =EnumAwardType.积分;
            _openid = openid;
            BLL.WX_QA_Award_Detail bllDetail = new BLL.WX_QA_Award_Detail();
            _listAward = bllDetail.GetModelList("openid='" + openid + "' and AwardType="+(int)EnumAwardType.积分);
        }
        /// <summary>
        ///  如果积分达到了限止，将是无效，如果还没有就有效
        /// </summary>
        /// <returns></returns>
        private bool IsValid(AwardModel awardModel)
        {
            int count = 0;
            if (enumComputeMode == EnumComputeMode.按次数计算)
            {
                count = (int)_listAward.Where(e => e.Origin == (int)enumIntegral).Sum(e => e.Award);
            }
            else if (enumComputeMode == EnumComputeMode.按天计算)
            {
                count = (int)_listAward.Where(e => e.Origin == (int)enumIntegral &&  string.Format("{0:yyyy-MM-dd}",e.CreateDate)==string.Format("{0:yyyy-MM-dd}",DateTime.Now)).Sum(e => e.Award);
            }
            if (count < awardModel.Max) {
                return true;
            }
            return false;
        }
        private void UpdateAward(AwardModel awardModel)
        {
            BLL.WX_QA_Award bll = new BLL.WX_QA_Award();
            Model.WX_QA_Award model = bll.GetModel(_openid, (int)EnumAwardType.积分);
            if (model != null)
            {
                model.Earn = (model.Earn ?? 0) + awardModel.Min;
                bll.Update(model);
            }
            else {
                model = new Model.WX_QA_Award();
                //在上传作品时初时化积分
                model.Earn =awardModel.Min;
                model.AwardType = (int)EnumAwardType.积分;
                model.OpenId = _openid;
                bll.Add(model);
            }
        }
        private void UpdateAwardDetail(AwardModel awardModel)
        {
            BLL.WX_QA_Award_Detail bll = new BLL.WX_QA_Award_Detail();
            Model.WX_QA_Award_Detail model = new Model.WX_QA_Award_Detail();
            model.Award = awardModel.Min;
            model.AwardType = (int)EnumAwardType.积分;
            model.CreateDate = DateTime.Now;
            model.OpenId = _openid;
            model.Origin =  (int)enumIntegral;
            model.OriginRemark = enumIntegral.ToString() + "获取" + EnumAwardType.积分.ToString();
            bll.Add(model);
        }
        public void RunUpdateAward()
        {
            try
            {
                AwardModel awardModel = AwardHelp.GetIntegral(enumIntegral);
                if (IsValid(awardModel) == true)
                {
                    UpdateAward(awardModel);
                    UpdateAwardDetail(awardModel);
                }
            }
            catch (Exception ex) { 
                
            }
        }
    }
}