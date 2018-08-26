using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using SfSoft.web.QA.Enums;

namespace SfSoft.web.QA.Helper
{
    public class InitProvide
    {
        public static SfSoft.Model.WX_QA_Info GetQAInfo(string appId)
        {
            SfSoft.BLL.WX_QA_Info bll = new SfSoft.BLL.WX_QA_Info();
            return bll.GetModelList("").AsEnumerable().FirstOrDefault(e => e.AppId == appId);
        }
        public static SfSoft.Model.WX_QA_User GetReadUserInfo(string appId, string openId)
        {
            SfSoft.BLL.WX_QA_User bll = new SfSoft.BLL.WX_QA_User();
            return bll.GetModelList("AppId='" + appId + "' and OpenId='" + openId + "'").AsEnumerable().FirstOrDefault();
        }
        public static SfSoft.Model.WX_UserInfo GetWxUserInfo(string openId)
        {
            SfSoft.BLL.WX_UserInfo bll = new SfSoft.BLL.WX_UserInfo();
            return bll.GetModelList("openId='" + openId + "'").AsEnumerable().FirstOrDefault();
        }
        public static Models.Award.AwardInfo GetAwardList(string openId)
        {
            SfSoft.BLL.WX_QA_Award bll = new BLL.WX_QA_Award();
            Models.Award.AwardInfo awardInfo = new Models.Award.AwardInfo();
            var list = bll.GetModelList("OpenId='" + openId + "'");
            if (list.Count != 0)
            {
                var diamond = list.Find(e => e.AwardType == (int)EnumAwardType.钻石);
                awardInfo.Diamond = diamond == null ? 0 : diamond.Earn ?? 0;

                var gold = list.Find(e => e.AwardType == (int)EnumAwardType.金币);
                awardInfo.Gold = gold == null ? 0 : gold.Earn ?? 0;

                var integral = list.Find(e => e.AwardType == (int)EnumAwardType.积分);
                awardInfo.Integral = integral == null ? 0 : integral.Earn ?? 0;

                Model.WX_QA_Grade grade = GetGradeList(awardInfo.Integral);
                awardInfo.Grade = grade.Grade ?? 1;
                awardInfo.GradeName = grade.GradeName;
            }
            return awardInfo;
        }
        public static void RegistUser(string appId, string openId)
        {
            var wxUser = GetWxUserInfo(openId);
            if (wxUser != null)
            {
                var readUser = GetReadUserInfo(appId, openId);
                if (readUser == null)
                {
                    SfSoft.BLL.WX_QA_User bll = new SfSoft.BLL.WX_QA_User();
                    SfSoft.Model.WX_QA_User model = new Model.WX_QA_User();
                    model.AppId = appId;
                    model.IsAct = 1;
                    model.OpenId = openId;
                    model.RegionDate = DateTime.Now;
                    model.UserType = 1;
                    model.IsReceiveMesage = 1;
                    model.Membership = GetMembership();
                    bll.Add(model);
                }
            }
        }
        public static bool IsAttention(string openId)
        {
            var accessToken=Senparc.Weixin.MP.Containers.AccessTokenContainer.TryGetAccessToken(App.Helper.WxBaseConfig.AppID, App.Helper.WxBaseConfig.AppSecret);
            Senparc.Weixin.MP.AdvancedAPIs.User.UserInfoJson result = Senparc.Weixin.MP.AdvancedAPIs.UserApi.Info(accessToken, openId);
            return result.subscribe == 0 ? false : true;
        }
        public static int GetExpertType(string openId)
        {
            BLL.WX_JJZH_Expert bll = new BLL.WX_JJZH_Expert();
            var list = bll.GetModelList("OpenId='" + openId + "'");
            if (list.Count > 0) {
                return 2;
            }
            return 0;
        }
        public static int GetExpertNumber()
        {
            BLL.WX_JJZH_Expert bll = new BLL.WX_JJZH_Expert();
            var list = bll.GetModelList("IsAct=1 and IsRest=0 and IsCheck=1 and isnull(openId,'')<>''");
            return list.Count;
        }
        public static int GetMemberShipNumber()
        {
            BLL.WX_QA_User bll = new BLL.WX_QA_User();
            var list= bll.GetModelList("IsAct=1 and isnull(IsBlack,0)=0");
            return list.Count;
        }
        private static SfSoft.Model.WX_QA_Grade GetGradeList(int integral)
        {
            SfSoft.BLL.WX_QA_Grade bll = new BLL.WX_QA_Grade();
            var model = bll.GetModelList("" + integral.ToString() + " between LowerLimit and UpperLimit").FirstOrDefault();
            if (model != null)
            {
                return model;
            }
            else
            {
                return new Model.WX_QA_Grade();
            }
        }
        private static string GetMembership()
        {
            string result = "10000";
            BLL.WX_QA_User bll=new BLL.WX_QA_User();
            var list= bll.GetModelList("");
            if(list.Count>0){
                string membership = list.Max(e=>e.Membership);
                var newMemberShip=int.Parse(membership)+1;
                result=newMemberShip.ToString();
            }
            return result;
        }

    }
}