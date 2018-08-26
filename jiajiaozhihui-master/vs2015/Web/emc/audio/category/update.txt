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
namespace SfSoft.web.emc.audio.category
{
    public partial class update : SfSoft.SfEmc.EmcDetailPage
    {

        Model.WX_Audio_Category modelArts = new SfSoft.Model.WX_Audio_Category();
        BLL.WX_Audio_Category bllArts = new BLL.WX_Audio_Category();
        protected void Page_Load(object sender, EventArgs e)
        {
            if (!IsPostBack)
            {
                string mode = Request.Params["mode"].ToString();
                
                hfMode.Value = mode;
                hfID.Value = Request.QueryString["Id"];
                hfMID.Value = "emc.audio.category";

                //修改
                if (hfMode.Value == "update")
                {
                    modelArts = bllArts.GetModel(int.Parse(hfID.Value));
                    if (modelArts != null)
                    {
                        this.ShowInfo(modelArts);
                    }
                }
                else
                {
                }
            }
        }
        //1.初始化模块ID
        protected override void VtInitMID()
        {
            hfMID.Value = "emc.audio.category";
        }
        protected override void VtInitToolbars()
        {
            VtInitEditToolbars();
        }
        protected override void VtInitBaseToolsBars()
        {
            VtInitBaseDetailToolsBars();
        }
        private void ShowInfo(Model.WX_Audio_Category model)
        {
            if (model.MiniImgUrl == "")
            {
                fileMiniImgUrl.Visible = true;
                btnMiniImgView.Visible = false;
                btnDelMiniPic.Visible = false;
            }
            else
            {
                txtMiniImgUrl.Text = model.MiniImgUrl;
                txtMiniImgUrl.Visible = true;
                fileMiniImgUrl.Visible = false;
                btnMiniImgView.Visible = true;
                btnMiniImgView.NavigateUrl = model.MiniImgUrl;
                btnDelMiniPic.Visible = true;
            }

            if (model.MaxImgUrl == "")
            {
                fileMaxImgUrl.Visible = true;
                btnMaxImgView.Visible = false;
                btnDelMaxPic.Visible = false;
            }
            else
            {
                txtMaxImgUrl.Text = model.MaxImgUrl;
                txtMaxImgUrl.Visible = true;
                fileMaxImgUrl.Visible = false;
                btnMaxImgView.Visible = true;
                btnMaxImgView.NavigateUrl = model.MaxImgUrl;
                btnDelMaxPic.Visible = true;
            }
            txtFullName.Text = model.FullName;
            txtShortName.Text = model.ShortName;
            cbIsAct.Checked = (model.IsAct ?? 0) == 0 ? false : true;
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
            Model.WX_Audio_Category model = new Model.WX_Audio_Category();
            //保存单据
            if (hfMode.Value == "add")
            {
                model = this.SetModelValue(model);
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

        private Model.WX_Audio_Category SetModelValue(Model.WX_Audio_Category model)
        {
            model.FullName = txtFullName.Text;
            model.IsAct = cbIsAct.Checked == true ? 1 : 0;
            model.ShortName = txtShortName.Text;

            string UploadFilesPath = ConfigurationManager.AppSettings["UploadFilesPath"] + "audio/";
            if (fileMaxImgUrl.FileName != "")
            {
                if (model.MaxImgUrl != "")
                {
                    FileUpLoadCommon.DeleteFile(model.MaxImgUrl);
                }
                string newfname = Common.FileUpLoadCommon.UpFile("", UploadFilesPath, fileMaxImgUrl);
                string FilePath = UploadFilesPath + newfname;

                model.MaxImgUrl = FilePath;
                txtMaxImgUrl.Visible = true;
                txtMaxImgUrl.Text = model.MaxImgUrl;
                btnMaxImgView.NavigateUrl = model.MaxImgUrl;
                btnDelMaxPic.Visible = true; 
                btnMaxImgView.Visible = true;
            }

            if (fileMiniImgUrl.FileName != "")
            {
                if (model.MiniImgUrl != "")
                {
                    FileUpLoadCommon.DeleteFile(model.MiniImgUrl);
                }
                string newfname = Common.FileUpLoadCommon.UpFile("", UploadFilesPath, fileMiniImgUrl);
                string FilePath = UploadFilesPath + newfname;

                model.MiniImgUrl = FilePath;
                txtMiniImgUrl.Visible = true;
                txtMiniImgUrl.Text = model.MiniImgUrl;
                btnMiniImgView.NavigateUrl = model.MiniImgUrl;
                btnDelMiniPic.Visible = true; 
                btnMiniImgView.Visible = true;
            }
            return model;
        }
        private string checkform()
        {
            string strErr = "";

            return strErr;
        }
        protected void btnDelMiniPic_Click(object sender, EventArgs e)
        {
            modelArts = bllArts.GetModel(int.Parse(hfID.Value));
            if (modelArts.MiniImgUrl != "" || modelArts.MiniImgUrl != null)
            {
                FileUpLoadCommon.DeleteFile(modelArts.MiniImgUrl);
                modelArts.MiniImgUrl = "";
                bllArts.Update(modelArts);
                txtMiniImgUrl.Text = "";
                fileMiniImgUrl.Visible = true;
                txtMiniImgUrl.Visible = false;
                btnDelMiniPic.Visible = false;
                btnMiniImgView.Visible = false; 
            }
        }
        protected void btnDelMaxPic_Click(object sender, EventArgs e)
        {
            modelArts = bllArts.GetModel(int.Parse(hfID.Value));
            if (modelArts.MaxImgUrl != "" || modelArts.MaxImgUrl != null)
            {
                FileUpLoadCommon.DeleteFile(modelArts.MaxImgUrl);
                modelArts.MaxImgUrl = "";
                bllArts.Update(modelArts);
                txtMaxImgUrl.Text = "";
                fileMaxImgUrl.Visible = true;
                txtMaxImgUrl.Visible = false;
                btnDelMaxPic.Visible = false;
                btnMaxImgView.Visible = false;
            }
        }
    }
}


