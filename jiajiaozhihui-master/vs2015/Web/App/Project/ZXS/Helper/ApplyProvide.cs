using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace SfSoft.web.ZXS.Helper
{
    public class ApplyProvide
    {
        public static Models.Apply.ApplyInfo Add(Models.Apply.ApplyInfo entity)
        {
            SfSoft.Model.WX_ZXS_Apply model = new SfSoft.Model.WX_ZXS_Apply();
            SfSoft.BLL.WX_ZXS_Apply bll = new SfSoft.BLL.WX_ZXS_Apply();
            if (entity != null)
            {
                if (!bll.Exists(entity.AppId, entity.OpenId))
                {
                    model.AppId = entity.AppId;
                    model.ApplyType = entity.ApplyType;
                    model.CurrTask = entity.CurrTask;
                    model.EndDate = entity.EndDate;
                    model.Feedback = entity.Feedback;
                    model.LoseMargin = entity.LoseMargin;
                    model.Margin = entity.Margin;
                    model.OpenId = entity.OpenId;
                    model.Reason = entity.Reason;
                    model.StartDate = entity.StartDate;
                    model.State = 0;
                    model.ThemeNumber = entity.ThemeNumber;
                    model.UnOpenNumber = entity.UnOpenNumber;
                    bll.Add(model);
                    AddWeekApplyDetail(entity.WeekApplyInfo);
                    AddMonthApplyDetail(entity.MonthApplyInfo);
                    UpdatePlay(entity.AppId, entity.OpenId, entity.ApplyType);
                    return entity;
                }
            }
            return new Models.Apply.ApplyInfo();
        }
        private static void AddWeekApplyDetail(Models.Apply.ApplyInfoDetail detail)
        {
            SfSoft.BLL.WX_ZXS_Apply_Detail bll = new SfSoft.BLL.WX_ZXS_Apply_Detail();
            SfSoft.Model.WX_ZXS_Apply_Detail model = new SfSoft.Model.WX_ZXS_Apply_Detail();
            if (detail != null)
            {
                model.AppId = detail.AppId;
                model.OpenId = detail.OpenId;
                model.CheckingNumber = detail.CheckingNumber;
                model.CompletedNumber = detail.CompletedNumber;
                model.FailNumber = detail.FailNumber;
                model.SuccessNumber = detail.SuccessNumber;
                bll.Add(model);
            }
        }
        private static void AddMonthApplyDetail(Models.Apply.ApplyInfoDetail detail)
        {
            SfSoft.BLL.WX_ZXS_Apply_Detail bll = new SfSoft.BLL.WX_ZXS_Apply_Detail();
            SfSoft.Model.WX_ZXS_Apply_Detail model = new SfSoft.Model.WX_ZXS_Apply_Detail();
            if (detail != null)
            {
                model.AppId = detail.AppId;
                model.OpenId = detail.OpenId;
                model.CheckingNumber = detail.CheckingNumber;
                model.CompletedNumber = detail.CompletedNumber;
                model.FailNumber = detail.FailNumber;
                model.SuccessNumber = detail.SuccessNumber;
                bll.Add(model);
            }
        }
        private static bool IsExist(string appId, string openId)
        {
            SfSoft.Model.WX_ZXS_Apply model = new SfSoft.Model.WX_ZXS_Apply();
            SfSoft.BLL.WX_ZXS_Apply bll = new SfSoft.BLL.WX_ZXS_Apply();
            return bll.Exists(appId, openId);
        }
        private static void UpdatePlay(string appId, string openId, int applyType)
        {
            SfSoft.BLL.WX_ZXS_Players bll = new SfSoft.BLL.WX_ZXS_Players();
            SfSoft.Model.WX_ZXS_Players model = bll.GetModel(appId, openId);
            if (model != null)
            {
                if (applyType == 0)
                {
                    model.State = 3;
                }
                else if (applyType == 1)
                {
                    model.State = 2;
                }
                bll.Update(model);
            }
        }
    }
}