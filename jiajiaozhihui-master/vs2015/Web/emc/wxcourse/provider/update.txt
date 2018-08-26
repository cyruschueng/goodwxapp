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
namespace SfSoft.web.emc.wxcourse.provider
{
    public partial class update : SfSoft.SfEmc.EmcDetailPage
    {

        Model.WX_Course_Provider modelArts = new SfSoft.Model.WX_Course_Provider();
        BLL.WX_Course_Provider bllArts = new BLL.WX_Course_Provider();
        protected void Page_Load(object sender, EventArgs e)
        {
            if (!IsPostBack)
            {
                string mode = Request.Params["mode"].ToString();
                string ID = Request.Params["ID"].ToString();

                hfMode.Value = mode;
                hfID.Value = ID;
                hfMID.Value = "emc.wxcourse.provider";

                //新建
                if (hfMode.Value == "add")
                {
                    ddlIsAct.Items.FindByValue("1").Selected = true;
                }
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
            hfMID.Value = "emc.wxcourse.provider";
        }
        protected override void VtInitToolbars()
        {
            VtInitEditToolbars();
        }
        protected override void VtInitBaseToolsBars()
        {
            VtInitBaseDetailToolsBars();
        }
        private void ShowInfo(Model.WX_Course_Provider model)
        {
            txtAccountNumber.Text = model.AccountNumber;
            txtBeneficiaryName.Text = model.BeneficiaryName;
            txtCollDate.Text = model.CollDate.ToString();
            txtLinkMan.Text = model.LinkMan;
            txtMobile.Text = model.Mobile;
            txtName.Text = model.Name;
            txtQQ.Text = model.QQ;
            txtReceivingBank.Text = model.ReceivingBank;
            txtWeixin.Text = model.Weixin;
            if (model.Type != null && model.Type != "") {
                ddlType.Items.FindByValue(model.Type).Selected = true;
            }
            if (model.IsAct != null) {
                ddlIsAct.Items.FindByValue(model.IsAct.ToString()).Selected = true;
            }
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
            Model.WX_Course_Provider model = new Model.WX_Course_Provider();
            //保存单据
            if (hfMode.Value == "add")
            {
                model = this.SetModelValue(model);
                model.LastEditDate = DateTime.Now;
                model.LastEditMan = Session["CnName"].ToString();
                
                int index = bllArts.Add(model);
                hfMode.Value = "update";
            }
            else
            {
                string ID = hfID.Value;
                model = bllArts.GetModel(int.Parse(ID));
                model.LastEditMan = Session["CnName"].ToString();
                model.LastEditDate = DateTime.Now;
                model = this.SetModelValue(model);                
                bllArts.Update(model);
            }
        }

        private Model.WX_Course_Provider SetModelValue(Model.WX_Course_Provider model)
        {
            model.AccountNumber = txtAccountNumber.Text;
            model.BeneficiaryName = txtBeneficiaryName.Text;
            if(!string.IsNullOrEmpty(txtCollDate.Text)){ model.CollDate=DateTime.Parse(txtCollDate.Text);}
            if (ddlIsAct.SelectedItem != null && ddlIsAct.SelectedValue != "") {
                model.IsAct = int.Parse(ddlIsAct.SelectedValue);
            }
            model.LinkMan = txtLinkMan.Text;
            model.Mobile = txtMobile.Text;
            model.Name = txtName.Text;
            model.QQ = txtQQ.Text;
            model.ReceivingBank = txtReceivingBank.Text;
            if (ddlType.SelectedItem != null && ddlType.SelectedValue != "") {
                model.Type = ddlType.SelectedValue;
            }
            model.Weixin = txtWeixin.Text;
            return model;
        }
        private string checkform()
        {
            string strErr = "";
            if (this.txtCollDate.Text == "")
            {
                strErr += "合作日期不能为空！\\n";
            }
            if (txtLinkMan.Text.Trim()=="")
            {
                strErr += "联系人不能为空！\\n";
            }
            if (txtMobile.Text.Trim()=="")
            {
                strErr += "手机号不能为空！\\n";
            }
            if (txtName.Text.Trim()=="") {
                strErr += "供应商不能为空！\\n";
            }
            if (ddlType.SelectedItem==null || ddlType.SelectedValue=="" ) {
                strErr += "供应商类型不能为空！\\n";
            }
            
            return strErr;
        }
    }
}


