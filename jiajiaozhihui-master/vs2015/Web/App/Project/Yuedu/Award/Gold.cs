using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Data;
using SfSoft.web.Read.Enums;
using SfSoft.web.Read.Models.Award;

namespace SfSoft.web.Yuedu.Award
{
    public class Gold
    {
        private EnumGold enumGold;
        private EnumAwardType enumAwardType;
        private EnumComputeMode enumComputeMode;
        private string _openid;
        private List<Model.WX_Yuedu_Award_Detail> _listAward;
        public Gold(string openid, EnumGold gold,EnumComputeMode computeMode)
        {
            enumGold = gold;
            enumComputeMode = computeMode;
            enumAwardType = EnumAwardType.金币;
            _openid = openid;
            BLL.WX_Yuedu_Award_Detail bllDetail = new BLL.WX_Yuedu_Award_Detail();
            _listAward = bllDetail.GetModelList("openid='" + openid + "' and AwardType="+(int)EnumAwardType.金币);
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
                count = (int)_listAward.Where(e => e.Origin == (int)enumGold).Sum(e => e.Award);
            }
            else if (enumComputeMode == EnumComputeMode.按天计算)
            {
                count = (int)_listAward.Where(e => e.Origin == (int)enumGold && string.Format("{0:yyyy-MM-dd}", e.CreateDate) == string.Format("{0:yyyy-MM-dd}", DateTime.Now)).Sum(e => e.Award);
            }
            if (count < awardModel.Max) {
                return true;
            }
            return false;
        }
        private void UpdateAward(AwardModel awardModel)
        {
            BLL.WX_Yuedu_Award bll = new BLL.WX_Yuedu_Award();
            Model.WX_Yuedu_Award model = bll.GetModel(_openid,(int)EnumAwardType.金币);
            if (model != null)
            {
                model.Earn = (model.Earn ?? 0) + awardModel.Min;
                bll.Update(model);
            }
            else {
                model = new Model.WX_Yuedu_Award();
                model.Earn = awardModel.Min;
                model.AwardType = (int)EnumAwardType.金币;
                model.OpenId = _openid;
                bll.Add(model);
            }
        }
        private void UpdateAwardDetail(AwardModel awardModel)
        {
            BLL.WX_Yuedu_Award_Detail bll = new BLL.WX_Yuedu_Award_Detail();
            Model.WX_Yuedu_Award_Detail model = new Model.WX_Yuedu_Award_Detail();
            model.Award = awardModel.Min;
            model.AwardType =(int)EnumAwardType.金币;
            model.CreateDate = DateTime.Now;
            model.OpenId = _openid;
            model.Origin = (int)enumGold;
            model.OriginRemark = enumGold.ToString() + "获取" + EnumAwardType.金币.ToString();
            bll.Add(model);
        }
        public void RunUpdateAward()
        {
            try
            {
                AwardModel awardModel = AwardHelp.GetGold(enumGold);
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