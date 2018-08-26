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
namespace SfSoft.web.emc.education.courses
{
    public partial class update : SfSoft.SfEmc.EmcDetailPage
    {

        Model.WX_Courses modelArts = new SfSoft.Model.WX_Courses();
        BLL.WX_Courses bllArts = new BLL.WX_Courses();
        protected void Page_Load(object sender, EventArgs e)
        {
            if (!IsPostBack)
            {
                string mode = Request.Params["mode"].ToString();
                string ID = Request.Params["ID"].ToString();

                hfMode.Value = mode;
                hfID.Value = ID;
                hfMID.Value = "emc.education.courses";

                //新建
                if (hfMode.Value == "add")
                {
                    txtCreator.Text = Session["CnName"].ToString();
                    ddlIsAct.Items.FindByValue("1").Selected = true;
                    rblShow.Items.FindByValue("0").Selected = true;
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
            hfMID.Value = "emc.education.courses";
        }
        protected override void VtInitToolbars()
        {
            VtInitEditToolbars();
        }
        protected override void VtInitBaseToolsBars()
        {
            VtInitBaseDetailToolsBars();
        }
        private void ShowInfo(Model.WX_Courses model)
        {
            txtTopic.Text = model.Topic;
            fckInfoDetail.Value = model.ArtContent;
            txtCreator.Text = model.Creator;
            
            txtInfoDesc.Value = model.InfoDesc;

            if (model.Area != null) {
                ddlGroup.Items.FindByValue(model.Area.ToString()).Selected = true;
            }

            if (model.IsAct != null ) {
                ddlIsAct.Items.FindByValue(model.IsAct.ToString()).Selected = true;
            }
            rblShow.SelectedValue = model.IsShow.ToString();

            if (model.ImgUrl != "")
            {
                imgUrl.ImageUrl = model.ImgUrl;
                imgUrl.Visible = true;
                btnDelPic.Visible = true;
            }
            else
            {
                imgUrl.Visible = false;
                btnDelPic.Visible = false;
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
            Model.WX_Courses model = new Model.WX_Courses();
            //保存单据
            if (hfMode.Value == "add")
            {
                ddlIsAct.Items.FindByValue("1").Selected = true;
                model = this.SetModelValue(model);
                model.TwoDimension = "";
                model.ClickNum = 0;
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

        private Model.WX_Courses SetModelValue(Model.WX_Courses model)
        {
            model.ArtContent = fckInfoDetail.Value;
            model.Creator = Session["CnName"].ToString();
            model.modifier = Session["CnName"].ToString();
            model.mtime = DateTime.Now;
            model.IsShow =int.Parse( rblShow.SelectedValue);
            if (ddlIsAct.SelectedItem != null) {
                model.IsAct= int.Parse( ddlIsAct.SelectedValue);
            }
            model.Topic = txtTopic.Text;
            model.InfoDesc = txtInfoDesc.Value;
            if (ddlGroup.SelectedItem != null && ddlGroup.SelectedValue != "") {
                model.Area =int.Parse(ddlGroup.SelectedValue);
            }
            string UploadFilesPath = ConfigurationManager.AppSettings["UploadFilesPath"] + "upload/";
            if (fuImgUrl.FileName != "")
            {
                if (model.ImgUrl != "")
                {
                    FileUpLoadCommon.DeleteFile(model.ImgUrl);
                }
                string newfname = Common.FileUpLoadCommon.UpFile("", UploadFilesPath, fuImgUrl);
                string FilePath = UploadFilesPath + newfname;

                model.ImgUrl = FilePath;
                imgUrl.Visible = true;
                imgUrl.ImageUrl = model.ImgUrl;
                btnDelPic.Visible = true;
            }
            return model;
        }
        private string checkform()
        {
            string strErr = "";

            if (this.txtTopic.Text == "")
            {
                strErr += "标题不能为空！\\n";
            }
            
            if (this.txtCreator.Text == "")
            {
                strErr += "发布人不能为空！\\n";
            }
            if (this.ddlGroup.SelectedValue == "" || this.ddlGroup.SelectedItem == null) {
                strErr += "选择分组!\\n";
            }
            return strErr;
        }
        private string WriteCorde(string content, string path)
        {
            SfEmc.QRCode qrcode = new SfEmc.QRCode();
            return qrcode.WriteBarcode(content, path);
        }

        protected void btnDelPic_Click(object sender, EventArgs e)
        {
            modelArts = bllArts.GetModel(int.Parse(hfID.Value));
            if (modelArts.ImgUrl != "" || modelArts.ImgUrl != null)
            {
                FileUpLoadCommon.DeleteFile(modelArts.ImgUrl);
                modelArts.ImgUrl = "";
                bllArts.Update(modelArts);
                imgUrl.ImageUrl = "";
                imgUrl.Visible = false;
                btnDelPic.Visible = false;
            }
        }
    }
}


