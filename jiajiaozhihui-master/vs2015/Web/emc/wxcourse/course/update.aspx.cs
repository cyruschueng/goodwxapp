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
using FluentScheduler;
using SfSoft.web.emc.wxcourse.notified;
namespace SfSoft.web.emc.wxcourse.course
{
    public partial class update : SfSoft.SfEmc.EmcDetailPage
    {

        Model.WX_Course modelArts = new SfSoft.Model.WX_Course();
        BLL.WX_Course bllArts = new BLL.WX_Course();
        protected void Page_Load(object sender, EventArgs e)
        {
            GetLecturer();
            if (!IsPostBack)
            {
                string mode = Request.Params["mode"].ToString();
                string ID = Request.Params["ID"].ToString();

                hfMode.Value = mode;
                hfID.Value = ID;
                hfMID.Value = "emc.wxcourse.course";

                InitDropDownList();
                BLL.WX_Course_Reward bll = new BLL.WX_Course_Reward();
                Session["CourseReward"] = bll.GetModelList("");
                //新建
                if (hfMode.Value == "add")
                {
                    ddlCommentState.Items.FindByValue("1").Selected = true;
                    ddlLearnState.Items.FindByValue("1").Selected = true;
                    ddlSaleState.Items.FindByValue("1").Selected = true;
                    txtOnLineDateTime.Text = DateTime.Now.ToShortDateString();
                    txtDuration.Text = "0";
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
            hfMID.Value = "emc.wxcourse.course";
        }
        protected override void VtInitToolbars()
        {
            VtInitEditToolbars();
        }
        protected override void VtInitBaseToolsBars()
        {
            VtInitBaseDetailToolsBars();
        }
        private void ShowInfo(Model.WX_Course model)
        {
            txtBuyNumber.Text = model.BuyNumber.ToString();
            txtBuyNumber1.Text = model.BuyNumber1.ToString();
            txtDetails.Value = model.Details;
            txtDuration.Text = model.Duration.ToString();
            txtImgUrl.Text = model.ImgUrl;
            txtIntro.Text = model.Intro;
            if (Session["Lecturer"] != null) {
                Dictionary<string, string> dicLecturer = Session["Lecturer"] as Dictionary<string, string>;
                if (dicLecturer.ContainsKey(model.Lecturer)) {
                    txtLecturer.Text = dicLecturer[model.Lecturer];
                }
            }
            if (model.Lecturer != "")
            {
                btnLecturerDele.Visible = true;
            }
            
            txtName.Text = model.Name;
            txtOnLineDateTime.Text = model.OnLineDateTime.ToString();
            txtOriginalPrice.Text = model.OriginalPrice.ToString();
            txtPreferentialPrice.Text = model.PreferentialPrice.ToString();
            hfReward.Value = model.Reward;


            if ((model.CourseType ?? 0) != 0)
            {
                ddlCourseType.Items.FindByValue((model.CourseType ?? 0).ToString()).Selected = true;
            }

            if (model.CommentState != null) {
                ddlCommentState.Items.FindByValue(model.CommentState.ToString()).Selected = true;
            }
            if (model.LearnState != null) {
                ddlLearnState.Items.FindByValue(model.LearnState.ToString()).Selected = true;
            }
            if (model.SaleState != null)
            {
                ddlSaleState.Items.FindByValue(model.SaleState.ToString()).Selected = true;
            }
            if (model.ProviderId != null) {
                ddlProvider.Items.FindByValue(model.ProviderId.ToString()).Selected = true;
            }

            

            if (model.Theme != null) {
                ddlTheme.Items.FindByValue(model.Theme.ToString()).Selected = true;
            }
            
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
            if (model.MediaType != null)
            {
                ddlMediaType.Items.FindByValue((model.MediaType.ToString()).ToString()).Selected = true;
            }
            else {
                ddlMediaType.Items.FindByValue("").Selected = true;
            }
            if (model.Start != null) {
                txtStart.Text = model.Start.ToString();
            }
            if (model.End != null) {
                txtEnd.Text = model.End.ToString();
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
            Model.WX_Course model = new Model.WX_Course();
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
            //notified.Run run = new notified.Run();

            try
            {
                JobManager.Initialize(new notified.Run());
            }
            catch (Exception ex) { 
                
            }
        }

        private Model.WX_Course SetModelValue(Model.WX_Course model)
        {
            if (!string.IsNullOrEmpty(txtBuyNumber1.Text)) {
                model.BuyNumber1 =int.Parse(txtBuyNumber1.Text);
            }
            if (ddlCommentState.SelectedItem != null && ddlCommentState.SelectedValue != "") {
                model.CommentState = int.Parse(ddlCommentState.SelectedValue);
            }
            model.Details = txtDetails.Value;
            if (txtDuration.Text.Trim() != "") {
                model.Duration = decimal.Parse(txtDuration.Text);
            }
            model.ImgUrl = txtImgUrl.Text;
            model.Intro = txtIntro.Text;
            if (ddlLearnState.SelectedItem != null && ddlLearnState.SelectedValue != "") {
                model.LearnState = int.Parse(ddlLearnState.SelectedValue);
            }
            if (hfLecturer.Value != "") {
                model.Lecturer = hfLecturer.Value.Split('@')[1];
            }
            if (ddlCourseType.SelectedItem != null && ddlCourseType.SelectedValue != "")
            {
                model.CourseType = int.Parse(ddlCourseType.SelectedValue);
            }

            model.Name = txtName.Text;
            if(txtOnLineDateTime.Text!=""){
                model.OnLineDateTime = DateTime.Parse(txtOnLineDateTime.Text);
            }
            if (txtOriginalPrice.Text != "") {
                model.OriginalPrice = decimal.Parse(txtOriginalPrice.Text);
            }
            if (txtPreferentialPrice.Text != "") {
                model.PreferentialPrice = decimal.Parse(txtPreferentialPrice.Text);
            }
            if (ddlProvider.SelectedItem != null && ddlProvider.SelectedValue != "") {
                model.ProviderId = int.Parse(ddlProvider.SelectedValue);
            }
            if (hfBag.Value!="")
            {
                model.ParentId = int.Parse(hfBag.Value.Replace("U-", ""));
            }
            

            if (ddlSaleState.SelectedItem != null && ddlSaleState.SelectedValue != "") {
                model.SaleState = int.Parse(ddlSaleState.SelectedValue);
            }
            if (ddlTheme.SelectedItem != null && ddlTheme.SelectedValue != "")
            {
                model.Theme = int.Parse(ddlTheme.SelectedValue);
            }
            else {
                model.Theme = null;
            }
            int exercisesId = 0;
            if (txtExercisesId.Text.Trim() != "" && int.TryParse(txtExercisesId.Text, out exercisesId)) {
                model.ExercisesId = exercisesId.ToString();
            }
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

            model.MediaType = int.Parse(ddlMediaType.SelectedValue);
            if (txtStart.Text != "")
            {
                model.Start = DateTime.Parse(txtStart.Text);
            }
            else {
                model.Start = null;
            }
            if (txtEnd.Text != "")
            {
                model.End = DateTime.Parse(txtEnd.Text);
            }
            else {
                model.End = null;
            }
            return model;
        }
        private string checkform()
        {
            string strErr = "";
            if (txtName.Text.Trim() == "") {
                strErr += "课程名不能为空！\\n";
            }
            if (txtOnLineDateTime.Text.Trim() == "") {
                strErr += "上架时间不能为空！\\n";
            }
            if (txtOriginalPrice.Text.Trim() == "" || SfSoft.Common.PageValidate.IsDecimal(txtOriginalPrice.Text) == false) {
                strErr += "原价格不能为空且是数字！\\n";
            }
            if (txtPreferentialPrice.Text.Trim() == "" || SfSoft.Common.PageValidate.IsDecimal(txtOriginalPrice.Text) == false) {
                strErr += "优惠价格不能为空且是数字！\\n";
            }
            if (ddlCommentState.SelectedItem == null || ddlCommentState.SelectedValue == "") {
                strErr += "评论是否开启！\\n";
            }
            if (ddlLearnState.SelectedItem == null || ddlLearnState.SelectedValue == "") {
                strErr += "请选择学习状态！\\n";
            }
            if (ddlProvider.SelectedItem == null || ddlProvider.SelectedValue == "") {
                strErr += "请选择供应商！\\n";
            }
            if (ddlSaleState.SelectedItem == null || ddlSaleState.SelectedValue == "") {
                strErr += "请选择销售状态！\\n";
            }
            if (txtDuration.Text.Trim() != "") {
                if (SfSoft.Common.PageValidate.IsDecimal(txtDuration.Text) == false) {
                    strErr += "时长格式不正！\\n";
                }
            }
            if (ddlMediaType.SelectedItem == null || ddlMediaType.SelectedValue == "") {
                strErr += "请选择媒体类型！\\n";
            }
            if (ddlCourseType.SelectedItem == null || ddlCourseType.SelectedValue == "") {
                strErr += "请选课程体类型！\\n";
            }
            return strErr;
        }
        private void InitDropDownList()
        {
            BLL.WX_Course_Provider bll = new BLL.WX_Course_Provider();
            DataSet ds= bll.GetList("IsAct=1");
            foreach (DataRow dr in ds.Tables[0].Rows)
            {
                ddlProvider.Items.Add(new ListItem() { Text = dr["Name"].ToString(), Value=dr["Id"].ToString() });
            }
            ddlProvider.Items.Insert(0, new ListItem() { Text="", Value="" });

            BLL.Pub_BaseData baseBll = new BLL.Pub_BaseData();
            ds = baseBll.GetList("");
            EmcCommon.SetBaseDataDropDownList(ddlTheme, "weixin.wxcourse.theme", ds);
            ddlTheme.Items.Insert(0, new ListItem() { Text = "", Value = "" });

            Helper.Helper helper = new Helper.Helper();
            var list = helper.InitCourseType();
            foreach (var m in list)
            {
                ddlCourseType.Items.Add(new ListItem() { Text = m.Name, Value = m.Value.ToString() });
            }

        }
        protected  void GridView1_RowDataBound(object sender, GridViewRowEventArgs e)
        {
            if (e.Row.RowType == DataControlRowType.DataRow)
            {
                
            }
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
        private void GetLecturer()
        {
            Dictionary<string, string> dic = new Dictionary<string, string>();
            BLL.WX_JJZH_Expert bll = new BLL.WX_JJZH_Expert();
            DataSet ds = bll.GetAllList();
            if (ds != null && ds.Tables[0] != null && ds.Tables[0].Rows.Count > 0) {
                foreach (DataRow dr in ds.Tables[0].Rows) {
                    dic.Add(dr["Id"].ToString(), dr["UName"].ToString());
                }
            }
            Session["Lecturer"] = dic;
        }

        private string GetCourseBagName(string bag)
        {
            BLL.WX_Course bll = new BLL.WX_Course();
            Model.WX_Course model = bll.GetModel(int.Parse(bag));
            if (model != null) {
                return model.Name;
            }
            return "";
        }

        protected void btnCourseDele_Click(object sender, ImageClickEventArgs e)
        {
            BLL.WX_Course bll = new BLL.WX_Course();
            Model.WX_Course model = bll.GetModel(int.Parse(hfID.Value));
            model.ParentId = null;
            bll.Update(model);
            hfBag.Value = "";
        }

        protected void btnLecturerDele_Click(object sender, ImageClickEventArgs e)
        {
            BLL.WX_Course bll = new BLL.WX_Course();
            Model.WX_Course model = bll.GetModel(int.Parse(hfID.Value));
            model.Lecturer = null;
            bll.Update(model);
            hfLecturer.Value = "";
            txtLecturer.Text = "";
        }
    }
}


