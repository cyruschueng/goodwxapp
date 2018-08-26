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
using System.Collections.Generic;
namespace SfSoft.web.emc.audio.download
{
    public partial class update : SfSoft.SfEmc.EmcDetailPage
    {
        Model.WX_Audio_DownLoad modelArts = new SfSoft.Model.WX_Audio_DownLoad();
        BLL.WX_Audio_DownLoad bllArts = new BLL.WX_Audio_DownLoad();
        protected void Page_Load(object sender, EventArgs e)
        {
            if (!IsPostBack)
            {
                string mode = Request.Params["mode"].ToString();
                
                hfMode.Value = mode;
                hfID.Value = Request.QueryString["Id"];
                hfMID.Value = "emc.audio.download";

                //修改
                if (hfMode.Value == "update")
                {
                    modelArts = bllArts.GetModel(int.Parse(hfID.Value));
                    if (modelArts != null)
                    {
                        this.ShowInfo(modelArts);
                    }
                }
                else {
                }
            }
        }
        //1.初始化模块ID
        protected override void VtInitMID()
        {
            hfMID.Value = "emc.audio.download";
        }
        protected override void VtInitToolbars()
        {
            VtInitEditToolbars();
        }
        protected override void VtInitBaseToolsBars()
        {
            VtInitBaseDetailToolsBars();
        }
        private void ShowInfo(Model.WX_Audio_DownLoad model)
        {
            if (model.ImgUrl == "")
            {
                fileUpload.Visible = true;
                btnView.Visible = false;
                btnDelPic.Visible = false;
            }
            else {
                txtImgUrl.Text = model.ImgUrl;
                txtImgUrl.Visible = true;
                fileUpload.Visible = false;
                btnView.Visible = true;
                btnView.NavigateUrl = model.ImgUrl;
                btnDelPic.Visible = true;
            }
            txtDetail.Value = model.Detail;
            txtDownLoadUrl.Text = model.DownLoadUrl;
            txtIntro.Text = model.Intro;
            txtRemark.Text = model.Remark;
            txtTitle.Text = model.Title;
            if (model.Tag != "") {
                var tags = model.Tag.Split(',');
                for (var i = 0; i < tags.Length; i++) {
                    cbTags.Items.FindByValue(tags[i]).Selected = true;
                }
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
            Model.WX_Audio_DownLoad model = new Model.WX_Audio_DownLoad();
            //保存单据
            if (hfMode.Value == "add")
            {
                model = this.SetModelValue(model);
                model.CreateDate = DateTime.Now;
                model.AppId = "app001";
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

        private Model.WX_Audio_DownLoad SetModelValue(Model.WX_Audio_DownLoad model)
        {
            model.Detail = txtDetail.Value;
            model.DownLoadUrl = txtDownLoadUrl.Text;
            model.Intro = txtIntro.Text;
            model.Remark = txtRemark.Text;
            model.Title = txtTitle.Text;
            string selected = "";
            for (var i = 0; i < cbTags.Items.Count; i++) {
                if (cbTags.Items[i].Selected) {
                    selected += cbTags.Items[i].Value + ",";
                }
            }
            if (!string.IsNullOrEmpty(selected)) {
                selected = selected.EndsWith(",") ? selected.Substring(0, selected.Length - 1) : selected;
            }
            model.Tag = selected;

            string UploadFilesPath = ConfigurationManager.AppSettings["UploadFilesPath"] + "audio/";
            if (fileUpload.FileName != "")
            {
                if (model.ImgUrl != "")
                {
                    FileUpLoadCommon.DeleteFile(model.ImgUrl);
                }
                string newfname = Common.FileUpLoadCommon.UpFile("", UploadFilesPath, fileUpload);
                string FilePath = UploadFilesPath + newfname;

                model.ImgUrl = FilePath;
                txtImgUrl.Visible = true;
                txtImgUrl.Text = model.ImgUrl;
                btnView.NavigateUrl = model.ImgUrl;
                btnDelPic.Visible = true;
                btnView.Visible = true;
            }

            return model;
        }
        private string checkform()
        {
            string strErr = "";
            if (txtTitle.Text.Trim() == "") {
                strErr += "请填写标题!\\n";
            }
            if (txtDownLoadUrl.Text.Trim() == "") {
                strErr += "请填写下载地址!\\n";
            }
            if (cbTags.SelectedItem == null) {
                strErr += "请选择书签!\\n";
            }
            return strErr;
        }
        protected void btnDelPic_Click(object sender, EventArgs e)
        {
            modelArts = bllArts.GetModel(int.Parse(hfID.Value));
            if (modelArts.ImgUrl != "" || modelArts.ImgUrl != null)
            {
                FileUpLoadCommon.DeleteFile(modelArts.ImgUrl);
                modelArts.ImgUrl = "";
                bllArts.Update(modelArts);
                txtImgUrl.Text = "";
                fileUpload.Visible = true;
                txtImgUrl.Visible = false;
                btnDelPic.Visible = false;
                btnView.Visible = false;
            }
        }

    }
}


