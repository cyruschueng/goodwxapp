using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace SfSoft.web.QA.Helper
{
    public class QuestionProvide
    {
        public static int AddFile(Models.Question.QuestionInfo info)
        {
            BLL.WX_QA_File bll = new BLL.WX_QA_File();
            Model.WX_QA_File model = new Model.WX_QA_File();
            var expert = GetExpert(info.Expert);
            model.AppId = info.AppId;
            model.Comment = info.Comment;
            model.CreateDate = DateTime.Now;
            model.OpenId = info.OpenId;
            model.Status = 1;
            model.Tag = info.Tag;
            model.Title = info.Title;
            model.IsNew = 1;
            model.ExpertType = expert.ExpertType;
            model.Expert = expert.Id.ToString();
            /*
            if(expert.ExpertType==1){
                model.Expert=expert.Id.ToString();
                model.ExpertType=1;
            }else if(expert.ExpertType==2){
                model.Expert=expert.OpenId;
                model.ExpertType=2;
            }else{
                model.Expert="";
                model.ExpertType=0;
            }
             * */
            int row= bll.Add(model);
            string sn = string.Format("{0:yyyyMMdd}", model.CreateDate) + row.ToString();

            Action<string,string, string> c = SendMessage;
            c.BeginInvoke(expert.Id.ToString(),sn, row.ToString(), null, null);

            Action<string, string, string, int> m = SetMyExpert;
            m.BeginInvoke(info.AppId, info.OpenId, (expert.Id).ToString(), expert.ExpertType ?? 0, null, null);

            /*获取积分*/
            Award.AwardItem awardItem = new Award.AwardItem(info.OpenId);
            awardItem.AwardByUploadPortfolios();

            return row;
        }
        private static Model.WX_JJZH_Expert GetExpert(string  expert)
        {
            if (string.IsNullOrEmpty(expert))
                return new Model.WX_JJZH_Expert();
            BLL.WX_JJZH_Expert bll = new BLL.WX_JJZH_Expert();
            var model= bll.GetModel(int.Parse(expert));
            if (model == null) {
                return new Model.WX_JJZH_Expert();
            }
            return model;
        }
        /// <summary>
        /// 获取接收消息openid 
        /// </summary>
        /// <param name="expertId"></param>
        /// <returns></returns>
        private static string GetMessageOpen(string expertId)
        {
            string openId = "";
            if (string.IsNullOrEmpty(expertId))
            {
                openId = GetDefaultOpenId();
            }
            else {
                openId = GetExpert(expertId).OpenId;
                if (string.IsNullOrEmpty(openId)) {
                    openId = GetDefaultOpenId();
                }
            }
            return openId;
        }
        /// <summary>
        /// 默认接收消息openid
        /// </summary>
        /// <returns></returns>
        private static string GetDefaultOpenId()
        {
            BLL.WX_JJZH_Expert bll = new BLL.WX_JJZH_Expert();
            var expert = bll.GetModelList("IsDefault=1");
            if (expert != null && expert[0] != null) {
                return expert[0].OpenId;
            }
            return "";
        }
        private static bool IsReceiveMesage(string openId)
        {
            BLL.WX_QA_User bll = new BLL.WX_QA_User();
            var model= bll.GetModel("app001", openId);
            if (model != null) {
                return (model.IsReceiveMesage ?? 0) == 0 ? false : true;
            }
            return false;
        }
        private static void SendMessage(string expertId ,string sn,string fileId)
        {
            
            string openId = GetMessageOpen(expertId);
            if (string.IsNullOrEmpty(openId)) return;
            bool isRMsg = IsReceiveMesage(openId);
            if (isRMsg == false) return;
            try
            {
                string url = App.Helper.WxBaseConfig.QuestionAnsweringRedirectBaseInfoUrl + "?redirect_url="+App.Url.QAUrl.ClientUrl+"app/index.html&state={\"appid\":\"app001\",\"hash\":\"empty\",\"fileId\":\"" + fileId + "\",\"path\":\"answer\"}";
                Senparc.Weixin.MP.AdvancedAPIs.TemplateMessage.TempleteModel m = new Senparc.Weixin.MP.AdvancedAPIs.TemplateMessage.TempleteModel();
                var data = new
                {
                    serviceInfo = new Senparc.Weixin.MP.AdvancedAPIs.TemplateMessage.TemplateDataItem("您有新的家长咨询单" + sn + "，请回复。"),
                    serviceType = new Senparc.Weixin.MP.AdvancedAPIs.TemplateMessage.TemplateDataItem("家教问答"),
                    serviceStatus = new Senparc.Weixin.MP.AdvancedAPIs.TemplateMessage.TemplateDataItem("等回复"),
                    time = new Senparc.Weixin.MP.AdvancedAPIs.TemplateMessage.TemplateDataItem(string.Format("{0:yyyy-MM-dd}", DateTime.Now)),
                    remark = new Senparc.Weixin.MP.AdvancedAPIs.TemplateMessage.TemplateDataItem("详细处理结果请点击 详情 查看")
                };
                m.data = data;
                m.template_id = "oO7xIYFYB0HHk2QoiR0WOIwJsC3MWqvmwFHfAiMmgn4"; //TM00277
                m.topcolor = "#ff0000";
                m.touser = openId;
                m.url = url;
                var accesstoken = WeiXinServer.AccessTokenServer.GetAccessToken(App.Helper.WxBaseConfig.AppID, App.Helper.WxBaseConfig.AppSecret);
                Senparc.Weixin.MP.AdvancedAPIs.TemplateApi.SendTemplateMessage(accesstoken, openId, "oO7xIYFYB0HHk2QoiR0WOIwJsC3MWqvmwFHfAiMmgn4", url, data);
            }
            catch (Exception ex) { 
                
            }
        }
        private static void SetMyExpert(string appId, string openId,string expertId,int expertType)
        {
            BLL.WX_QA_User bll = new BLL.WX_QA_User();
            var model= bll.GetModel(appId, openId);
            if (string.IsNullOrEmpty(model.ExpertId)) {
                model.ExpertId = expertId;
                model.ExpertType = expertType;
                bll.Update(model);
            }
        }
    }
}