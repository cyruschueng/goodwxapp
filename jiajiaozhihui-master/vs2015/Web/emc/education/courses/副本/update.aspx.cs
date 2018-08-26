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
                    txtPubDate.Text = PageValidate.FormatSmallDate(DateTime.Now);
                    txtCreator.Text = Session["CnName"].ToString();
                    ddlIsAct.Items.FindByValue("1").Selected = true;
                    ddlIsTele.Items.FindByValue("1").Selected = true;
                    rblShow.Items.FindByValue("1").Selected = true;
                    txtEnrollment.Text = "0";
                }
                //修改
                if (hfMode.Value == "update")
                {
                    modelArts = bllArts.GetModel(int.Parse(ID));
                    if (modelArts != null)
                    {
                        this.ShowInfo(modelArts);
                    }
                    BindData(ID);
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
            txtPubDate.Text =string.Format("{0:d}", model.PubDate);
            txtEnrollment.Text = model.Enrollment.ToString();
            fckInfoDetail.Value = model.ArtContent;
            rblStatus.SelectedValue = model.SendStatus.ToString();
            txtCreator.Text = model.Creator;
            
            txtInfoDesc.Value = model.InfoDesc;
            if (model.ValidityDate != null) {
                txtValidityDate.Text = model.ValidityDate.ToString();
            }
            if (model.IsAct != null ) {
                ddlIsAct.Items.FindByValue(model.IsAct.ToString()).Selected = true;
            }
            if (model.IsTele != null)
            {
                ddlIsTele.Items.FindByValue(model.IsTele.ToString()).Selected = true;
            }
            if (model.EndDate != null)
            {
                txtEndDate.Text = model.EndDate.ToString();
            }
            rblShow.SelectedValue = model.IsShow.ToString();
            txtCourseUrl.Text = model.CourseUrl;

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
                ddlIsTele.Items.FindByValue("1").Selected = true;
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
            model.Enrollment =string.IsNullOrEmpty(txtEnrollment.Text)?0:int.Parse(txtEnrollment.Text);
            model.modifier = Session["CnName"].ToString();
            model.mtime = DateTime.Now;
            model.PubDate =DateTime.Parse( txtPubDate.Text);
            model.SendStatus =int.Parse( rblStatus.SelectedValue);
            model.IsShow =int.Parse( rblShow.SelectedValue);
            if (ddlIsAct.SelectedItem != null) {
                model.IsAct= int.Parse( ddlIsAct.SelectedValue);
            }
            if (ddlIsTele.SelectedItem != null)
            {
                model.IsTele = int.Parse(ddlIsTele.SelectedValue);
            }
            model.Topic = txtTopic.Text;
            model.CourseUrl = txtCourseUrl.Text;
            if (txtValidityDate.Text != "") {
                model.ValidityDate =DateTime.Parse( txtValidityDate.Text);
            }
            model.InfoDesc = txtInfoDesc.Value;
            if (txtEndDate.Text != "")
            {
                model.EndDate = DateTime.Parse(txtEndDate.Text);
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
            if (!PageValidate.IsDateTime(this.txtPubDate.Text))
            {
                strErr += "发布日期不是时间格式！\\n";
            }
            
            if (!PageValidate.IsDecimal(this.txtEnrollment.Text))
            {
                strErr += "活动参加人上限不是数字！\\n";
            }
            if (this.txtCreator.Text == "")
            {
                strErr += "发布人不能为空！\\n";
            }
            if (this.txtCourseUrl.Text == "")
            {
                strErr += "课程链接不能为空！\\n";
            }
            return strErr;
        }
        private string WriteCorde(string content, string path)
        {
            SfEmc.QRCode qrcode = new SfEmc.QRCode();
            return qrcode.WriteBarcode(content, path);
        }

        private void BindData(string id)
        {
            BLL.WX_WaitingList bll = new BLL.WX_WaitingList();
            DataSet ds = bll.GetList("artid=" + id);

            if (ds != null && ds.Tables[0] != null && ds.Tables[0].Rows.Count > 0)
            {
                PagedDataSource pds = new PagedDataSource();
                pds.DataSource = ds.Tables[0].DefaultView;
                AspNetPager1.RecordCount = pds.Count;
                pds.AllowPaging = true;
                pds.CurrentPageIndex = AspNetPager1.CurrentPageIndex - 1;
                pds.PageSize = AspNetPager1.PageSize;
                GridView1.PageIndex = AspNetPager1.CurrentPageIndex - 1;
                this.GridView1.DataSource = pds;
                this.GridView1.DataBind();
            }
            else
            {
                AspNetPager1.RecordCount = 0;
                Common.SetEmptyGridView.GridViewDataBind(GridView1, ds.Tables[0]);
            }
        }
        protected void GridView1_PageIndexChanging(Object sender, GridViewPageEventArgs e)
        {
            GridView1.PageIndex = e.NewPageIndex;
            BindData(hfID.Value);
        }
        protected void AspNetPager1_PageChanged(object sender, EventArgs e)
        {
            BindData(hfID.Value);
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


