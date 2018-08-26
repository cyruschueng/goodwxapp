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
namespace SfSoft.web.emc.zxs.task
{
    public partial class update : SfSoft.SfEmc.EmcDetailPage
    {

        Model.WX_ZXS_Task modelArts = new SfSoft.Model.WX_ZXS_Task();
        BLL.WX_ZXS_Task bllArts = new BLL.WX_ZXS_Task();
        protected void Page_Load(object sender, EventArgs e)
        {
            if (!IsPostBack)
            {
                string mode = Request.Params["mode"].ToString();
                string ID = Request.Params["ID"].ToString();

                hfMode.Value = mode;
                hfID.Value = ID;
                hfMID.Value = "emc.zxs.task";

                //新建
                if (hfMode.Value == "add")
                {
                    ddlIsAct.Items.FindByValue("1").Selected = true;
                    rblHZ.Items.FindByValue("1").Selected = true;
                    ddlTime.Items.FindByValue("1").Selected = true;
                    rblTaskType.Items.FindByValue("1").Selected = true;
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
            hfMID.Value = "emc.zxs.task";
        }
        protected override void VtInitToolbars()
        {
            VtInitEditToolbars();
        }
        protected override void VtInitBaseToolsBars()
        {
            VtInitBaseDetailToolsBars();
        }
        private void ShowInfo(Model.WX_ZXS_Task model)
        {
            txtRemark.Text = model.Remark;
            if (model.Time != null) {
                ddlTime.Items.FindByValue(model.Time.ToString()).Selected = true;
            }
            rblHZ.Items.FindByValue(model.HZ.ToString()).Selected = true;

            if (model.Unit != null) {
                ddlUnit.Items.FindByValue(model.Unit).Selected = true;
            }
            txtTitle.Text = model.Title;
            if (model.TaskType != null) {
                rblTaskType.Items.FindByValue(model.TaskType.ToString()).Selected = true;
            }
            if (model.IsAct != null) {
                ddlIsAct.Items.FindByValue(model.IsAct.ToString()).Selected = true;
            }
            txtIntroduce.Value = model.Introduce;

            if (model.ImgLogo.Trim() != "")
            {
                imgLogo.ImageUrl = model.ImgLogo;
                imgLogo.Visible = true;
                btnDeleLogo.Visible = true;
                fileLogo.Visible = false;
            }
            else
            {
                imgLogo.Visible = false;
                btnDeleLogo.Visible = false;
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
            Model.WX_ZXS_Task model = new Model.WX_ZXS_Task();
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

        private Model.WX_ZXS_Task SetModelValue(Model.WX_ZXS_Task model)
        {
            if (ddlIsAct.SelectedItem != null && ddlIsAct.SelectedValue != "")
            {
                model.IsAct = Convert.ToInt32(ddlIsAct.SelectedValue);
            }
            else {
                model.IsAct = 0;
            }
            if (rblTaskType.SelectedItem != null && rblTaskType.SelectedValue != "")
            {
                model.TaskType = Convert.ToInt32(rblTaskType.SelectedValue);
            }
            model.Remark = txtRemark.Text;
            if (ddlTime.SelectedItem != null && ddlTime.SelectedValue != "") {
                model.Time = int.Parse(ddlTime.SelectedValue);
            }
            if (ddlUnit.SelectedItem != null && ddlUnit.SelectedValue != "") {
                model.Unit = ddlUnit.SelectedValue;
            }
            if (rblHZ.SelectedItem != null && rblHZ.SelectedValue != "") {
                model.HZ = int.Parse(rblHZ.SelectedValue);
            }
            model.Title = txtTitle.Text;
            model.AppId = "";
            model.Introduce = txtIntroduce.Value;
            model.ImgLogo = UploadImg(fileLogo, model.ImgLogo);
            if (model.ImgLogo != "")
            {
                imgLogo.ImageUrl = model.ImgLogo;
                fileLogo.Visible = false;
                btnDeleLogo.Visible = true;
            }
            return model;
        }
        private string checkform()
        {
            string strErr = "";
            if (ddlIsAct.SelectedItem == null || ddlIsAct.SelectedValue == "") {
                strErr += "状态不能为空！\\n";
            }
            if (rblTaskType.SelectedItem == null)
            {
                strErr += "任务要求不能为空！\\n";
            }
            if (txtTitle.Text.Trim() == "") {
                strErr += "任务名称不能为空！\\n";
            }
            if (rblHZ.SelectedItem == null || rblHZ.SelectedValue == "") {
                strErr += "执行日期不能为空！\\n";
            }
            if (ddlTime.SelectedItem == null || ddlTime.SelectedValue == "")
            {
                strErr += "任务频率不能为空！\\n";
            }
            return strErr;
        }
        private string UploadImg(FileUpload fileUpload, string imgUrl)
        {
            string UploadFilesPath = ConfigurationManager.AppSettings["UploadFilesPath"] + "zxs/";
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
        protected void btnDelPic_Click(object sender, EventArgs e)
        {
            modelArts = bllArts.GetModel(int.Parse(hfID.Value));
            if (modelArts.ImgLogo != "" || modelArts.ImgLogo != null)
            {
                FileUpLoadCommon.DeleteFile(modelArts.ImgLogo);
                modelArts.ImgLogo = "";
                bllArts.Update(modelArts);
                imgLogo.ImageUrl = modelArts.ImgLogo;
                fileLogo.Visible = true;
                btnDeleLogo.Visible = true;
                imgLogo.Visible = false;
            }
        }
    }
}


