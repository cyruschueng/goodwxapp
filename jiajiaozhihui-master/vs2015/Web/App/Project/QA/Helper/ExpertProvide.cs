using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Data;

namespace SfSoft.web.QA.Helper
{
    public class ExpertProvide
    {
        /// <summary>
        /// 获取专家OpenId 必须不为空
        /// </summary>
        /// <returns></returns>
        public static List<Models.Expert.ExpertInfo> GetExperts()
        {
            var website = App.Helper.WxBaseConfig.WebSite.EndsWith("/") == true ? App.Helper.WxBaseConfig.WebSite.Substring(0, App.Helper.WxBaseConfig.WebSite.Length - 1) : App.Helper.WxBaseConfig.WebSite;
            BLL.WX_JJZH_Expert bll = new BLL.WX_JJZH_Expert();
            var list = bll.GetModelList("IsAct=1 and IsRest=0 and IsCheck=1 and isnull(OpenId,'')<>'' ");
            List<Models.Expert.ExpertInfo> experts = new List<Models.Expert.ExpertInfo>();
            foreach (var m in list) {
                experts.Add(new Models.Expert.ExpertInfo()
                {
                    Id=m.Id,
                    HeadImgUrl = m.HeadImgUrl,
                    ImgUrl =website+m.ImgUrl,
                    Intro = m.Intro,
                    NickName = m.NickName,
                    OpenId = m.OpenId,
                    Sex = m.Sex,
                    TelePhone = m.TelePhone,
                    Uname = m.UName,
                    ExpertType=m.ExpertType
                });
            }
            return experts;
        }
        /// <summary>
        /// 获取专家OpenId可以为空
        /// </summary>
        /// <returns></returns>
        public static List<Models.Expert.ExpertInfo> GetAllExperts()
        {
            var website = App.Helper.WxBaseConfig.WebSite.EndsWith("/") == true ? App.Helper.WxBaseConfig.WebSite.Substring(0, App.Helper.WxBaseConfig.WebSite.Length - 1) : App.Helper.WxBaseConfig.WebSite;
            BLL.WX_JJZH_Expert bll = new BLL.WX_JJZH_Expert();
            var list = bll.GetModelList("IsAct=1 and IsRest=0 and IsCheck=1 ");
            List<Models.Expert.ExpertInfo> experts = new List<Models.Expert.ExpertInfo>();
            foreach (var m in list)
            {
                experts.Add(new Models.Expert.ExpertInfo()
                {
                    Id = m.Id,
                    HeadImgUrl = m.HeadImgUrl,
                    ImgUrl = website + m.ImgUrl,
                    Intro = m.Intro,
                    NickName = m.NickName,
                    OpenId = m.OpenId,
                    Sex = m.Sex,
                    TelePhone = m.TelePhone,
                    Uname = m.UName,
                    ExpertType = m.ExpertType
                });
            }
            return experts;
        }

        public static List<Model.WX_JJZH_Expert> GetExpertList()
        {
            BLL.WX_JJZH_Expert bll = new BLL.WX_JJZH_Expert();
            return bll.GetModelList("IsAct=1 and IsRest=0 and IsCheck=1 and isnull(OpenId,'')<>'' ");
        }
        public static List<Models.Expert.ExpertInfo> GetExperts(string where, int pageSize, int pageIndex, string orderBy)
        {
            var website = App.Helper.WxBaseConfig.WebSite.EndsWith("/") == true ? App.Helper.WxBaseConfig.WebSite.Substring(0, App.Helper.WxBaseConfig.WebSite.Length - 1) : App.Helper.WxBaseConfig.WebSite;
            BLL.WX_JJZH_Expert bll = new BLL.WX_JJZH_Expert();
            DataSet ds= bll.GetList(pageSize, pageIndex, orderBy, where);
            List<Models.Expert.ExpertInfo> experts = new List<Models.Expert.ExpertInfo>();
            foreach (DataRow dr in ds.Tables[0].Rows) {
                experts.Add(new Models.Expert.ExpertInfo()
                {
                    Id = dr.Field<int>("Id"),
                    HeadImgUrl = dr.Field<string>("HeadImgUrl"),
                    ImgUrl =website+ dr.Field<string>("ImgUrl"),
                    Intro =dr.Field<string>("Intro"),
                    NickName =dr.Field<string>("NickName"),
                    OpenId =dr.Field<string>("OpenId"),
                    Sex =dr.Field<string>("Sex"),
                    TelePhone =dr.Field<string>("TelePhone"),
                    Uname =dr.Field<string>("UName"),
                    ExpertType=dr.Field<int>("ExpertType"),
                    ExpertId=dr.Field<int?>("Id")
                });
            }
            return experts;
        }
       /// <summary>
       /// 
       /// </summary>
        /// <param name="id">专家Id</param>
       /// <param name="openId">当前用户</param>
       /// <returns></returns>
        public static Models.Expert.Detail GetExpertDetail(string id,string openId,string appId,int pageIndex,int pageSize)
        {
            var website = App.Helper.WxBaseConfig.WebSite.EndsWith("/") == true ? App.Helper.WxBaseConfig.WebSite.Substring(0, App.Helper.WxBaseConfig.WebSite.Length - 1) : App.Helper.WxBaseConfig.WebSite;
            string nickName = "", headImgUrl = "";
            var expertList = GetExpertList();
            var mode = expertList.Find(e => e.Id == int.Parse(id));

            Models.Expert.Detail detail = new Models.Expert.Detail();
            detail.UserData = new Models.Expert.UserInfo()
            {
                IsLike = IsLiked(openId,int.Parse(id),appId),
                OpenId=openId
            };
            
            detail.ExpertId = id;
            detail.ExpertType = mode.ExpertType ?? 0;
            detail.HeadImgUrl = mode.HeadImgUrl;
            detail.UName = mode.UName;
            detail.ImgUrl =website+mode.ImgUrl;
            detail.Intro = mode.Intro;
            detail.LikeNumber = mode.LikeNumber??0;
            detail.NickName = mode.NickName;
            detail.Sex = mode.Sex;
            detail.IsMyExpert = IsMyExpert(openId, id);
            detail.Qus = GetQuestions(expertList, id.ToString(), openId, pageIndex,pageSize);
            detail.OpenId = mode.OpenId;

            return detail;
        }
        private static Models.Expert.PageData GetQuestions(List<Model.WX_JJZH_Expert> expertList, string expertId,string openId,int pageIndex,int pageSize)
        {
            Models.Expert.PageData qus = new Models.Expert.PageData();
            var expert=expertList.Find(e=>e.Id==int.Parse(expertId));
            
            BLL.WX_QA_Comment bll = new BLL.WX_QA_Comment();
            var list = bll.GetModelList("OpenId='" + expert.OpenId + "' or ExpertId=" + expert.Id.ToString());

            var qs = (from c in list
                      where c.ReadFileId !=null
                      orderby c.CreateDate descending
                     select c.ReadFileId).Distinct();
            qus.PageTotal = App.Helper.Common.TotalPage(qs.Count(), pageSize);
            qs= qs.Skip((pageIndex - 1) * pageSize).Take(pageSize);

            List<Models.Expert.Questions> qlist = new List<Models.Expert.Questions>();

            BLL.WX_QA_File file = new BLL.WX_QA_File();
            foreach (var q in qs) {
                var m=file.GetModel(q.Value);
                if (m == null)
                    m = new Model.WX_QA_File();
                if (m.Status == 0)
                    m = new Model.WX_QA_File();
                var answers = bll.GetModelList("ReadFileId="+q.Value);
                var hotAns = GetHotAnsData(answers, expertList,int.Parse(expertId),openId);
                var ans = GetAns(answers, expertList, hotAns.Id);
                
                qlist.Add(new Models.Expert.Questions()
                {
                    Ans=ans,
                    CreateDate=m.CreateDate,
                    HotAns=hotAns,
                    NickName=GetNickName(m.OpenId),
                    Question=m.Comment,
                    Questioner=m.OpenId
                });
            }
            qus.QuestionsList = qlist;
            return qus;
        }
        private static List<Models.Expert.Answers> GetAns(List<Model.WX_QA_Comment> list, List<Model.WX_JJZH_Expert> experts,int hotAnsId)
        {
            List<Models.Expert.Answers> ansList = new List<Models.Expert.Answers>();
            var answers= list.Where(e => e.Id != hotAnsId);
            var website = App.Helper.WxBaseConfig.WebSite.EndsWith("/") == true ? App.Helper.WxBaseConfig.WebSite.Substring(0, App.Helper.WxBaseConfig.WebSite.Length - 1) : App.Helper.WxBaseConfig.WebSite;
            foreach (var m in answers) {
                string sex = "", headImgUrl = "", nickName = "", expertId="",uname="",imgUrl="";
                if ((m.ExpertType??0) != 0) {
                    var expert = experts.Find(e => e.OpenId== m.OpenId);
                    if (expert == null) {
                        expert = new Model.WX_JJZH_Expert();
                    }
                    sex = expert.Sex;
                    headImgUrl =expert.HeadImgUrl;
                    imgUrl = website + expert.ImgUrl;
                    uname = expert.UName;
                    nickName = expert.NickName;
                    expertId = (m.ExpertId ?? 0).ToString();
                }
                else {
                    sex = m.Sex;
                    headImgUrl = m.HeadImgUrl;
                    nickName = m.NickName;
                    expertId = "0";
                    uname = m.NickName;
                    imgUrl = m.HeadImgUrl;
                }
                
                ansList.Add(new Models.Expert.Answers()
                {
                    Sex = sex,
                    Answer = m.Details,
                    AnswerDate = m.CreateDate.Value,
                    ExpertId = expertId,
                    ExpertType = m.ExpertType??0,
                    HeadImgUrl = headImgUrl,
                    Id = m.Id,
                    NickName = nickName,
                    UName=uname,
                    ImgUrl=imgUrl
                });
            }
            return ansList;
        }
        private static Models.Expert.Answers GetHotAnsData(List<Model.WX_QA_Comment> answers, List<Model.WX_JJZH_Expert> experts,int expertId,string openId)
        {
            var website = App.Helper.WxBaseConfig.WebSite.EndsWith("/") == true ? App.Helper.WxBaseConfig.WebSite.Substring(0, App.Helper.WxBaseConfig.WebSite.Length - 1) : App.Helper.WxBaseConfig.WebSite;
            var expert = experts.Find(e => e.Id == expertId);

            var answer = answers.Where(e => e.OpenId == expert.OpenId).FirstOrDefault();
            if (answer == null)
                answer = new Model.WX_QA_Comment();

            string sex = "", headImgUrl = "", nickName = "", uname = "", imgUrl = "";
           

            if ((answer.ExpertType ?? 0) != 0)
            {
                sex = expert.Sex;
                headImgUrl = expert.HeadImgUrl;
                imgUrl = website + expert.ImgUrl;
                uname = expert.UName;
                nickName = expert.NickName;
            }
            else {
                sex = answer.Sex;
                headImgUrl = answer.HeadImgUrl;
                imgUrl =  answer.HeadImgUrl;
                uname = answer.NickName;
                nickName = answer.NickName;
            }
            var hotAns = new Models.Expert.Answers()
            {
                Sex = sex,
                Answer = answer.Details,
                AnswerDate = answer.CreateDate??null,
                ExpertId = (answer.ExpertId ?? 0).ToString(),
                ExpertType = answer.ExpertType??0,
                HeadImgUrl =headImgUrl,
                ImgUrl=imgUrl,
                Id = answer.Id,
                NickName = nickName,
                UName=uname
            };
            return hotAns;
        }
        

        private static bool IsLiked(string openId, int expertId,string appId)
        {
            BLL.WX_QA_ExpertLike bll = new BLL.WX_QA_ExpertLike();
           var list= bll.GetModelList("AppId='" + appId + "' and ExpertId=" + expertId.ToString() + " and OpenId='" + openId + "'");
           return list.Count > 0 ? true : false;
        }

        public static bool IsExpertLikeExist(string appId, string openId, int ExpertId)
        {
            SfSoft.BLL.WX_QA_ExpertLike bll = new SfSoft.BLL.WX_QA_ExpertLike();
            var count = bll.GetModelList("AppId='" + appId + "' and OpenId='" + openId + "' and ExpertId=" + ExpertId).Count;
            return count > 0 ? true : false;
        }
        public static void AddExpertLike(SfSoft.Model.WX_QA_ExpertLike entity)
        {
            SfSoft.BLL.WX_QA_ExpertLike bll = new SfSoft.BLL.WX_QA_ExpertLike();
            SfSoft.Model.WX_QA_ExpertLike model = new SfSoft.Model.WX_QA_ExpertLike();
            model.AppId = entity.AppId;
            model.CreateDate = DateTime.Now;
            model.HeadImgUrl = entity.HeadImgUrl;
            model.NickName = entity.NickName;
            model.OpenId = entity.OpenId;
            model.ExpertId = entity.ExpertId;
            bll.Add(model);
            UpdateExpertLikeNumber(entity.ExpertId ?? 0);
        }
        private static void UpdateExpertLikeNumber(int expertId)
        {
            SfSoft.BLL.WX_JJZH_Expert bll = new SfSoft.BLL.WX_JJZH_Expert();
            SfSoft.Model.WX_JJZH_Expert model = bll.GetModel(expertId);
            if (model != null)
            {
                model.LikeNumber = (model.LikeNumber ?? 0) + 1;
                bll.Update(model);
            }
        }
        private static string GetNickName(string openId)
        {
            BLL.WX_UserInfo bll = new BLL.WX_UserInfo();
            var model= bll.GetModel(openId);
            if (model != null) {
                return model.NickName;
            }
            return "";
        }
        public static void UpdateExpert(string openId, int isRest)
        {
            BLL.WX_JJZH_Expert bll = new BLL.WX_JJZH_Expert();
            var model = bll.GetModelList("openId='" + openId + "'").FirstOrDefault();
            if (model != null) {
                model.IsRest = isRest;
                bll.Update(model);
            }
        }
        private static int IsMyExpert(string openId,string expertId)
        {
            BLL.WX_QA_User bll = new BLL.WX_QA_User();
            var list= bll.GetModelList("OpenId='"+openId+"' and ExpertId="+expertId);
            return list.Count > 0 ? 1 : 0;
        }
        public static void SetMyExpert(string appId, string openId, string expertId, int expertType)
        {
            BLL.WX_QA_User bll = new BLL.WX_QA_User();
            var model = bll.GetModel(appId, openId);
            if (model != null) {
                model.ExpertId = expertId;
                model.ExpertType = expertType;
                bll.Update(model);
            }
        }
    }
}