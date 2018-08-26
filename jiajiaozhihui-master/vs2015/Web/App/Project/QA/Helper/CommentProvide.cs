using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace SfSoft.web.QA.Helper
{
    public class CommentProvide
    {
        public static void Add(SfSoft.Model.WX_QA_Comment entity)
        {
            SfSoft.BLL.WX_QA_Comment bll = new SfSoft.BLL.WX_QA_Comment();
            SfSoft.Model.WX_QA_Comment model = new SfSoft.Model.WX_QA_Comment();
            model.AppId = entity.AppId;
            model.HeadImgUrl = entity.HeadImgUrl;
            model.NickName = entity.NickName;
            model.OpenId = entity.OpenId;
            model.ReadFileId = entity.ReadFileId;
            model.Details = entity.Details;
            model.Sex = entity.Sex;
            model.ExpertType = entity.ExpertType;
            model.ExpertId = entity.ExpertId;
            model.CreateDate = DateTime.Now;
            bll.Add(model);
            UpdateFile(entity.ReadFileId ?? 0,entity.OpenId);
            
            string sn = string.Format("{0:yyyyMMdd}", model.CreateDate) + model.Id.ToString();

            Action<string, string, string> msg = SendMessage;
            msg.BeginInvoke((model.ReadFileId ?? 0).ToString(), sn, model.OpenId, null, null);
            
        }
        private static void UpdateFile(int fileId,string openId)
        {
            var expert = GetExpert(openId);
            SfSoft.BLL.WX_QA_File bll = new SfSoft.BLL.WX_QA_File();
            SfSoft.Model.WX_QA_File model = bll.GetModel(fileId);
            if (model != null)
            {
                model.CommentNumber = (model.CommentNumber ?? 0) + 1;
                if (model.OpenId == openId) {
                    model.IsNew = 1;
                }
                else if (model.Expert == expert.Id.ToString())
                {
                    model.IsNew = 0;
                }
                bll.Update(model);
            }
        }
        private static Model.WX_JJZH_Expert GetExpert(string openId)
        {
            BLL.WX_JJZH_Expert bll = new BLL.WX_JJZH_Expert();
            var model = bll.GetModelList("openId='" + openId + "'").FirstOrDefault();
            if (model != null)
            {
                return model;
            }
            else
            {
                return new Model.WX_JJZH_Expert();
            }
        }
        private static Model.WX_JJZH_Expert GetExpertByExperId(string expert)
        {
            if (string.IsNullOrEmpty(expert))
                return new Model.WX_JJZH_Expert();
            BLL.WX_JJZH_Expert bll = new BLL.WX_JJZH_Expert();
            var model = bll.GetModel(int.Parse(expert));
            if (model == null)
            {
                return new Model.WX_JJZH_Expert();
            }
            return model;
        }
        /// <summary>
        /// 提问有没有指定专家
        /// </summary>
        /// <param name="fileId"></param>
        /// <returns></returns>
        private static Model.WX_QA_File GetFile(string fileId)
        {
            BLL.WX_QA_File bll = new BLL.WX_QA_File();
            var model = bll.GetModel(int.Parse(fileId));
            if (model != null) {
                return model;
            }
            return new Model.WX_QA_File();
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
            else
            {
                openId = GetExpert(expertId).OpenId;
                if (string.IsNullOrEmpty(openId))
                {
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
            if (expert != null && expert[0] != null)
            {
                return expert[0].OpenId;
            }
            return "";
        }
        private static bool IsReceiveMesage(string openId)
        {
            BLL.WX_QA_User bll = new BLL.WX_QA_User();
            var model = bll.GetModel("app001", openId);
            if (model != null)
            {
                return (model.IsReceiveMesage ?? 0) == 0 ? false : true;
            }
            return false;
        }
        /// <summary>
        /// 
        /// </summary>
        /// <param name="fileId"></param>
        /// <param name="sn"></param>
        /// <param name="openId">回复者</param>
        private static void SendMessage(string fileId, string sn,string openId)
        {
            var file= GetFile(fileId);
            if (string.IsNullOrEmpty(file.Expert) || file.Expert.Trim() == "0") return;
            string expertOpenId = GetExpertByExperId(file.Expert).OpenId;
            if (expertOpenId != openId) return;
            if (string.IsNullOrEmpty(file.OpenId)) return;
            bool isRMsg = IsReceiveMesage(file.OpenId);
            if (isRMsg == false) return;
            try
            {
                string url = App.Helper.WxBaseConfig.QuestionAnsweringRedirectBaseInfoUrl + "?redirect_url="+App.Url.QAUrl.ClientUrl+"app/index.html&state={\"appid\":\"app001\",\"hash\":\"empty\",\"fileId\":\"" + fileId + "\",\"path\":\"answer\"}";
                Senparc.Weixin.MP.AdvancedAPIs.TemplateMessage.TempleteModel m = new Senparc.Weixin.MP.AdvancedAPIs.TemplateMessage.TempleteModel();
                var data = new
                {
                    serviceInfo = new Senparc.Weixin.MP.AdvancedAPIs.TemplateMessage.TemplateDataItem("您好，您的咨询单" + sn + "有新的回复。"),
                    serviceType = new Senparc.Weixin.MP.AdvancedAPIs.TemplateMessage.TemplateDataItem("家教问答"),
                    serviceStatus = new Senparc.Weixin.MP.AdvancedAPIs.TemplateMessage.TemplateDataItem("已回复"),
                    time = new Senparc.Weixin.MP.AdvancedAPIs.TemplateMessage.TemplateDataItem(string.Format("{0:yyyy-MM-dd}", DateTime.Now)),
                    remark = new Senparc.Weixin.MP.AdvancedAPIs.TemplateMessage.TemplateDataItem("详细处理结果请点击 详情 查看")
                };
                m.data = data;
                m.template_id = "oO7xIYFYB0HHk2QoiR0WOIwJsC3MWqvmwFHfAiMmgn4"; //TM00277
                m.topcolor = "#ff0000";
                m.touser = file.OpenId;
                m.url = url;
                var accesstoken = WeiXinServer.AccessTokenServer.GetAccessToken(App.Helper.WxBaseConfig.AppID, App.Helper.WxBaseConfig.AppSecret);
                Senparc.Weixin.MP.AdvancedAPIs.TemplateApi.SendTemplateMessage(accesstoken, file.OpenId, "oO7xIYFYB0HHk2QoiR0WOIwJsC3MWqvmwFHfAiMmgn4", url, data);
            }
            catch (Exception ex)
            {

            }
        }
    }
}