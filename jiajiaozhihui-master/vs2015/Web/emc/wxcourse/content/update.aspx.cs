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
namespace SfSoft.web.emc.wxcourse.content
{
    public partial class update : SfSoft.SfEmc.EmcDetailPage
    {
        Model.WX_Course_Content modelArts = new SfSoft.Model.WX_Course_Content();
        BLL.WX_Course_Content bllArts = new BLL.WX_Course_Content();
        protected void Page_Load(object sender, EventArgs e)
        {
            
            if (!IsPostBack)
            {
                hfMode.Value = Request.Params["state"].ToString();
                hfSectionId.Value = Request.QueryString["sectionId"];
                hfCourseId.Value = hfSectionId.Value.Split('|')[0];
                
                hfSubSectionId.Value = Request.QueryString["subSectionId"];
                hfContentId.Value = Request.QueryString["id"];

                SetTabName();
                hfMID.Value = "emc.wxcourse.content";
                InitDropDownList();
                //修改
                if (hfMode.Value == "update")
                {
                    modelArts = bllArts.GetModel(int.Parse(hfContentId.Value));
                    if (modelArts != null)
                    {
                        this.ShowInfo(modelArts);
                    }
                }
                if (hfMode.Value == "add") {
                    ddlIsAct.Items.FindByValue("1").Selected = true;
                    if (hfCourseId.Value != "")
                    {
                        string courseId = GetCourseId();
                        txtCourseName.Text = GetCourse(int.Parse(courseId));
                    }
                }
                //tsbtnReturn.OnClientClick = "document.frames('IFRAME1').OpenDocument('" + hfSectionId.Value + "','" + hfCourseId.Value + "')"; /*document.location = 'browse.aspx?ID=" + hfPid.Value + "'; return false";*/
            }
        }
        //1.初始化模块ID
        protected override void VtInitMID()
        {
            hfMID.Value = "emc.wxcourse.content";
        }
        protected override void VtInitToolbars()
        {
            VtInitEditToolbars();
        }
        protected override void VtReturnClientEvent()
        {
            
        }
        protected override void VtInitBaseToolsBars()
        {
            VtInitBaseDetailToolsBars();
        }
        private void ShowInfo(Model.WX_Course_Content model)
        {
            txtContent.Value = model.Content;
            if (model.Duration != null) {
                txtDuration.Text = model.Duration.ToString();
            }
            txtSn.Text = model.Sn.ToString();
            txtUrl.Text = model.Url;
            if (model.Type != null) {
                ddlType.Items.FindByValue(model.Type.ToString()).Selected = true;
                switch (model.Type) { 
                    case 1 :
                        txt.Attributes.CssStyle.Add("display","none");
                        url.Attributes.Remove("style");
                        duration.Attributes.CssStyle.Add("display","block");
                        iframe.Attributes.CssStyle.Add("display","block");
                        responsive.Attributes.CssStyle.Add("display","block");
                        break;
                    case 2:
                        txt.Attributes.CssStyle.Add("display", "none");
                        url.Attributes.Remove("style");
                        duration.Attributes.CssStyle.Add("display","block");
                        iframe.Attributes.CssStyle.Add("display","none");
                        responsive.Attributes.CssStyle.Add("display","none");
                        break;
                    case 3:
                        txt.Attributes.CssStyle.Add("display", "none");
                        url.Attributes.CssStyle.Add("display", "none");
                        duration.Attributes.CssStyle.Add("display","none");
                        iframe.Attributes.CssStyle.Add("display","none");
                        responsive.Attributes.CssStyle.Add("display","none");
                        break;
                    case 4:
                        txt.Attributes.Remove("style");
                        url.Attributes.CssStyle.Add("display", "none");
                        duration.Attributes.CssStyle.Add("display","none");
                        iframe.Attributes.CssStyle.Add("display","none");
                        responsive.Attributes.CssStyle.Add("display","none");
                        break;
                    default:
                        txt.Attributes.CssStyle.Add("display", "none");
                        url.Attributes.CssStyle.Add("display", "none");
                        duration.Attributes.CssStyle.Add("display","none");
                        iframe.Attributes.CssStyle.Add("display","none");
                        responsive.Attributes.CssStyle.Add("display","none");
                        break;
                }
            }
            if (model.IsAct != null) {
                ddlIsAct.Items.FindByValue(model.IsAct.ToString()).Selected = true;
            }
            if (model.CourseId != 0) {
                txtCourseName.Text = GetCourse(model.CourseId);
            }
            if (model.Isiframe != null && model.Isiframe != 0) {
                cbIsiframe.Checked = true;
            }
            if (model.Responsive != "") {
                rblResponsive.Items.FindByValue(model.Responsive).Selected = true;
            }
            if (model.Cover != "")
            {
                txtCover.Text = model.Cover;
                txtCover.Visible = true;
                btnDelPic.Visible = true;
                btnView.Visible = true;
                btnView.NavigateUrl = ShenerWeiXin.WXConfig.AuthURL + model.Cover.Substring(1);
            }
            else
            {
                txtCover.Visible = false;
                btnDelPic.Visible = false;
                btnView.Visible = false;
                btnView.NavigateUrl = "javascript:void(0)";
            }
            txtCname.Text = model.Cname;
            if (!string.IsNullOrEmpty(model.Roles)) {
                rblRoles.Items.FindByValue(model.Roles).Selected = true;
            }
            cbShow.Checked = (model.AtOnceShow ?? 0) == 0 ? false : true;
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
            Model.WX_Course_Content model = new Model.WX_Course_Content();
            //保存单据
            if (hfMode.Value == "add")
            {
                model = this.SetModelValue(model);
                model.CreateDate = DateTime.Now;
                model.CourseId =int.Parse(hfCourseId.Value);
                int index = bllArts.Add(model);
                hfMode.Value = "update";
            }
            else
            {
                string ID = hfContentId.Value;
                model = bllArts.GetModel(int.Parse(ID));
                model = this.SetModelValue(model);                
                bllArts.Update(model);
            }
        }

        private Model.WX_Course_Content SetModelValue(Model.WX_Course_Content model)
        {
            if (hfCourseId.Value != "") {
                string courseId = GetCourseId();
                model.CourseId = int.Parse(courseId);
            }
            if (ddlIsAct.SelectedItem != null && ddlIsAct.SelectedValue != "") {
                model.IsAct = int.Parse(ddlIsAct.SelectedValue);
            }
            model.AtOnceShow = cbShow.Checked == true ? 1 : 0;

            model.SectionId = hfSectionId.Value;
            if (ddlType.SelectedItem != null && ddlType.SelectedValue != "") {
                model.Type = int.Parse(ddlType.SelectedValue);
                switch (model.Type) { 
                    case 2:
                        model.Content = "";
                        model.Cover = "";
                        model.Isiframe = null;
                        model.Responsive = null;
                        if (txtDuration.Text != "")
                        {
                            model.Duration = decimal.Parse(txtDuration.Text);
                        }
                        model.Url = txtUrl.Text;
                        break;
                    case 1:
                        if (cbIsiframe.Checked) {
                            model.Isiframe = 1;
                        }else{
                            model.Isiframe = null;
                        };
                        if (rblResponsive.SelectedItem != null && rblResponsive.SelectedValue != "")
                        {
                            model.Responsive = rblResponsive.SelectedValue;
                        }
                        else {
                            model.Responsive = null;
                        }
                        if (txtDuration.Text != "")
                        {
                            model.Duration = decimal.Parse(txtDuration.Text);
                        }
                        else {
                            model.Duration = null;
                        }
                        model.Url = txtUrl.Text;
                        model.Content = "";
                        model.Cover = txtCover.Text;
                        break;

                    case 3:
                        model.Content = "";
                        model.Cover = "";
                        model.Isiframe = null;
                        model.Responsive = null;
                        model.Duration = null;
                        break;
                    case 4:
                        model.Isiframe = null;
                        model.Responsive = null;
                        model.Cover = "";
                        model.Duration = null;
                        model.Content = txtContent.Value;
                        break;
                }

            }
            if (txtSn.Text != "") {
                model.Sn = int.Parse(txtSn.Text);
            }

            string UploadFilesPath = ConfigurationManager.AppSettings["UploadFilesPath"] + "course/";
            if (fileUpload.FileName != "")
            {
                if (model.Cover != "")
                {
                    FileUpLoadCommon.DeleteFile(model.Cover);
                }
                string newfname = Common.FileUpLoadCommon.UpFile("", UploadFilesPath, fileUpload);
                string FilePath = UploadFilesPath + newfname;

                model.Cover = FilePath;
                txtCover.Visible = true;
                txtCover.Text = model.Cover;
                btnView.NavigateUrl = model.Cover;
                btnDelPic.Visible = true;
                btnView.Visible = true;
            }
            model.Cname = txtCname.Text;
            model.Roles = rblRoles.SelectedItem != null && rblRoles.SelectedValue != "" ? rblRoles.SelectedValue : "";
            return model;
        }
        private string checkform()
        {
            string strErr = "";
            if (ddlType.SelectedItem == null || ddlType.SelectedValue == "") {
                strErr += "请选择类型！\\n";
            }
            if (ddlIsAct.SelectedItem == null || ddlIsAct.SelectedValue == "") {
                strErr += "请选择是否发布！\\n";
            }
            return strErr;
        }
        private void InitDropDownList()
        {
            //BLL.WX_Course bll = new BLL.WX_Course();
            //System.Collections.Generic.List<Model.WX_Course> list = bll.GetModelList("SaleState=1 and LearnState=1");
            //foreach (Model.WX_Course m in list) {
            //    ddlCourseName.Items.Add(new ListItem() { Value=m.Id.ToString(), Text=m.Name });
            //}
            //ddlCourseName.Items.Insert(0, new ListItem() { Text="",Value="" });
        }

        protected void btnDelPic_Click(object sender, EventArgs e)
        {
            modelArts = bllArts.GetModel(int.Parse(hfContentId.Value));
            if (modelArts.Cover != "" || modelArts.Cover != null)
            {
                FileUpLoadCommon.DeleteFile(modelArts.Cover);
                modelArts.Cover = "";
                bllArts.Update(modelArts);
                txtCover.Text = "";
                txtCover.Visible = false;
                btnDelPic.Visible = false;
            }
        }

        protected string GetCourse(int id)
        {
            BLL.WX_Course bll = new BLL.WX_Course();
            Model.WX_Course model = bll.GetModel(id);
            if (model != null)
            {
                return model.Name;
            }
            return "";
        }
        private void SetTabName()
        {
            string courseId = GetCourseId();

            BLL.WX_Course bllBdc = new BLL.WX_Course();
            Model.WX_Course model = bllBdc.GetModel(int.Parse(courseId));
            string tabname = "";
            if (model != null)
            {
                tabname += model.Name;
                BLL.WX_Course_Section bll = new BLL.WX_Course_Section();
                var list = bll.GetModelList("ClassifyId=" + courseId);
                var section = list.Find(e => e.Id == int.Parse(GetSection1()));
                if (section != null)
                {
                    tabname += "-" + section.SectionName;
                }
                section = list.Find(e => e.Id == int.Parse(GetSection2()));
                if (section != null)
                {
                    tabname += "-" + section.SectionName;
                }
            }
            TabOptionItem1.Tab_Name = tabname;
        }
        private string GetCourseId()
        {
            return hfSectionId.Value.Split('|')[0];
        }
        private string GetSection1()
        {
            string[] sections = hfSectionId.Value.Split('|');
            if (sections.Length > 1) {
                return sections[1];
            }
            return "0";
        }

        private string GetSection2()
        {
            string[] sections = hfSectionId.Value.Split('|');
            if (sections.Length > 2)
            {
                return sections[2];
            }
            return "0";
        }
    }
}


