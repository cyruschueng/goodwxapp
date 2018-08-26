using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace SfSoft.web.game.qzsf
{
    public class Integral
    {
        private EnumIntegral enumIntegral;
        private EnumAwardType enumAwardType;
        private EnumComputeMode enumComputeMode;
        private string _openid;
        private List<Model.WX_Doublenovember_Award_Detail> _listAward;
        public Integral(string openid, EnumIntegral integral, EnumComputeMode computeMode)
        {
            enumIntegral = integral;
            enumComputeMode = computeMode;
            enumAwardType =EnumAwardType.积分;
            _openid = openid;
            BLL.WX_Doublenovember_Award_Detail bllDetail = new BLL.WX_Doublenovember_Award_Detail();
            _listAward = bllDetail.GetModelList("openid='" + openid + "' and AwardType="+(int)EnumAwardType.积分);
            if (integral == EnumIntegral.上传作品) {
                Init();
            }
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
            BLL.WX_Doublenovember_Award bll = new BLL.WX_Doublenovember_Award();
            Model.WX_Doublenovember_Award model = bll.GetModel(_openid);
            if (model != null)
            {
                if (model.IntegralEarn != null)
                {
                    model.IntegralEarn += awardModel.Min;
                }
                else
                {
                    model.IntegralEarn = awardModel.Min;
                }
                bll.Update(model);
            }
            else {
                model = new Model.WX_Doublenovember_Award();
                //在上传作品时初时化积分
                int score = Init();
                model.IntegralEarn = score + awardModel.Min;
                model.IsInit = 1;
                model.OpenId = _openid;
                bll.Add(model);
            }
        }
        private void UpdateAwardDetail(AwardModel awardModel)
        {
            BLL.WX_Doublenovember_Award_Detail bll = new BLL.WX_Doublenovember_Award_Detail();
            Model.WX_Doublenovember_Award_Detail model = new Model.WX_Doublenovember_Award_Detail();
            model.Award = awardModel.Min;
            model.AwardType = (int)EnumAwardType.积分;
            model.CreateDate = DateTime.Now;
            model.OpenId = _openid;
            model.Origin =  (int)enumIntegral;
            model.Remark = enumIntegral.ToString() + "获取" + EnumAwardType.积分.ToString();
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
        /// <summary>
        /// 初始积分
        /// </summary>
        /// <returns></returns>
        private int Init()
        {
            try
            {
                BLL.WX_Doublenovember_File bll = new BLL.WX_Doublenovember_File();
                List<Model.WX_Doublenovember_File> list = bll.GetModelList("openid='" + _openid + "'");
                int count = list.Count() + 1;
                return count * 10;
            }
            catch (Exception ex)
            {
                return 0;
            }
        }
    }
}