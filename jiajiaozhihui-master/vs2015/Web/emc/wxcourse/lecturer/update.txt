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
namespace SfSoft.web.emc.wxcourse.lecturer
{
    public partial class update : SfSoft.SfEmc.EmcDetailPage
    {

        Model.WX_Course_Lecturer modelArts = new SfSoft.Model.WX_Course_Lecturer();
        BLL.WX_Course_Lecturer bllArts = new BLL.WX_Course_Lecturer();
        protected void Page_Load(object sender, EventArgs e)
        {
            if (!IsPostBack)
            {
                string mode = Request.Params["mode"].ToString();
                string ID = Request.Params["ID"].ToString();

                hfMode.Value = mode;
                hfID.Value = ID;
                hfMID.Value = "emc.wxcourse.lecturer";
                //新建
                if (hfMode.Value == "add")
                {
                    
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
            hfMID.Value = "emc.wxcourse.lecturer";
        }
        protected override void VtInitToolbars()
        {
            VtInitEditToolbars();
        }
        protected override void VtInitBaseToolsBars()
        {
            VtInitBaseDetailToolsBars();
        }
        private void ShowInfo(Model.WX_Course_Lecturer model)
        {
            txtName.Text = model.Name;
            txtDepartMent.Text = model.DepartMent;
            txtPostion.Text = model.Postion;
            txtIntro.Text = model.Intro;
            txtDetails.Value = model.Intro;

            if (model.HeadImgUrl != "")
            {
                txtHeadImgUrl.Text = model.HeadImgUrl;
                txtHeadImgUrl.Visible = true;
                btnDelPic.Visible = true;
                btnView.Visible = true;
                btnView.NavigateUrl =ShenerWeiXin.WXConfig.AuthURL+model.HeadImgUrl.Substring(1);
            }
            else
            {
                txtHeadImgUrl.Visible = false;
                btnDelPic.Visible = false;
                btnView.Visible = false;
                btnView.NavigateUrl = "javascript:void(0)";
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
            Model.WX_Course_Lecturer model = new Model.WX_Course_Lecturer();
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
            }
        }

        private Model.WX_Course_Lecturer SetModelValue(Model.WX_Course_Lecturer model)
        {
            model.Name = txtName.Text;
            model.DepartMent = txtDepartMent.Text;
            model.Postion = txtPostion.Text;
            model.Intro = txtIntro.Text;
            model.Detail = txtDetails.Value;

            string UploadFilesPath = ConfigurationManager.AppSettings["UploadFilesPath"] + "lecturer/";
            if (fileUpload.FileName != "")
            {
                if (model.HeadImgUrl != "")
                {
                    FileUpLoadCommon.DeleteFile(model.HeadImgUrl);
                }
                string newfname = Common.FileUpLoadCommon.UpFile("", UploadFilesPath, fileUpload);
                string FilePath = UploadFilesPath + newfname;

                model.HeadImgUrl = FilePath;
                txtHeadImgUrl.Visible = true;
                txtHeadImgUrl.Text = model.HeadImgUrl;
                btnView.NavigateUrl = model.HeadImgUrl;
                btnDelPic.Visible = true;
                btnView.Visible = true;
            }
            return model;
        }
        private string checkform()
        {
            string strErr = "";
            if (txtName.Text.Trim() == "") {
                strErr += "姓名不能为空！\\n";
            }
            return strErr;
        }
        protected void btnDelPic_Click(object sender, EventArgs e)
        {
            modelArts = bllArts.GetModel(int.Parse(hfID.Value));
            if (modelArts.HeadImgUrl != "" || modelArts.HeadImgUrl != null)
            {
                FileUpLoadCommon.DeleteFile(modelArts.HeadImgUrl);
                modelArts.HeadImgUrl = "";
                bllArts.Update(modelArts);
                txtHeadImgUrl.Text = "";
                txtHeadImgUrl.Visible = false;
                btnDelPic.Visible = false;
            }
        }
    }
}


