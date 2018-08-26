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
namespace SfSoft.web.emc.group.info
{
    public partial class update : SfSoft.SfEmc.EmcDetailPage
    {

        Model.WX_Group_Info modelArts = new SfSoft.Model.WX_Group_Info();
        BLL.WX_Group_Info bllArts = new BLL.WX_Group_Info();
        protected void Page_Load(object sender, EventArgs e)
        {
            if (!IsPostBack)
            {
                string mode = Request.Params["mode"].ToString();
                string ID = Request.Params["ID"].ToString();

                hfMode.Value = mode;
                hfID.Value = ID;
                hfMID.Value = "emc.wxcourse.course";

                InitDropDownList();
                //新建
                if (hfMode.Value == "add")
                {
                    rblStatus.Items.FindByValue("1").Selected = true;
                    rblCheck.Items.FindByValue("1").Selected = true;
                    rblPremium.Items.FindByValue("0").Selected = true;
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
            hfMID.Value = "emc.group.info";
        }
        protected override void VtInitToolbars()
        {
            VtInitEditToolbars();
        }
        protected override void VtInitBaseToolsBars()
        {
            VtInitBaseDetailToolsBars();
        }
        private void ShowInfo(Model.WX_Group_Info model)
        {
            txtBalance.Text = string.Format("{0:F}", model.Balance ?? 0);
            txtCoding.Text = model.Coding;
            txtDetails.Value = model.Detail;
            txtGrule.Text = model.Grule;
            txtIntro.Text = model.Intro;
            txtName.Text = model.Name;
            txtPremium.Text = string.Format("{0:F}", model.Premium ?? 0);
            txtPremiumCondition.Text = (model.PremiumCondition ?? 0).ToString();
            txtUpperLimit.Text = (model.UpperLimit ?? 0).ToString();
            rblCheck.Items.FindByValue((model.Check ?? 0).ToString()).Selected = true;
            rblPremium.Items.FindByValue((model.IsPremium ?? 0).ToString()).Selected = true;
            rblStatus.Items.FindByValue((model.Status ?? 0).ToString()).Selected = true;
            ddlType.Items.FindByValue(model.Type).Selected = true;

            if (model.LogoUrl.Trim() != "")
            {
                imgLogoUrl.ImageUrl = model.LogoUrl;
                imgLogoUrl.Visible = true;
                btnDeleLogo.Visible = true;
            }
            else
            {
                imgLogoUrl.Visible = false;
                btnDeleLogo.Visible= false;
            }

            if (model.QRcodeUrl.Trim() != "")
            {
                imgQRcodeUrl.ImageUrl = model.QRcodeUrl;
                imgQRcodeUrl.Visible = true;
                btnDeleQRcode.Visible = true;
            }
            else {
                imgQRcodeUrl.Visible = false;
                btnDeleQRcode.Visible = false;
            }

            if (model.RegisterQRcodeUrl.Trim() != "")
            {
                imgRegisterQRcodeUrl.ImageUrl = model.RegisterQRcodeUrl;
                imgRegisterQRcodeUrl.Visible = true;
                btnDeleRegisterQRcode.Visible = true;
            }
            else
            {
                imgRegisterQRcodeUrl.Visible = false;
                btnDeleRegisterQRcode.Visible = false;
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
            Model.WX_Group_Info model = new Model.WX_Group_Info();
            //保存单据
            if (hfMode.Value == "add")
            {
                model = this.SetModelValue(model);
                int index = bllArts.Add(model);
                hfMode.Value = "update";
            }
            else
            {
                string ID = hfID.Value;
                model = bllArts.GetModel(int.Parse(ID));
                model = this.SetModelValue(model);
                bllArts.Update(model);
            }
        }

        private Model.WX_Group_Info SetModelValue(Model.WX_Group_Info model)
        {
            model.Balance = txtBalance.Text.Trim() == "" ? 0 : Convert.ToDecimal(txtBalance.Text);
            model.Check = rblCheck.SelectedItem != null && rblCheck.SelectedValue != "" ? Convert.ToInt32(rblCheck.SelectedValue) : 0;
            model.Coding = txtCoding.Text;
            model.Detail = txtDetails.Value;
            model.Grule = txtGrule.Text;
            model.Intro = txtIntro.Text;
            model.IsPremium = rblPremium.SelectedItem != null && rblPremium.SelectedValue != "" ? Convert.ToInt32(rblPremium.SelectedValue) : 0;
            model.Type = ddlType.SelectedItem != null && ddlType.SelectedValue != "" ? ddlType.SelectedValue: "0";
            model.Name = txtName.Text;
            model.Premium = txtPremium.Text.Trim() == "" ? 0 : Convert.ToDecimal(txtPremium.Text);
            model.PremiumCondition = txtPremiumCondition.Text.Trim() == "" ? 0 : Convert.ToInt32(txtPremiumCondition.Text);
            model.Status = rblStatus.SelectedItem != null && rblStatus.SelectedValue != "" ? Convert.ToInt32(rblStatus.SelectedValue) : 0;
            model.UpperLimit = txtUpperLimit.Text.Trim() == "" ? 0 : Convert.ToInt32(txtUpperLimit.Text);
            model.LogoUrl = UploadImg(fileLogo, model.LogoUrl);
            if (model.LogoUrl != "") {
                imgLogoUrl.ImageUrl = model.LogoUrl;
                btnDeleLogo.Visible = true;
            }
            model.QRcodeUrl = UploadImg(fileQRcode, model.QRcodeUrl);
            if (model.QRcodeUrl != "") {
                imgQRcodeUrl.ImageUrl = model.QRcodeUrl;
                btnDeleQRcode.Visible = true;
            }
            model.RegisterQRcodeUrl = UploadImg(fileRegisterQRcode, model.RegisterQRcodeUrl);
            if (model.RegisterQRcodeUrl != "") {
                imgRegisterQRcodeUrl.ImageUrl = model.RegisterQRcodeUrl;
                btnDeleRegisterQRcode.Visible = true;
            }
            return model;
        }
        private string UploadImg( FileUpload fileUpload,string imgUrl)
        {
            string UploadFilesPath = ConfigurationManager.AppSettings["UploadFilesPath"] + "group/";
            if (fileUpload.FileName != "")
            {
                if (imgUrl != "")
                {
                    FileUpLoadCommon.DeleteFile(imgUrl);
                }
                string newfname = Common.FileUpLoadCommon.UpFile("", UploadFilesPath, fileUpload);
                string FilePath = UploadFilesPath + newfname;
                return FilePath;
            }
            return imgUrl;
        }
        private string checkform()
        {
            string strErr = "";
            if (txtName.Text.Trim() == "") {
                strErr += "群名不能为空！\\n";
            }
            if (txtCoding.Text.Trim() == "") {
                strErr += "群编码不能为空！\\n";
            }
            if (txtDetails.Value.Trim() == "") {
                strErr += "群详细内容不能为空！\\n";
            }
            if (txtGrule.Text.Trim() == "") {
                strErr += "群规则不能为空！\\n";
            }
            if (txtUpperLimit.Text.Trim() == "") {
                strErr += "群人数上限不能为空！\\n";
            }
            return strErr;
        }
        private void InitDropDownList()
        {
            BLL.Pub_BaseData baseBll = new BLL.Pub_BaseData();
            DataSet ds = baseBll.GetList("RefObj='weixin.group.type'");
            foreach (DataRow dr in ds.Tables[0].Rows) {
                ddlType.Items.Add(new ListItem() { Text = dr["RefValue"].ToString(), Value = dr["RefValueCode"].ToString() });
            }
        }
        protected void btnDelPic_Click(object sender, EventArgs e)
        {
            //modelArts = bllArts.GetModel(int.Parse(hfID.Value));
            //if (modelArts.ImgUrl != "" || modelArts.ImgUrl != null)
            //{
            //    FileUpLoadCommon.DeleteFile(modelArts.ImgUrl);
            //    modelArts.ImgUrl = "";
            //    bllArts.Update(modelArts);
            //    txtImgUrl.Text = "";
            //    txtImgUrl.Visible = false;
            //    btnDelPic.Visible = false;
            //}
        }
    }
}


