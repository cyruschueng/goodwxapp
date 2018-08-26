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
using SfSoft.Common;
namespace SfSoft.web.emc.wxcourse.bagset
{
    public partial class update : SfSoft.SfEmc.EmcDetailPage
    {

        Model.WX_Course_SetBag modelArts = new SfSoft.Model.WX_Course_SetBag();
        BLL.WX_Course_SetBag bllArts = new BLL.WX_Course_SetBag();
        protected void Page_Load(object sender, EventArgs e)
        {
            if (!IsPostBack)
            {
                string mode = Request.Params["mode"].ToString();
                string ID = Request.Params["ID"].ToString();

                hfMode.Value = mode;
                hfID.Value = ID;
                hfMID.Value = "emc.wxcourse.bagset";

                BLL.WX_Course_SetBag bll = new BLL.WX_Course_SetBag();
                //新建
                if (hfMode.Value == "add")
                {
                    cbIsAct.Checked = true;
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
            hfMID.Value = "emc.wxcourse.bagset";
        }
        protected override void VtInitToolbars()
        {
            VtInitEditToolbars();
        }
        protected override void VtInitBaseToolsBars()
        {
            VtInitBaseDetailToolsBars();
        }
        private void ShowInfo(Model.WX_Course_SetBag model)
        {
            txtBagName.Text = model.BagName;
            txtBuyNumber1.Text = (model.BuyNumber1 ?? 0).ToString();
            txtDetails.Value = model.Details;
            txtIntro.Text = model.Intro;
            hfLecturer.Value = (model.Lecturer ?? 0).ToString();
            txtLecturer.Text = GetExpertName(model.Lecturer??0);
            txtOriginalPrice.Text = (model.OriginalPrice ?? 0).ToString();
            txtPreferentialPrice.Text = (model.PreferentialPrice ?? 0).ToString();
            cbIsAct.Checked = (model.IsAct ?? 0) == 0 ? false : true;
            if (model.ImgUrl != "")
            {
                txtImgUrl.Text = model.ImgUrl;
                txtImgUrl.Visible = true;
                btnDelPic.Visible = true;
                btnView.Visible = true;
                btnView.NavigateUrl =ShenerWeiXin.WXConfig.AuthURL+model.ImgUrl.Substring(1);
            }
            else
            {
                txtImgUrl.Visible = false;
                btnDelPic.Visible = false;
                btnView.Visible = false;
                btnView.NavigateUrl = "javascript:void(0)";
            }

            if (model.MiniImgUrl != "")
            {
                txtImgUrlMini.Text = model.MiniImgUrl;
                txtImgUrlMini.Visible = true;
                btnDelPicMini.Visible = true;
                btnViewMini.Visible = true;
                btnViewMini.NavigateUrl = ShenerWeiXin.WXConfig.AuthURL + model.MiniImgUrl.Substring(1);
            }
            else
            {
                txtImgUrlMini.Visible = false;
                btnDelPicMini.Visible = false;
                btnViewMini.Visible = false;
                btnViewMini.NavigateUrl = "javascript:void(0)";
            }
            if (model.MediaType != null) {
                ddlMediaType.Items.FindByValue((model.MediaType ?? 0).ToString()).Selected = true;
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
            Model.WX_Course_SetBag model = new Model.WX_Course_SetBag();
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

        private Model.WX_Course_SetBag SetModelValue(Model.WX_Course_SetBag model)
        {

            model.BagName = txtBagName.Text;
            model.BuyNumber1 = (string.IsNullOrEmpty(txtBuyNumber1.Text) != true && MyExtensions.IsNumber(txtBuyNumber1.Text) == true) ? int.Parse(txtBuyNumber1.Text):0;
            model.Details = txtDetails.Value;
            model.Intro = txtIntro.Text;
            string lecturer = "";
            if (!string.IsNullOrEmpty(hfLecturer.Value)) {
                if (hfLecturer.Value.Contains("@"))
                {
                    lecturer = hfLecturer.Value.Split('@')[1];
                }
                else {
                    lecturer = hfLecturer.Value;
                }
            }
            model.Lecturer = (string.IsNullOrEmpty(lecturer) != true && MyExtensions.IsNumber(lecturer) == true) ? int.Parse(lecturer) : 0;
            model.OriginalPrice = (string.IsNullOrEmpty(txtOriginalPrice.Text) != true && (MyExtensions.IsNumber(txtOriginalPrice.Text)==true || MyExtensions.Isdecimals(txtOriginalPrice.Text)==true) == true) ? decimal.Parse(txtOriginalPrice.Text) : 0;
            model.PreferentialPrice = (string.IsNullOrEmpty(txtPreferentialPrice.Text) != true && (MyExtensions.IsNumber(txtPreferentialPrice.Text) || MyExtensions.Isdecimals(txtPreferentialPrice.Text)) == true) ? decimal.Parse(txtPreferentialPrice.Text) : 0;
            model.IsAct = cbIsAct.Checked == true ? 1 : 0;

            string UploadFilesPath = ConfigurationManager.AppSettings["UploadFilesPath"] + "course/";
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

            if (fileUploadMini.FileName != "")
            {
                if (model.MiniImgUrl != "")
                {
                    FileUpLoadCommon.DeleteFile(model.MiniImgUrl);
                }
                string newfname = Common.FileUpLoadCommon.UpFile("", UploadFilesPath, fileUploadMini);
                string FilePath = UploadFilesPath + newfname;

                model.MiniImgUrl = FilePath;
                txtImgUrlMini.Visible = true;
                txtImgUrlMini.Text = model.MiniImgUrl;
                btnViewMini.NavigateUrl = model.MiniImgUrl;
                btnDelPicMini.Visible = true;
                btnViewMini.Visible = true;
            }

            if (ddlMediaType.SelectedItem != null && ddlMediaType.SelectedValue != "") {
                model.MediaType = int.Parse(ddlMediaType.SelectedValue);
            }
            return model;
        }
        private string checkform()
        {
            string strErr = "";

            if (txtBagName.Text.Trim() == "")
            {
                strErr += "课程包名不能为空！\\n";
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
                txtImgUrl.Visible = false;
                btnDelPic.Visible = false;
            }
        }

        protected void btnDelPicMini_Click(object sender, EventArgs e)
        {
            modelArts = bllArts.GetModel(int.Parse(hfID.Value));
            if (modelArts.MiniImgUrl != "" || modelArts.MiniImgUrl != null)
            {
                FileUpLoadCommon.DeleteFile(modelArts.MiniImgUrl);
                modelArts.MiniImgUrl = "";
                bllArts.Update(modelArts);
                txtImgUrlMini.Text = "";
                txtImgUrlMini.Visible = false;
                btnDelPicMini.Visible = false;
            }
        }
        private string GetExpertName(int expertId)
        {
            BLL.WX_JJZH_Expert bll = new BLL.WX_JJZH_Expert();
            var model= bll.GetModel(expertId);
            if (model != null) {
                return model.UName;
            }
            return "";
        }
        private bool Testd(string values)
        {
            System.Text.RegularExpressions.Regex rex = new System.Text.RegularExpressions.Regex(@"^-?\d+$");
            if (rex.IsMatch(values))
            {
                return true;
            }
            else
                return false;
        }
    }
}


