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
namespace SfSoft.web.emc.advertisement.item
{
    public partial class update : SfSoft.SfEmc.EmcDetailPage
    {

        Model.WX_Advertisement modelAD = new SfSoft.Model.WX_Advertisement();
        BLL.WX_Advertisement bllAD = new BLL.WX_Advertisement();
        protected void Page_Load(object sender, EventArgs e)
        {
            if (!IsPostBack)
            {
                string mode = Request.Params["mode"].ToString();
                string ID = Request.Params["ID"].ToString();

                hfMode.Value = mode;
                hfID.Value = ID;
                hfMID.Value = "emc.advertisement.item";

                //新建
                if (hfMode.Value == "add")
                {
                    ddlPositions.Items.FindByValue("").Selected = true;
                    ddlOwn.Items.FindByValue("").Selected = true;
                    rblIsAct.Items.FindByValue("1").Selected = true;
                }
                //修改
                if (hfMode.Value == "update")
                {
                    modelAD = bllAD.GetModel(int.Parse(ID));
                    if (modelAD != null)
                    {
                        this.ShowInfo(modelAD);
                    }
                }
            }
        }
        //1.初始化模块ID
        protected override void VtInitMID()
        {
            hfMID.Value = "emc.advertisement.item";
        }
        protected override void VtInitToolbars()
        {
            VtInitEditToolbars();
        }
        protected override void VtInitBaseToolsBars()
        {
            VtInitBaseDetailToolsBars();
        }
        private void ShowInfo(Model.WX_Advertisement model)
        {
            txtName.Text = model.Name;
            txtMediaUrl.Text = model.MediaUrl;
            txtTextContent.Value = model.TextContent;
            hfPic.Value = model.ImgUrl;
            txtResume.Text = model.Resume;
            txtOuterLink.Text = model.OuterLink;
            if (model.IsAct != null && model.IsAct == 1)
            {
                rblIsAct.Items.FindByValue("1").Selected = true;
            }
            else {
                rblIsAct.Items.FindByValue("0").Selected = true;
            }
            if (model.Positions != null ) {
                ddlPositions.Items.FindByValue(model.Positions).Selected=true;
            }
            if (model.Own != null) {
                ddlOwn.Items.FindByValue(model.Own).Selected = true ;
            }
            if (model.ImgUrl.Trim() != "")
            {
                imgUrl.ImageUrl = model.ImgUrl;
                imgUrl.Visible = true;
                btnDeleImg.Visible = true;
                fileImgUrl.Visible = false;
            }
            else
            {
                imgUrl.Visible = false;
                btnDeleImg.Visible = false;
                fileImgUrl.Visible = true;
            }
            txtShareTitle.Text = model.ShareTitle;
            txtShareDese.Text = model.ShareDesc;
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
            Model.WX_Advertisement model = new Model.WX_Advertisement();
            //保存单据
            if (hfMode.Value == "add")
            {
                model = this.SetModelValue(model);
                model.CreateDate = DateTime.Now;
                int index = bllAD.Add(model);
                hfMode.Value = "update";
            }
            else
            {
                string ID = hfID.Value;
                model = bllAD.GetModel(int.Parse(ID));
                model = this.SetModelValue(model);
                bllAD.Update(model);
            }
        }

        private Model.WX_Advertisement SetModelValue(Model.WX_Advertisement model)
        {
            model.ImgUrl = hfPic.Value;
            model.MediaUrl = txtMediaUrl.Text;
            model.Name = txtName.Text;
            model.Resume = txtResume.Text;
            model.OuterLink = txtOuterLink.Text;
            if (rblIsAct.SelectedItem != null) {
                model.IsAct = int.Parse(rblIsAct.SelectedValue);
            }
            if (ddlOwn.SelectedItem != null && ddlOwn.SelectedValue != "") {
                model.Own = ddlOwn.SelectedValue;
            }
            if (ddlPositions.SelectedItem != null && ddlPositions.SelectedValue != "") {
                model.Positions = ddlPositions.SelectedValue;
            }
            model.ImgUrl = UploadImg(fileImgUrl, model.ImgUrl);
            if (model.ImgUrl != "")
            {
                imgUrl.ImageUrl = model.ImgUrl;
                imgUrl.Visible = true;
                fileImgUrl.Visible = false;
                btnDeleImg.Visible = true;
            }

            model.TextContent = txtTextContent.Value;
            model.ShareDesc = txtShareDese.Text;
            model.ShareTitle = txtShareTitle.Text;
            return model;
        }
        private string checkform()
        {
            string strErr = "";
            if (txtName.Text == "") {
                strErr += "广告名称不能为空！\\n";
            }
            
            return strErr;
        }
        protected void btnDeleImg_Click(object sender, EventArgs e)
        {
            modelAD = bllAD.GetModel(int.Parse(hfID.Value));
            if (modelAD.ImgUrl != "" || modelAD.ImgUrl != null)
            {
                FileUpLoadCommon.DeleteFile(modelAD.ImgUrl);
                modelAD.ImgUrl = "";
                bllAD.Update(modelAD);
                imgUrl.ImageUrl = modelAD.ImgUrl;
                fileImgUrl.Visible = true;
                btnDeleImg.Visible = true;
                imgUrl.Visible = false;
            }
        }
        private string UploadImg(FileUpload fileUpload, string imgUrl)
        {
            string UploadFilesPath = ConfigurationManager.AppSettings["UploadFilesPath"] + "adv/";
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
    }
}


