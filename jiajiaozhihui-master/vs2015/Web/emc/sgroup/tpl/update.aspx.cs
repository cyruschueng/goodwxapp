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
namespace SfSoft.web.emc.sgroup.tpl
{
    public partial class update : SfSoft.SfEmc.EmcDetailPage
    {

        Model.WX_SGroup_Tpl modelArts = new SfSoft.Model.WX_SGroup_Tpl();
        BLL.WX_SGroup_Tpl bllArts = new BLL.WX_SGroup_Tpl();
        protected void Page_Load(object sender, EventArgs e)
        {
            if (!IsPostBack)
            {
                string mode = Request.Params["mode"].ToString();
                string ID = Request.Params["ID"].ToString();

                hfMode.Value = mode;
                hfID.Value = ID;
                hfMID.Value = "emc.zxs.info";
                //新建
                if (hfMode.Value == "add")
                {
                    rblIsAct.Items.FindByValue("1").Selected = true;
                    rblCatalogue.Items.FindByValue("1").Selected = true;
                    
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
            hfMID.Value = "emc.zxs.info";
        }
        protected override void VtInitToolbars()
        {
            VtInitEditToolbars();
        }
        protected override void VtInitBaseToolsBars()
        {
            VtInitBaseDetailToolsBars();
        }
        private void ShowInfo(Model.WX_SGroup_Tpl model)
        {


            txtTitle.Text = model.title;
            txtQRCodeX.Text = model.qrcodex.ToString();
            txtQRCodeY.Text = model.qrcodey.ToString();
            txtQRCodeW.Text = model.qrcodew.ToString();
            txtQRCodeH.Text = model.qrcodeh.ToString();

            txtTag.Text = model.tag;
            txtTagX.Text = model.tagx.ToString();
            txtTagY.Text = model.tagx.ToString();
            txtSn.Text = model.sn.ToString();
            rblIsAct.Items.FindByValue((model.is_act ?? 0).ToString()).Selected = true;
            rblCatalogue.Items.FindByValue((model.catalogue ?? 1).ToString()).Selected = true;

            if (model.src.Trim() != "")
            {
                imgSrc.ImageUrl = model.src;
                imgSrc.Visible = true;
                btnDeleSrc.Visible = true;
                fileSrc.Visible = false;
            }
            else
            {
                imgSrc.Visible = false;
                btnDeleSrc.Visible= false;
                fileSrc.Visible = true;
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
            Model.WX_SGroup_Tpl model = new Model.WX_SGroup_Tpl();
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
                imgSrc.Visible = true;
                bllArts.Update(model);
            }
        }

        private Model.WX_SGroup_Tpl SetModelValue(Model.WX_SGroup_Tpl model)
        {
            model.title = txtTitle.Text;
            model.qrcodex = string.IsNullOrEmpty(txtQRCodeX.Text)? 0: decimal.Parse(txtQRCodeX.Text);
            model.qrcodey = string.IsNullOrEmpty(txtQRCodeY.Text) ? 0 : decimal.Parse(txtQRCodeY.Text);

            model.qrcodew = string.IsNullOrEmpty(txtQRCodeW.Text) ? 0 : decimal.Parse(txtQRCodeW.Text);
            model.qrcodeh = string.IsNullOrEmpty(txtQRCodeH.Text) ? 0 : decimal.Parse(txtQRCodeH.Text);

            model.tag = txtTag.Text;
            model.tagx = string.IsNullOrEmpty(txtTagX.Text) ? 0 : decimal.Parse(txtTagX.Text);
            model.tagy = string.IsNullOrEmpty(txtTagY.Text) ? 0 : decimal.Parse(txtTagY.Text);
            model.is_act = rblIsAct.SelectedItem != null && rblIsAct.SelectedValue != "" ? int.Parse(rblIsAct.SelectedValue) : 0;
            model.catalogue = rblCatalogue.SelectedItem != null && rblCatalogue.SelectedValue != "" ? int.Parse(rblCatalogue.SelectedValue) : 0;

            if (!string.IsNullOrEmpty(txtSn.Text)) {
                model.sn = int.Parse(txtSn.Text);
            }
            model.src = UploadImg(fileSrc, model.src);
            if (model.src != "")
            {
                imgSrc.ImageUrl = model.src;
                fileSrc.Visible = false;
                btnDeleSrc.Visible = true;
            }
            return model;
        }
        private string UploadImg( FileUpload fileUpload,string imgUrl)
        {
            string UploadFilesPath = ConfigurationManager.AppSettings["UploadFilesPath"] + "generalize/";
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
            if (txtTitle.Text.Trim() == "")
            {
                strErr += "标题不能为空！\\n";
            }
            if (txtQRCodeX.Text.Trim() == "")
            { 
                strErr += "二维码X坐标不能为空！\\n";
            }
            if (SfSoft.Common.PageValidate.IsNumber(txtQRCodeX.Text.Trim())==false)
            {
                strErr += "二维码X坐标不是数字！\\n";
            }
            if (txtQRCodeY.Text.Trim() == "")
            {
                strErr += "二维码Y坐标不能为空！\\n";
            }
            if (SfSoft.Common.PageValidate.IsNumber(txtQRCodeY.Text.Trim()) == false)
            {
                strErr += "二维码Y坐标不是数字！\\n";
            }
            if (txtTagX.Text.Trim()!="" && SfSoft.Common.PageValidate.IsNumber(txtTagX.Text.Trim()) == false)
            {
                strErr += "文字Y坐标不是数字！\\n";
            }

            if (txtTagY.Text.Trim() != "" && SfSoft.Common.PageValidate.IsNumber(txtTagY.Text.Trim()) == false)
            {
                strErr += "文字Y坐标不是数字！\\n";
            }
            if ( txtSn.Text.Trim() != "" && SfSoft.Common.PageValidate.IsNumber(txtSn.Text.Trim()) == false)
            {
                strErr += "排序不是数字！\\n";
            }

            return strErr;
        }
        protected void btnDelSrc_Click(object sender, EventArgs e)
        {
            modelArts = bllArts.GetModel(int.Parse(hfID.Value));
            if (modelArts.src != "" || modelArts.src != null)
            {
                FileUpLoadCommon.DeleteFile(modelArts.src);
                modelArts.src = "";
                bllArts.Update(modelArts);
                imgSrc.ImageUrl = modelArts.src;
                fileSrc.Visible = true;
                btnDeleSrc.Visible = true;
                imgSrc.Visible = false;
            }
        }
    }
}


