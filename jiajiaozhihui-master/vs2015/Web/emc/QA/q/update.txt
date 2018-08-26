using System;
using System.Data;
using System.Configuration;
using System.Collections;
using System.Web;
using System.Web.Security;
using System.Web.UI;
using System.Web.UI.WebControls;
using System.Web.UI.WebControls.WebParts;
using System.Web.UI.HtmlControls;
using SfSoft.Common;
using SfSoft.SfEmc;
using System.Web.Services;
using System.Collections.Generic;
using System.Text;
namespace SfSoft.web.emc.QA.q
{
    public partial class update : SfSoft.SfEmc.EmcDetailPage
    {
        public string HtmlDetails = "";
        public string HtmlTitle = "";
        private string openId = "";
        private Model.WX_QA_File ModelFile = new Model.WX_QA_File();
        protected void Page_Load(object sender, EventArgs e)
        {
            BLL.WX_QA_File bll = new BLL.WX_QA_File();
            ModelFile = bll.GetModel(int.Parse(Request.Params["ID"]));
            if (!IsPostBack)
            {
                string mode = Request.Params["mode"].ToString();
                string ID = Request.Params["ID"].ToString();
                hfMode.Value = mode;
                hfID.Value = ID;
                hfMID.Value = "emc.qa.info";
                SetTitle();
                DataBind(hfID.Value);
                SetExpert();
            }
        }
        //1.初始化模块ID
        protected override void VtInitMID()
        {
            hfMID.Value = "emc.qa.info";
        }
        protected override void VtInitToolbars()
        {
            VtInitEditToolbars();
        }
        protected override void VtInitBaseToolsBars()
        {
            VtInitBaseDetailToolsBars();
        }
        private void DataBind(string fileId)
        {
            StringBuilder sb = new StringBuilder();
            BLL.WX_QA_Comment bll = new BLL.WX_QA_Comment();
            var list = bll.GetModelList("ReadFileId="+fileId);
            foreach (var m in list) {
                sb.Append("<tr id='c"+m.Id+"'>");
                sb.Append("     <td>");
                sb.Append("         <div style='padding:5px 15px;'>"+m.Details+"</div>");
                sb.Append("         <div style='text-align:left;margin-top:20px; color:#666;'>");
                sb.Append("             <span>"+m.NickName+"</span>");
                sb.Append("             <span style='margin-left:30px;'>" + string.Format("{0:yyyy-MM-dd HH:mm:ss}", m.CreateDate) + "</span>");
                sb.Append("             <span style='margin-left:30px; cursor:pointer' onclick='firm(" + m.Id + ")'>删除</span>");
                sb.Append("         </div>");
                sb.Append("     </td>");
                sb.Append("</tr>");
            }
            HtmlDetails = sb.ToString();
        }

        protected void btnReplay_Click(object sender, EventArgs e)
        {
            
            string strErr = "";
            /*
            if (txtExpert.Text.Trim() == "")
            {
                strErr += "专家不能空";
            }
             * */
            if (txtComment.Text.Trim() == "") {
                strErr += "内容不能空";
            }
            if (strErr != "")
            {
                MessageBox.Show(this, strErr);
                OperateSuccess = false;
                return;
            }
            Replay();
            Message();
            SetTitle();
            DataBind(hfID.Value);
            txtComment.Text = "";
            hfExpert.Value = "";
            txtExpert.Text = "";
        }
        private void SetTitle()
        {
            if (ModelFile != null)
                HtmlTitle = ModelFile.Comment;
        }
        private void Message()
        {
            string openId = ModelFile.OpenId;
            if (openId == "") return;
            try
            {
                string sn = string.Format("{0:yyyyMMdd}", ModelFile.CreateDate) + ModelFile.Id.ToString();
                if (cbMessage.Checked == true)
                {
                    string url = App.Helper.WxBaseConfig.QuestionAnsweringRedirectBaseInfoUrl + "?redirect_url="+App.Url.QAUrl.ClientUrl+"app/index.html&state={\"appid\":\"app001\",\"hash\":\"empty\",\"fileId\":\"" + ModelFile.Id.ToString() + "\",\"path\":\"answer\"}";
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
                    m.touser = openId;
                    m.url = url;
                    var accesstoken = WeiXinServer.AccessTokenServer.GetAccessToken(App.Helper.WxBaseConfig.AppID, App.Helper.WxBaseConfig.AppSecret);
                    Senparc.Weixin.MP.AdvancedAPIs.TemplateApi.SendTemplateMessage(accesstoken, openId, "oO7xIYFYB0HHk2QoiR0WOIwJsC3MWqvmwFHfAiMmgn4", url, data);
                }
            }
            catch (Exception ex) { 
                
            }
        }
        private void Replay()
        {
            BLL.WX_QA_Comment bll = new BLL.WX_QA_Comment();
            Model.WX_QA_Comment model = new Model.WX_QA_Comment();
            model.AppId = "app001";
            model.CreateDate = DateTime.Now;
            model.Details = txtComment.Text;
            Model.WX_JJZH_Expert userInfo = GetExpert();
            model.HeadImgUrl = userInfo.HeadImgUrl;
            model.NickName = userInfo.UName;
            model.OpenId = userInfo.OpenId;
            model.Sex = userInfo.Sex;
            model.ReadFileId =int.Parse( hfID.Value);
            model.ExpertType = 1;
            model.ExpertId = 0;
            model.IsAgent = 1;
            bll.Add(model);
            UpdateCommentNumber(int.Parse(hfID.Value));
            MessageBox.Show(this, "发布成功！");
            OperateSuccess = false;
            return;
        }
        private Model.WX_JJZH_Expert GetExpert()
        {
            BLL.WX_JJZH_Expert bll = new BLL.WX_JJZH_Expert();
            if (hfExpert.Value != "") {
                //string keys = hfExpert.Value.Replace("U-", "");
                //var key = keys.Split('-')[0];
                var key = "";
                if (hfExpert.Value.Contains("@"))
                {
                    key = hfExpert.Value.Split('@')[1];
                }
                else {
                    key = hfExpert.Value;
                }
                var mode = bll.GetModel(int.Parse(key));
                if (mode != null)
                {
                    return mode;
                }
                else {
                    return new Model.WX_JJZH_Expert();
                }
            }else{
                var experts = bll.GetModelList("IsDefault=1");
                if (experts.Count > 0)
                {
                    return experts[0];
                }
                else {
                    return new Model.WX_JJZH_Expert();
                }
            }
        }
        private void UpdateCommentNumber(int fileId)
        {
            BLL.WX_QA_File bll = new BLL.WX_QA_File();
            var model = bll.GetModel(fileId);
            if (model != null) {
                model.CommentNumber = (model.CommentNumber ?? 0) + 1;
                bll.Update(model);
            }
        }
        private void SetExpert()
        {
            BLL.WX_QA_File file = new BLL.WX_QA_File();
            var fileModel = file.GetModel(int.Parse(hfID.Value));
            if (string.IsNullOrEmpty(fileModel.Expert)) return;
            BLL.WX_JJZH_Expert bll = new BLL.WX_JJZH_Expert();
            var model = bll.GetModel(int.Parse(fileModel.Expert));
            if (model != null) {
                hfExpert.Value = model.Id.ToString();
                txtExpert.Text = model.UName;
                hfOpenId.Value = model.OpenId;
            }
        }
    }
}


