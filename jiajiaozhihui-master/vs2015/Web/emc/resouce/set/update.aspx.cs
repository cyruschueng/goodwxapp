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
namespace SfSoft.web.emc.resouce.set
{
    public partial class update : SfSoft.SfEmc.EmcDetailPage
    {

        Model.wx_source modelArts = new SfSoft.Model.wx_source();
        BLL.wx_source bllArts = new BLL.wx_source();
        
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
                    modelArts.is_act = 1;
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
        private void ShowInfo(Model.wx_source model)
        {
            txtTitle.Text = model.title;
            txtIntro.Text = model.intro;
            txtDetail.Value = model.detail;
            txtExpertId.Text = model.expert_id;
            if (model.small_img_src.Trim() != "")
            {
                smallImgSrc.ImageUrl = model.small_img_src;
                smallImgSrc.Visible = true;
                btnDeleSmallImgSrc.Visible = true;
                fileSmallImgSrc.Visible = false;
            }
            else
            {
                smallImgSrc.Visible = false;
                btnDeleSmallImgSrc.Visible= false;
                fileSmallImgSrc.Visible = true;
            }

            if (model.img_src.Trim() != "")
            {
                imgSrc.ImageUrl = model.img_src;
                imgSrc.Visible = true;
                btnDeleImgSrc.Visible = true;
                fileImgSrc.Visible = false;
            }
            else
            {
                imgSrc.Visible = false;
                btnDeleImgSrc.Visible = false;
                fileImgSrc.Visible = true;
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
            Model.wx_source model = new Model.wx_source();
            //保存单据
            if (hfMode.Value == "add")
            {
                model = this.SetModelValue(model);
                model.create_date = DateTime.Now;
                model.modify_date = DateTime.Now;
                int index = bllArts.Add(model);
                hfMode.Value = "update";
            }
            else
            {
                string ID = hfID.Value;
                model = bllArts.GetModel(int.Parse(ID));
                model = this.SetModelValue(model);
                model.modify_date = DateTime.Now;

                smallImgSrc.Visible = true;
                imgSrc.Visible = true;

                bllArts.Update(model);
            }
        }

        private Model.wx_source SetModelValue(Model.wx_source model)
        {
            model.title = txtTitle.Text;
            model.intro = txtIntro.Text;
            model.detail = txtDetail.Value;
            model.expert_id = txtExpertId.Text;
            model.small_img_src = UploadImg(fileSmallImgSrc, model.small_img_src);
            if (model.small_img_src != "")
            {
                smallImgSrc.ImageUrl = model.small_img_src;
                fileSmallImgSrc.Visible = false;
                btnDeleSmallImgSrc.Visible = true;
            }
            model.img_src = UploadImg(fileImgSrc, model.img_src);
            if (model.img_src != "")
            {
                imgSrc.ImageUrl = model.img_src;
                fileImgSrc.Visible = false;
                btnDeleImgSrc.Visible = true;
            }
            return model;
        }
        private string UploadImg( FileUpload fileUpload,string imgUrl)
        {
            
            if (fileUpload.FileName != "")
            {
                string UploadFilesPath = ConfigurationManager.AppSettings["UploadFilesPath"] + "bucket/";
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
            return strErr;
        }
        protected void btnDeleSmallImgSrc_Click(object sender, EventArgs e)
        {
            modelArts = bllArts.GetModel(int.Parse(hfID.Value));
            if (modelArts.small_img_src != "" || modelArts.small_img_src != null)
            {
                FileUpLoadCommon.DeleteFile(modelArts.small_img_src);
                modelArts.small_img_src = "";
                bllArts.Update(modelArts);
                smallImgSrc.ImageUrl = modelArts.small_img_src;
                fileSmallImgSrc.Visible = true;
                btnDeleSmallImgSrc.Visible = true;
                smallImgSrc.Visible = false;
            }
        }
        protected void btnDeleImgSrc_Click(object sender, EventArgs e)
        {
            modelArts = bllArts.GetModel(int.Parse(hfID.Value));
            if (modelArts.img_src != "" || modelArts.img_src != null)
            {
                FileUpLoadCommon.DeleteFile(modelArts.img_src);
                modelArts.img_src = "";
                bllArts.Update(modelArts);
                imgSrc.ImageUrl = modelArts.img_src;
                fileImgSrc.Visible = true;
                btnDeleImgSrc.Visible = true;
                imgSrc.Visible = false;
            }
        }
    }
}


