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
namespace SfSoft.web.emc.expert.teacher
{
    public partial class update : SfSoft.SfEmc.EmcDetailPage
    {

        Model.WX_JJZH_Expert modelArts = new SfSoft.Model.WX_JJZH_Expert();
        BLL.WX_JJZH_Expert bllArts = new BLL.WX_JJZH_Expert();
        protected void Page_Load(object sender, EventArgs e)
        {
            if (!IsPostBack)
            {
                string mode = Request.Params["mode"].ToString();
                string ID = Request.Params["ID"].ToString();

                hfMode.Value = mode;
                hfID.Value = ID;
                hfMID.Value = "emc.expert.teacher";

                //新建
                if (hfMode.Value == "add")
                {
                    rblIsAct.Items.FindByValue("1").Selected = true;
                    rblIsRest.Items.FindByValue("1").Selected = true;
                    ddlExpertType.Items.FindByValue("1").Selected = true;
                    cblIsCheck.Checked = true;
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
            hfMID.Value = "emc.expert.teacher";
        }
        protected override void VtInitToolbars()
        {
            VtInitEditToolbars();
        }
        protected override void VtInitBaseToolsBars()
        {
            VtInitBaseDetailToolsBars();
        }
        private void ShowInfo(Model.WX_JJZH_Expert model)
        {
            txtDetail.Value = model.Detail;
            txtIntro.Text = model.Intro;
            txtTelephone.Text = model.TelePhone;
            txtUName.Text = model.UName;

            //var m = GetExpert(model.Id);

            txtSn.Text = (model.Sn ?? 99999).ToString();
            //txtInitLikeNumber.Text = (m.InitLikeNumber ?? 0).ToString();
            cbIsDefault.Checked = (model.IsDefault ?? 0) == 0 ? false : true;
            cblIsCheck.Checked = (model.IsCheck ?? 0) == 0 ? false : true;
            ddlExpertType.Items.FindByValue((model.ExpertType ?? 0).ToString()).Selected=true;
            lbLikeNumber.Text = (model.LikeNumber ?? 0).ToString();

            lbNickName.Text = model.NickName;
            lbOpenId.Text = model.OpenId;
            rblIsAct.Items.FindByValue(model.IsAct.ToString()).Selected = true;
            rblIsRest.Items.FindByValue(model.IsRest.ToString()).Selected = true;
            if (!string.IsNullOrEmpty(model.Sex)) {
                rblSex.Items.FindByValue(model.Sex).Selected = true;
            }
            if (model.ImgUrl.Trim() != "")
            {
                imgUrl.ImageUrl = model.ImgUrl;
                imgUrl.Visible = true;
                btnDeleLogo.Visible = true;
                fileimgUrl.Visible = false;
            }
            else
            {
                imgUrl.Visible = false;
                btnDeleLogo.Visible= false;
                fileimgUrl.Visible = true;
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
            Model.WX_JJZH_Expert model = new Model.WX_JJZH_Expert();
            //保存单据
            if (hfMode.Value == "add")
            {
                model = this.SetModelValue(model);
                model.Sn = 99999;
                int index = bllArts.Add(model);
                //AddExpert(index);
                hfMode.Value = "update";
            }
            else
            {
                string ID = hfID.Value;
                model = bllArts.GetModel(int.Parse(ID));
                model = this.SetModelValue(model);
                imgUrl.Visible = true;
                bllArts.Update(model);
                //UpdateExpert(model.Id);
            }
        }

        private Model.WX_JJZH_Expert SetModelValue(Model.WX_JJZH_Expert model)
        {
            model.Intro = txtIntro.Text;
            model.IsAct = int.Parse(rblIsAct.SelectedValue);
            model.IsRest = int.Parse(rblIsRest.SelectedValue);
            if (rblSex.SelectedItem != null) {
                model.Sex = rblSex.SelectedValue;
            }
            model.TelePhone = txtTelephone.Text;
            model.UName = txtUName.Text;
            model.Detail = txtDetail.Value;
            if (ddlExpertType.SelectedItem != null && ddlExpertType.SelectedValue != "0") {
                model.ExpertType = int.Parse(ddlExpertType.SelectedValue);
            }
            if (cbIsDefault.Checked == true)
            {
                model.IsDefault = 1;
            }
            else {
                model.IsDefault = 0;
            }
            model.ImgUrl = UploadImg(fileimgUrl, model.ImgUrl);
            if (model.ImgUrl != "")
            {
                imgUrl.ImageUrl = model.ImgUrl;
                fileimgUrl.Visible = false;
                btnDeleLogo.Visible = true;
            }
            if (cblIsCheck.Checked == true)
            {
                model.IsCheck = 1;
            }
            else {
                model.IsCheck = 0;
            }
            model.Sn = string.IsNullOrEmpty(txtSn.Text) == true ? 99999 : int.Parse(txtSn.Text);
            return model;
        }
        private string UploadImg( FileUpload fileUpload,string imgUrl)
        {
            string UploadFilesPath = ConfigurationManager.AppSettings["UploadFilesPath"] + "QA/";
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
            if (txtUName.Text.Trim() == "")
            {
                strErr += "名称不能为空！\\n";
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
                imgUrl.ImageUrl = modelArts.ImgUrl;
                fileimgUrl.Visible = true;
                btnDeleLogo.Visible = true;
                imgUrl.Visible = false;
            }
        }
        private bool IsExistAppId(string appId)
        {
            BLL.WX_JJZH_Expert bll = new BLL.WX_JJZH_Expert();
            DataSet ds = bll.GetList("AppId='" + appId + "'");
            if (ds != null && ds.Tables[0] != null && ds.Tables[0].Rows.Count > 0) {
                return true;
            }
            return false;
        }
        /*
        private Model.WX_QA_Expert GetExpert(int expertId)
        {
            BLL.WX_QA_Expert bll = new BLL.WX_QA_Expert();
            var model = bll.GetModel(expertId);
            if (model == null) {
                model = new Model.WX_QA_Expert();
            }
            return model;
        }
        private void AddExpert(int expertId)
        {
            BLL.WX_QA_Expert bll = new BLL.WX_QA_Expert();
            Model.WX_QA_Expert model = new Model.WX_QA_Expert();
            model.ExpertId = expertId;
            model.InitLikeNumber = string.IsNullOrEmpty(txtInitLikeNumber.Text) == true ? 0 : int.Parse(txtInitLikeNumber.Text);
            model.IsDefault = cbIsDefault.Checked == true ? 1 : 0;
            model.IsSystem = cbIsSystem.Checked == true ? 1 : 0;
            model.Sn = string.IsNullOrEmpty(txtSn.Text) == true ? 0 : int.Parse(txtSn.Text);
            bll.Add(model);
        }
        private void UpdateExpert(int expertId)
        {
            BLL.WX_QA_Expert bll = new BLL.WX_QA_Expert();
            Model.WX_QA_Expert model = new Model.WX_QA_Expert();
            model.ExpertId = expertId;
            model.InitLikeNumber = string.IsNullOrEmpty(txtInitLikeNumber.Text) == true ? 0 : int.Parse(txtInitLikeNumber.Text);
            model.IsDefault = cbIsDefault.Checked == true ? 1 : 0;
            model.IsSystem = cbIsSystem.Checked == true ? 1 : 0;
            model.Sn = string.IsNullOrEmpty(txtSn.Text) == true ? 0 : int.Parse(txtSn.Text);
            bll.Update(model);
        }
         * */
    }
}


