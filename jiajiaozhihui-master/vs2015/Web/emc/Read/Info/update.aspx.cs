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
namespace SfSoft.web.emc.read.info
{
    public partial class update : SfSoft.SfEmc.EmcDetailPage
    {

        Model.WX_Read_Info modelArts = new SfSoft.Model.WX_Read_Info();
        BLL.WX_Read_Info bllArts = new BLL.WX_Read_Info();
        protected void Page_Load(object sender, EventArgs e)
        {
            if (!IsPostBack)
            {
                string mode = Request.Params["mode"].ToString();
                string ID = Request.Params["ID"].ToString();

                hfMode.Value = mode;
                hfID.Value = ID;
                hfMID.Value = "emc.read.info";

                //新建
                if (hfMode.Value == "add")
                {
                    ddlStatus.Items.FindByValue("1").Selected = true;
                }
                //修改
                if (hfMode.Value == "update")
                {
                    txtAppid.ReadOnly = true;
                    txtAppid.Attributes.Add("disabled", "disabled");
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
            hfMID.Value = "emc.read.info";
        }
        protected override void VtInitToolbars()
        {
            VtInitEditToolbars();
        }
        protected override void VtInitBaseToolsBars()
        {
            VtInitBaseDetailToolsBars();
        }
        private void ShowInfo(Model.WX_Read_Info model)
        {
            txtIntroduction.Value = model.Introduction;
            txtTitle.Text = model.Title;
            txtAppid.Text = model.AppId;
            ddlStatus.Items.FindByValue((model.Status ?? 0).ToString()).Selected = true;
            lblNormalNumber.Text = (model.NormalNumber ?? 0).ToString();
            lbActiveNumber.Text = (model.ActiveNumber ?? 0).ToString();
            if (model.LogoUrl.Trim() != "")
            {
                imgLogo.ImageUrl = model.LogoUrl;
                imgLogo.Visible = true;
                btnDeleLogo.Visible = true;
                fileLogo.Visible = false;
            }
            else
            {
                imgLogo.Visible = false;
                btnDeleLogo.Visible= false;
                fileLogo.Visible = true;
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
            Model.WX_Read_Info model = new Model.WX_Read_Info();
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
                imgLogo.Visible = true;
                bllArts.Update(model);
            }
        }

        private Model.WX_Read_Info SetModelValue(Model.WX_Read_Info model)
        {
            model.Introduction = txtIntroduction.Value;
            model.AppId = txtAppid.Text;
            model.LogoUrl = UploadImg(fileLogo, model.LogoUrl);
            if (model.LogoUrl != "") {
                imgLogo.ImageUrl = model.LogoUrl;
                fileLogo.Visible = false;
                btnDeleLogo.Visible = true;
            }
            if (ddlStatus.SelectedItem != null && ddlStatus.SelectedValue != "") {
                model.Status = int.Parse(ddlStatus.SelectedValue);
            }
            model.Title = txtTitle.Text;
            return model;
        }
        private string UploadImg( FileUpload fileUpload,string imgUrl)
        {
            string UploadFilesPath = ConfigurationManager.AppSettings["UploadFilesPath"] + "read/";
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
            if (txtTitle.Text.Trim() == "") {
                strErr += "活动名称不能为空！\\n";
            }
            if (txtIntroduction.Value.Trim() == "") {
                strErr += "活动价绍不能为空！\\n";
            }
            if (txtAppid.Text.Trim() != "")
            {
                if (IsExistAppId(txtAppid.Text.Trim()) && hfMode.Value=="add")
                {
                    strErr += "活动编码已存在，请重新编写！\\n";
                }
            }
            else {
                strErr += "活动编码不能为空！\\n";
            }
            if (ddlStatus.SelectedValue == "" || ddlStatus.SelectedItem == null) {
                strErr += "请选择活动状态！\\n";
            }
            return strErr;
        }
        protected void btnDelPic_Click(object sender, EventArgs e)
        {
            modelArts = bllArts.GetModel(int.Parse(hfID.Value));
            if (modelArts.LogoUrl != "" || modelArts.LogoUrl != null)
            {
                FileUpLoadCommon.DeleteFile(modelArts.LogoUrl);
                modelArts.LogoUrl = "";
                bllArts.Update(modelArts);
                imgLogo.ImageUrl = modelArts.LogoUrl;
                fileLogo.Visible = true;
                btnDeleLogo.Visible = true;
                imgLogo.Visible = false;
            }
        }
        private bool IsExistAppId(string appId)
        {
            BLL.WX_Read_Info bll = new BLL.WX_Read_Info();
            DataSet ds = bll.GetList("AppId='" + appId + "'");
            if (ds != null && ds.Tables[0] != null && ds.Tables[0].Rows.Count > 0) {
                return true;
            }
            return false;
        }
    }
}


