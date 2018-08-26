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
namespace SfSoft.web.emc.QA.apply
{
    public partial class update : SfSoft.SfEmc.EmcDetailPage
    {

        Model.WX_QA_ExpertApplication modelArts = new SfSoft.Model.WX_QA_ExpertApplication();
        BLL.WX_QA_ExpertApplication bllArts = new BLL.WX_QA_ExpertApplication();
        protected void Page_Load(object sender, EventArgs e)
        {
            if (!IsPostBack)
            {
                string mode = Request.Params["mode"].ToString();
                string ID = Request.Params["ID"].ToString();

                hfMode.Value = mode;
                hfID.Value = ID;
                hfMID.Value = "emc.qa.apply";
                //修改
                if (hfMode.Value == "update")
                {
                    modelArts = bllArts.GetModel(int.Parse(ID));
                    if (modelArts != null)
                    {
                        this.ShowInfo(modelArts);
                    }
                }
            }
        }
        //1.初始化模块ID
        protected override void VtInitMID()
        {
            hfMID.Value = "emc.qa.apply";
        }
        protected override void VtInitToolbars()
        {
            VtInitEditToolbars();
        }
        protected override void VtInitBaseToolsBars()
        {
            VtInitBaseDetailToolsBars();
        }
        private void ShowInfo(Model.WX_QA_ExpertApplication model)
        {
            lblCName.Text = model.CName;
            lblCreateDate.Text = string.Format("{0:yyyy-MM-dd}", model.CreateDate);
            lblNickName.Text = model.NickName;
            imgHeadImgUrl.ImageUrl = model.HeadImgUrl;
            lblSex.Text = model.Sex;
            if (model.IsAct != null) {
                ddlAct.Items.FindByValue((model.IsAct ?? 0).ToString()).Selected = true;
            }
            //hfExpertId.Value = (model.ExpertId??0).ToString();
            txtExpert.Text = GetExpert(model.ExpertId ?? 0).UName;
        }
        protected override void VtSave()
        {
            string strErr = "";
            strErr = checkform();
            if (strErr != "")
            {
                MessageBox.Show(this, strErr);
                OperateSuccess = false;
                return;
            }
            Model.WX_QA_ExpertApplication model = new Model.WX_QA_ExpertApplication();
            //保存单据
            if (hfMode.Value == "add")
            {
                model = this.SetModelValue(model);
                model.CreateDate = DateTime.Now;
                int index = bllArts.Add(model);
                hfMode.Value = "update";
            }
            else
            {
                string ID = hfID.Value;
                model = bllArts.GetModel(int.Parse(ID));
                model = this.SetModelValue(model);
                bllArts.Update(model);
                if(hfExpertId.Value!=""){

                    UpdateExpert(model.ExpertId??0 , model);
                }
                MessageBox.Show(this, "完成");
            }
        }

        private Model.WX_QA_ExpertApplication SetModelValue(Model.WX_QA_ExpertApplication model)
        {
            if (ddlAct.SelectedItem != null) {
                model.IsAct = int.Parse(ddlAct.SelectedValue);
            }
            if (hfExpertId.Value != "")
            {
                string expert = hfExpertId.Value.Split('@')[1];

                if (!string.IsNullOrEmpty(expert)) {
                    model.ExpertId = int.Parse(expert);    
                }
            }
            return model;
        }
        private Model.WX_JJZH_Expert GetExpert(int expertId)
        {
            if (expertId == null || expertId == 0) return new Model.WX_JJZH_Expert();
            BLL.WX_JJZH_Expert bll = new BLL.WX_JJZH_Expert();
            return bll.GetModel(expertId);
        }
        private void UpdateExpert(int expertId,Model.WX_QA_ExpertApplication entity)
        {
            BLL.WX_JJZH_Expert bll = new BLL.WX_JJZH_Expert();
            var model = bll.GetModel(expertId);
            if (model != null) {
                model.OpenId = entity.OpenId;
                model.NickName = entity.NickName;
                model.HeadImgUrl = entity.HeadImgUrl;
                model.Sex = entity.Sex;
                bll.Update(model);
            }
        }
        private string checkform()
        {
            string strErr = "";
            
            return strErr;
        }
    }
}


