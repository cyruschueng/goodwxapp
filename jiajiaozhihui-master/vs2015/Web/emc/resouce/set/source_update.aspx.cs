using SfSoft.Common;
using System;
using System.Collections.Generic;
using System.Configuration;
using System.Linq;
using System.Web;
using System.Web.UI;
using System.Web.UI.WebControls;

namespace SfSoft.web.emc.resouce.set
{
    public partial class source_update : SfSoft.SfEmc.EmcDetailPage
    {
        Model.wx_source_list modelArts = new SfSoft.Model.wx_source_list();
        BLL.wx_source_list bllArts = new BLL.wx_source_list();

        protected void Page_Load(object sender, EventArgs e)
        {
            if (!IsPostBack)
            {
                string mode = Request.Params["mode"].ToString();
                string ID = Request.Params["ID"].ToString();
                hfClassId.Value = Request.Params["classId"].ToString();

                hfMode.Value = mode;
                hfID.Value = ID;
                hfMID.Value = "emc.zxs.info";
                //新建
                if (hfMode.Value == "add")
                {
                    rblIsAct.Items.FindByValue("1").Selected = true;
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
        private void ShowInfo(Model.wx_source_list model)
        {
            txtFileTitle.Text = model.file_title;
            txtFileIntro.Text = model.file_intro;
            txtFileLink.Text = model.file_link;
            txtFileSize.Text = model.file_size;
            txtFileType.Text = model.file_type;
            txtRemark.Text = model.remark;
            txtSn.Text = model.sn.ToString();
            rblIsAct.Items.FindByValue((model.is_act ?? 0).ToString()).Selected = true;
            
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
            Model.wx_source_list model = new Model.wx_source_list();
            //保存单据
            if (hfMode.Value == "add")
            {
                model = this.SetModelValue(model);
                model.create_date = DateTime.Now;
                model.modify_date = DateTime.Now;
                int index = bllArts.Add(model);
                hfMode.Value = "update";
                imgSrc.Visible = true;
            }
            else
            {
                string ID = hfID.Value;
                model = bllArts.GetModel(int.Parse(ID));
                model = this.SetModelValue(model);
                model.modify_date = DateTime.Now;
                imgSrc.Visible = true;
                bllArts.Update(model);
            }
        }

        private Model.wx_source_list SetModelValue(Model.wx_source_list model)
        {
            model.file_intro = txtFileIntro.Text;
            model.file_link = txtFileLink.Text;
            model.file_size = txtFileSize.Text;
            model.file_title = txtFileTitle.Text;
            model.file_type = txtFileType.Text;
            model.is_act = int.Parse(rblIsAct.SelectedValue);
            model.sn =string.IsNullOrEmpty(txtSn.Text)==false? int.Parse(txtSn.Text):99999;
            model.source_id = int.Parse(hfClassId.Value);
            model.remark = txtRemark.Text;

            model.img_src = UploadImg(fileImgSrc, model.img_src);
            if (model.img_src != "")
            {
                imgSrc.ImageUrl = model.img_src;
                fileImgSrc.Visible = false;
                btnDeleImgSrc.Visible = true;
            }
            return model;
        }
        private string UploadImg(FileUpload fileUpload, string imgUrl)
        {

            if (fileUpload.FileName != "")
            {
                string UploadFilesPath = ConfigurationManager.AppSettings["UploadFilesPath"] + "bucket/"+hfClassId.Value+"/";
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
            if (txtFileTitle.Text.Trim() == "")
            {
                strErr += "文件名不能为空！\\n";
            }
            if (SfSoft.Common.PageValidate.IsNumber1(txtSn.Text) == false) {
                strErr += "顺序是类型有识误，请输入数字型！\\n";
            }
            if (txtFileLink.Text.Trim() == "") {
                strErr += "文件地址不能为空！\\n";
            }
            return strErr;
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